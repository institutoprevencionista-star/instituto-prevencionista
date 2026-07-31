import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { getTreinamentos, isLinkDisponivel } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Treinamentos VIP",
  description: "Treinamentos pagos e completos em segurança e saúde do trabalho.",
};

export default async function TreinamentosVipPage() {
  const treinamentos = await getTreinamentos();

  return (
    <Container className="py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand-black">Treinamentos VIP</h1>
        <p className="mx-auto mt-3 max-w-2xl text-black/70">
          Treinamentos completos e aprofundados, com acesso imediato após a compra.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {treinamentos.map((treinamento) => (
          <Card key={treinamento.slug} className="justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                {treinamento.categoria && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-gold-500">
                    {treinamento.categoria}
                  </span>
                )}
                {!isLinkDisponivel(treinamento.linkHotmart) && (
                  <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs font-semibold text-black/60">
                    Em breve
                  </span>
                )}
              </div>
              <h2 className="mt-1 text-lg font-semibold text-brand-green-900">
                {treinamento.titulo}
              </h2>
              <p className="mt-2 text-sm text-black/70">{treinamento.descricao}</p>
              {treinamento.preco && (
                <p className="mt-3 text-base font-semibold text-brand-black">
                  {treinamento.preco}
                </p>
              )}
            </div>
            <ButtonLink href={`/treinamentos-vip/${treinamento.slug}`} className="mt-6">
              Ver detalhes
            </ButtonLink>
          </Card>
        ))}
      </div>
    </Container>
  );
}
