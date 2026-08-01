import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AgentesGrid } from "@/components/agentes/AgentesGrid";
import { getAgentes } from "@/lib/catalog";
import { getCurrentUser, getUserAccess } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";
import type { UserAccess } from "@/lib/access";

export const metadata: Metadata = {
  title: "Agentes Inteligentes",
  description: "Agentes de inteligência artificial especializados em segurança do trabalho.",
};

export default async function AgentesInteligentesPage() {
  const user = await getCurrentUser();
  const agentes = await getAgentes();
  const access: UserAccess | null = user ? await getUserAccess(user.id) : null;

  return (
    <Container className="py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand-black">Agentes Inteligentes</h1>
        <p className="mx-auto mt-3 max-w-2xl text-black/70">
          Agentes de inteligência artificial prontos para apoiar o seu dia a dia em segurança e
          saúde do trabalho.
        </p>
        {user?.email && (
          <div className="mt-4 text-sm text-black/60">
            Logado como {user.email} ·{" "}
            <form action={logout} className="inline">
              <button type="submit" className="underline hover:text-brand-green-700">
                Sair
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="mt-10">
        <AgentesGrid agentes={agentes} access={access} />
      </div>
    </Container>
  );
}
