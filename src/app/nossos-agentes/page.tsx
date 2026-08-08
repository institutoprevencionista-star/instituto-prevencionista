import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getAgentes } from "@/lib/catalog";
import { AgenteImagem } from "@/components/agentes/AgenteImagem";
import { AGENT_PRICING } from "@/lib/agent-pricing";

export const metadata: Metadata = {
  title: "Nossos Agentes Inteligentes",
  description:
    "Conheça todos os agentes de inteligência artificial especializados em segurança e saúde do trabalho do Instituto Prevencionista.",
};

// Evita que o build fique preso esperando a planilha do Google
// (a página é renderizada a cada acesso, com cache de 5 min do fetch).
export const dynamic = "force-dynamic";

export default async function NossosAgentesPage() {
  const agentes = await getAgentes();

  return (
    <Container className="py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand-black">Nossos Agentes Inteligentes</h1>
        <p className="mx-auto mt-3 max-w-2xl text-black/70">
          Conheça cada um dos nossos agentes de inteligência artificial especializados em
          segurança e saúde do trabalho antes de assinar.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {agentes.map((agente) => (
          <Link
            key={agente.slug}
            href={`/nossos-agentes/${agente.slug}`}
            className="flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_2px_10px_rgba(15,61,36,0.06)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,61,36,0.12)]"
          >
            <AgenteImagem imagem={agente.imagem} nome={agente.nome} className="aspect-square" />
            <div className="flex flex-1 flex-col p-6">
              {agente.categoria && (
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-gold-500">
                  {agente.categoria}
                </span>
              )}
              <h2 className="mt-1 text-lg font-semibold text-brand-green-900">{agente.nome}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-black/70">{agente.descricao}</p>
              {AGENT_PRICING[agente.slug] && (
                <p className="mt-2 text-sm font-semibold text-brand-black">
                  {AGENT_PRICING[agente.slug].preco}
                </p>
              )}
              <span className="mt-4 text-sm font-semibold text-brand-green-700">
                Ver detalhes →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
