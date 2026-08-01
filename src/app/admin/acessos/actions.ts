"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { TIERS, type Tier } from "@/lib/access";

async function assertIsAdmin() {
  const user = await getCurrentUser();
  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Não autorizado.");
  }
}

export async function updateUserAccess(formData: FormData) {
  await assertIsAdmin();

  const userId = String(formData.get("userId") ?? "");
  const tierRaw = String(formData.get("tier") ?? "");
  const agentSlugs = formData.getAll("agentSlugs").map(String);

  if (!userId) {
    throw new Error("Usuário inválido.");
  }

  const tier: Tier | null = TIERS.includes(tierRaw as Tier) ? (tierRaw as Tier) : null;

  const supabase = createAdminClient();
  const { error } = await supabase.from("user_access").upsert({
    user_id: userId,
    tier,
    agent_slugs: agentSlugs,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Erro ao atualizar acesso:", error);
    throw new Error("Não foi possível salvar o acesso.");
  }

  revalidatePath("/admin/acessos");
}
