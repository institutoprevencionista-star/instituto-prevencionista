import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { getAgentes } from "@/lib/catalog";
import { getYoutubeEmbedUrl } from "@/lib/youtube";
import { AgenteImagem } from "@/components/agentes/AgenteImagem";
import { AGENT_PRICING } from "@/lib/agent-pricing";

// Evita que o build fique preso esperando a planilha do Google
// (a página é renderizada a cada acesso, com cache de 5 min do fetch).
export const dynamic = "force-dynamic";

export async function generateMetadata(
  props: PageProps<"/nossos-agentes/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const agentes = await getAgentes();
  const agente = agentes.find((item) => item.slug === slug);

  if (!agente) return {};

  return {
    title: agente.nome,
    description: agente.descricao,
  };
}

export default async function AgenteDetalhePage(props: PageProps<"/nossos-agentes/[slug]">) {
  const { slug } = await props.params;
  const agentes = await getAgentes();
  const agente = agentes.find((item) => item.slug === slug);

  if (!agente) {
    notFound();
  }

  const videoEmbedUrl = getYoutubeEmbedUrl(agente.video);
  const pricing = AGENT_PRICING[agente.slug];

  return (
    <Container className="py-16">
      <Link
        href="/nossos-agentes"
        className="text-sm font-semibold text-brand-green-700 hover:underline"
      >
        ← Todos os agentes
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <AgenteImagem
            imagem={agente.imagem}
            nome={agente.nome}
            className="aspect-square rounded-2xl"
          />

          {videoEmbedUrl && (
            <div className="mx-auto mt-6 aspect-[9/16] w-full max-w-xs overflow-hidden rounded-2xl bg-black">
              <iframe
                src={videoEmbedUrl}
                title={`Vídeo sobre ${agente.nome}`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>

        <div>
          {agente.categoria && (
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-gold-500">
              Incluso no plano {agente.categoria}
            </span>
          )}
          <h1 className="mt-1 text-3xl font-bold text-brand-black">{agente.nome}</h1>
          <p className="mt-4 whitespace-pre-line text-black/70">{agente.descricao}</p>

          <ButtonLink href="/planos" className="mt-8">
            Assinar plano
          </ButtonLink>

          {pricing && (
            <div className="mt-4 rounded-lg border border-black/10 bg-black/[0.02] p-4">
              <p className="text-sm text-black/70">
                Prefere assinar só este agente?{" "}
                <span className="font-semibold text-brand-black">{pricing.preco}</span>
              </p>
              <ButtonLink
                href={pricing.checkoutUrl}
                target="_blank"
                variant="ghost"
                className="mt-3"
              >
                Assinar este agente
              </ButtonLink>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
