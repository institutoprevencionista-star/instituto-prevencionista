import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { getCurrentUser } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAgentes } from "@/lib/catalog";
import type { Tier } from "@/lib/access";
import { AccessForm } from "./AccessForm";

export const metadata: Metadata = {
  title: "Acessos aos Agentes",
};

export default async function AcessosAdminPage() {
  const user = await getCurrentUser();
  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect("/agentes-inteligentes");
  }

  const supabaseAdmin = createAdminClient();
  const [{ data: usersData }, { data: accessRows }, agentes] = await Promise.all([
    supabaseAdmin.auth.admin.listUsers(),
    supabaseAdmin.from("user_access").select("user_id, tier, agent_slugs"),
    getAgentes(),
  ]);

  const accessByUser = new Map((accessRows ?? []).map((row) => [row.user_id, row]));

  const usuarios = (usersData?.users ?? [])
    .filter((item) => Boolean(item.email))
    .sort((a, b) => (a.email ?? "").localeCompare(b.email ?? ""));

  return (
    <Container className="py-16">
      <h1 className="text-3xl font-bold text-brand-black">Acessos aos Agentes</h1>
      <p className="mt-2 max-w-2xl text-black/70">
        Defina o plano (tier) e/ou os agentes avulsos liberados para cada pessoa convidada. Sem
        plano e sem agentes marcados, a pessoa não vê nenhum agente liberado.
      </p>

      <div className="mt-10 space-y-6">
        {usuarios.length === 0 && <p className="text-black/60">Nenhum usuário convidado ainda.</p>}

        {usuarios.map((usuario) => {
          const acesso = accessByUser.get(usuario.id);

          return (
            <Card key={usuario.id}>
              <AccessForm
                userId={usuario.id}
                email={usuario.email ?? ""}
                tier={(acesso?.tier as Tier | null) ?? null}
                agentSlugs={acesso?.agent_slugs ?? []}
                agentes={agentes}
              />
            </Card>
          );
        })}
      </div>
    </Container>
  );
}
