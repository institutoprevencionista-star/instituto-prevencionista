import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PresencialForm } from "@/components/forms/PresencialForm";

export const metadata: Metadata = {
  title: "Treinamento Presencial",
  description: "Solicite um treinamento presencial na sua cidade.",
};

export default function PresencialPage() {
  return (
    <Container className="grid gap-10 py-16 lg:grid-cols-2 lg:items-start">
      <div>
        <h1 className="text-3xl font-bold text-brand-black">Treinamento Presencial</h1>
        <p className="mt-4 text-black/70">
          Levamos o treinamento até a sua cidade. Conte pra gente onde e como podemos ajudar a sua
          equipe.
        </p>
      </div>

      <div className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-brand-green-900">Solicite seu treinamento</h2>
        <div className="mt-4">
          <PresencialForm />
        </div>
      </div>
    </Container>
  );
}
