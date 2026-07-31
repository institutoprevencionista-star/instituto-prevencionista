import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ConsultoriaForm } from "@/components/forms/ConsultoriaForm";

export const metadata: Metadata = {
  title: "Consultoria Especializada",
  description: "Solicite uma proposta sob medida de consultoria ou treinamento personalizado.",
};

export default function ConsultoriaPage() {
  return (
    <Container className="grid gap-10 py-16 lg:grid-cols-2 lg:items-start">
      <div>
        <h1 className="text-3xl font-bold text-brand-black">
          Consultoria Especializada
        </h1>
        <p className="mt-4 text-black/70">
          Cada empresa tem uma realidade diferente. Conte pra gente qual é a sua necessidade e
          nossa equipe prepara uma proposta sob medida de consultoria ou treinamento
          personalizado.
        </p>
      </div>

      <div className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-brand-green-900">Conte-nos o seu briefing</h2>
        <div className="mt-4">
          <ConsultoriaForm />
        </div>
      </div>
    </Container>
  );
}
