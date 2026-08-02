import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { HOTMART_PRODUCT_ACCESS, classifyHotmartEvent } from "@/lib/hotmart-products";
import type { Tier } from "@/lib/access";

async function findUserIdByEmail(
  supabase: ReturnType<typeof createAdminClient>,
  email: string
): Promise<string | null> {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error("Erro ao listar usuarios (webhook Hotmart):", error);
    return null;
  }
  const found = data.users.find((user) => user.email?.toLowerCase() === email.toLowerCase());
  return found?.id ?? null;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const hottok = body.hottok ?? request.headers.get("x-hotmart-hottok");
  if (!process.env.HOTMART_HOTTOK || hottok !== process.env.HOTMART_HOTTOK) {
    return NextResponse.json({ error: "invalid hottok" }, { status: 401 });
  }

  const action = classifyHotmartEvent(String(body.event ?? ""));
  if (action === "ignore") {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const productId = String(body.data?.product?.id ?? "");
  const rule = HOTMART_PRODUCT_ACCESS[productId];
  if (!rule) {
    return NextResponse.json({ ok: true, ignored: true, reason: "product not mapped" });
  }

  const email = body.data?.buyer?.email as string | undefined;
  if (!email) {
    return NextResponse.json({ error: "missing buyer email" }, { status: 400 });
  }

  const supabase = createAdminClient();
  let userId = await findUserIdByEmail(supabase, email);

  if (!userId) {
    if (action === "revoke") {
      return NextResponse.json({ ok: true, ignored: true, reason: "user not found" });
    }
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);
    if (error || !data.user) {
      console.error("Erro ao convidar usuario (webhook Hotmart):", error);
      return NextResponse.json({ error: "failed to invite user" }, { status: 500 });
    }
    userId = data.user.id;
  }

  const { data: existing } = await supabase
    .from("user_access")
    .select("tier, agent_slugs")
    .eq("user_id", userId)
    .maybeSingle();

  let tier: Tier | null = (existing?.tier as Tier | null) ?? null;
  let agentSlugs: string[] = existing?.agent_slugs ?? [];

  if (rule.kind === "tier") {
    if (action === "grant") {
      tier = rule.tier;
    } else if (tier === rule.tier) {
      tier = null;
    }
  } else {
    if (action === "grant") {
      if (!agentSlugs.includes(rule.slug)) agentSlugs = [...agentSlugs, rule.slug];
    } else {
      agentSlugs = agentSlugs.filter((slug) => slug !== rule.slug);
    }
  }

  const { error: upsertError } = await supabase.from("user_access").upsert({
    user_id: userId,
    tier,
    agent_slugs: agentSlugs,
    updated_at: new Date().toISOString(),
  });

  if (upsertError) {
    console.error("Erro ao atualizar acesso (webhook Hotmart):", upsertError);
    return NextResponse.json({ error: "failed to update access" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
