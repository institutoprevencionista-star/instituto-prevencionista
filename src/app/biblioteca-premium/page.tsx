import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ButtonLink, Button } from "@/components/ui/Button";
import { getTreinamentos, isLinkDisponivel } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Biblioteca Premium",
  description: "Assinatura anual com acesso completo a materiais de segurança e saúde do trabalho.",
};

// Evita que o build fique preso esperando a planilha do Google
// (a página é renderizada a cada acesso, com cache de 5 min do fetch).
export const dynamic = "force-dynamic";

const CHECKOUT_URL = process.env.NEXT_PUBLIC_BIBLIOTECA_PREMIUM_CHECKOUT_URL ?? "#";

export default async function BibliotecaPremiumPage() {
  const treinamentos = await getTreinamentos();

  return (
    <Container className="py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand-black">Biblioteca Premium</h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg font-semibold text-brand-gold-500">
          400+ materiais profissionais de SST
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-black/70">
          Kits completos organizados por Norma Regulamentadora: apresentação de treinamento,
          checklist, APR, lista de presença e demais materiais de apoio.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-md rounded-lg border border-black/10 bg-white p-8 text-center shadow-sm">
        <span className="rounded-full bg-brand-gold-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-gold-500">
          Assinatura Anual · Lançamento
        </span>
        <div className="mt-4 flex items-baseline justify-center gap-2">
          <span className="text-4xl font-bold text-brand-black">R$ 297</span>
          <span className="text-black/60">/ano</span>
        </div>
        <p className="mt-1 text-sm text-black/40 line-through">de R$ 497 /ano</p>

        {isLinkDisponivel(CHECKOUT_URL) ? (
          <ButtonLink href={CHECKOUT_URL} target="_blank" className="mt-6 w-full">
            Assinar agora
          </ButtonLink>
        ) : (
          <Button variant="primary" className="mt-6 w-full" disabled>
            Em breve
          </Button>
        )}
        <p className="mt-3 text-xs text-black/50">
          Renovação automática. Cancele quando quiser.
        </p>
      </div>

      <h2 className="mt-16 text-center text-xl font-bold text-brand-black">O que está incluso</h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {treinamentos.map((treinamento) => (
          <Card key={treinamento.slug}>
            {treinamento.categoria && (
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-gold-500">
                {treinamento.categoria}
              </span>
            )}
            <h3 className="mt-1 text-lg font-semibold text-brand-green-900">
              {treinamento.titulo}
            </h3>
            <p className="mt-2 text-sm text-black/70">{treinamento.descricao}</p>
          </Card>
        ))}
      </div>
    </Container>
  );
}
