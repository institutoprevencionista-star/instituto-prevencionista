import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink, Button } from "@/components/ui/Button";
import { isLinkDisponivel } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Planos",
  description: "Assine o acesso aos Agentes Inteligentes do Instituto Prevencionista.",
};

type Plano = {
  tier: string;
  nome: string;
  parcela: string;
  totalAVista: string;
  resumo: string;
  destaque?: boolean;
  checkoutUrl: string;
};

const PLANOS: Plano[] = [
  {
    tier: "essencial",
    nome: "Essencial",
    parcela: "R$ 66,42",
    totalAVista: "R$ 797,00 à vista",
    resumo: "3 agentes inteligentes essenciais para começar a aplicar IA na sua rotina de SST.",
    checkoutUrl: process.env.NEXT_PUBLIC_PLANO_ESSENCIAL_CHECKOUT_URL ?? "#",
  },
  {
    tier: "profissional",
    nome: "Profissional",
    parcela: "R$ 124,75",
    totalAVista: "R$ 1.497,00 à vista",
    resumo: "10 agentes inteligentes (inclui todos do Essencial) para o dia a dia completo de SST.",
    destaque: true,
    checkoutUrl: process.env.NEXT_PUBLIC_PLANO_PROFISSIONAL_CHECKOUT_URL ?? "#",
  },
  {
    tier: "premium",
    nome: "Premium",
    parcela: "R$ 208,09",
    totalAVista: "R$ 2.497,00 à vista",
    resumo: "Todos os agentes inteligentes do Instituto Prevencionista, sem limitação.",
    checkoutUrl: process.env.NEXT_PUBLIC_PLANO_PREMIUM_CHECKOUT_URL ?? "#",
  },
  {
    tier: "empresa",
    nome: "Empresa",
    parcela: "R$ 416,42",
    totalAVista: "R$ 4.997,00 à vista",
    resumo: "Todos os agentes inteligentes, com acesso para até 3 usuários da sua equipe.",
    checkoutUrl: process.env.NEXT_PUBLIC_PLANO_EMPRESA_CHECKOUT_URL ?? "#",
  },
];

export default function PlanosPage() {
  return (
    <Container className="py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand-black">Planos</h1>
        <p className="mx-auto mt-3 max-w-2xl text-black/70">
          Assine o acesso aos Agentes Inteligentes do Instituto Prevencionista. Planos superiores
          incluem todos os agentes dos planos anteriores.
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-xs text-black/50">
          Assinatura anual, cobrada em até 12x no cartão de crédito.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PLANOS.map((plano) => (
          <div
            key={plano.tier}
            className={`flex flex-col rounded-2xl border bg-white p-6 text-center shadow-sm ${
              plano.destaque ? "border-brand-gold-500 ring-1 ring-brand-gold-500" : "border-black/10"
            }`}
          >
            {plano.destaque && (
              <span className="mx-auto mb-2 rounded-full bg-brand-gold-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-gold-500">
                Mais popular
              </span>
            )}
            <h2 className="text-lg font-bold text-brand-green-900">{plano.nome}</h2>
            <p className="mt-2">
              <span className="text-xs text-black/60">12x de</span>
              <br />
              <span className="text-2xl font-bold text-brand-black">{plano.parcela}</span>
            </p>
            <p className="text-xs text-black/50">ou {plano.totalAVista}</p>
            <p className="mt-3 flex-1 text-sm text-black/70">{plano.resumo}</p>

            {isLinkDisponivel(plano.checkoutUrl) ? (
              <ButtonLink href={plano.checkoutUrl} target="_blank" className="mt-6 w-full">
                Assinar agora
              </ButtonLink>
            ) : (
              <Button variant="primary" className="mt-6 w-full" disabled>
                Em breve
              </Button>
            )}
          </div>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-black/60">
        Prefere assinar apenas um agente específico? Fale com a gente pelo WhatsApp ou e-mail para
        conhecer os planos individuais.
      </p>
    </Container>
  );
}
