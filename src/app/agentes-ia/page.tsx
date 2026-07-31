import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AgentesGrid } from "@/components/agentes/AgentesGrid";
import { getAgentes } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Agentes de IA",
  description: "Agentes de inteligência artificial especializados em segurança do trabalho.",
};

export default async function AgentesIaPage() {
  const agentes = await getAgentes();

  return (
    <Container className="py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand-black">Agentes de IA</h1>
        <p className="mx-auto mt-3 max-w-2xl text-black/70">
          Agentes de inteligência artificial prontos para apoiar o seu dia a dia em segurança e
          saúde do trabalho.
        </p>
      </div>

      <div className="mt-10">
        <AgentesGrid agentes={agentes} />
      </div>
    </Container>
  );
}
