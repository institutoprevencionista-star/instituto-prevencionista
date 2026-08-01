import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getCurrentUser } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAgentes } from "@/lib/catalog";
import { TIERS, TIER_LABEL } from "@/lib/access";
import { updateUserAccess } from "./actions";

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
          // A key inclui o estado salvo para remontar o form (e os valores
          // padrão do select/checkboxes) sempre que o acesso mudar no banco.
          const formKey = `${usuario.id}:${acesso?.tier ?? ""}:${(acesso?.agent_slugs ?? []).join(",")}`;

          return (
            <Card key={formKey}>
              <form action={updateUserAccess} className="space-y-4">
                <input type="hidden" name="userId" value={usuario.id} />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-semibold text-brand-green-900">{usuario.email}</span>
                  <select
                    name="tier"
                    defaultValue={acesso?.tier ?? ""}
                    className="rounded-md border border-black/20 px-3 py-1.5 text-sm"
                  >
                    <option value="">Sem plano</option>
                    {TIERS.map((tier) => (
                      <option key={tier} value={tier}>
                        {TIER_LABEL[tier]}
                      </option>
                    ))}
                  </select>
                </div>

                <details>
                  <summary className="cursor-pointer text-sm text-black/60">
                    Agentes avulsos (opcional)
                  </summary>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {agentes.map((agente) => (
                      <label key={agente.slug} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          name="agentSlugs"
                          value={agente.slug}
                          defaultChecked={acesso?.agent_slugs?.includes(agente.slug) ?? false}
                        />
                        {agente.nome}
                      </label>
                    ))}
                  </div>
                </details>

                <Button type="submit" variant="secondary">
                  Salvar
                </Button>
              </form>
            </Card>
          );
        })}
      </div>
    </Container>
  );
}
