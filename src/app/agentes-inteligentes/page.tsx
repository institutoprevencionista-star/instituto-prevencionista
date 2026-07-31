import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AgentesGrid } from "@/components/agentes/AgentesGrid";
import { getAgentes } from "@/lib/catalog";
import { getCurrentUser } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";

export const metadata: Metadata = {
  title: "Agentes Inteligentes",
  description: "Agentes de inteligência artificial especializados em segurança do trabalho.",
};

export default async function AgentesInteligentesPage() {
  const user = await getCurrentUser();
  const agentes = await getAgentes();

  return (
    <Container className="py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand-black">Agentes Inteligentes</h1>
        <p className="mx-auto mt-3 max-w-2xl text-black/70">
          Agentes de inteligência artificial prontos para apoiar o seu dia a dia em segurança e
          saúde do trabalho.
        </p>
        {user?.email && (
          <p className="mt-4 text-sm text-black/60">
            Logado como {user.email} ·{" "}
            <form action={logout} className="inline">
              <button type="submit" className="underline hover:text-brand-green-700">
                Sair
              </button>
            </form>
          </p>
        )}
      </div>

      <div className="mt-10">
        <AgentesGrid agentes={agentes} />
      </div>
    </Container>
  );
}
