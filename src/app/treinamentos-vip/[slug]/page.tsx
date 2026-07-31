import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ButtonLink, Button } from "@/components/ui/Button";
import { getTreinamentoBySlug, isLinkDisponivel } from "@/lib/catalog";

export async function generateMetadata(
  props: PageProps<"/treinamentos-vip/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const treinamento = await getTreinamentoBySlug(slug);
  return { title: treinamento?.titulo ?? "Treinamento" };
}

export default async function TreinamentoPage(props: PageProps<"/treinamentos-vip/[slug]">) {
  const { slug } = await props.params;
  const treinamento = await getTreinamentoBySlug(slug);

  if (!treinamento) notFound();

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl rounded-lg border border-black/10 bg-white p-8 shadow-sm">
        {treinamento.categoria && (
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-gold-500">
            {treinamento.categoria}
          </span>
        )}
        <h1 className="mt-1 text-3xl font-bold text-brand-black">{treinamento.titulo}</h1>
        <p className="mt-4 text-black/70">{treinamento.descricao}</p>
        {treinamento.preco && (
          <p className="mt-4 text-2xl font-bold text-brand-green-900">{treinamento.preco}</p>
        )}
        {isLinkDisponivel(treinamento.linkHotmart) ? (
          <ButtonLink
            href={treinamento.linkHotmart}
            target="_blank"
            variant="secondary"
            className="mt-6"
          >
            Comprar agora
          </ButtonLink>
        ) : (
          <Button variant="secondary" className="mt-6" disabled>
            Em breve
          </Button>
        )}
      </div>
    </Container>
  );
}
