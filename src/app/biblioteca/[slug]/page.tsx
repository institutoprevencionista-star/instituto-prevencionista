import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { BibliotecaForm } from "@/components/forms/BibliotecaForm";
import { getMaterialBySlug } from "@/lib/catalog";

export async function generateMetadata(props: PageProps<"/biblioteca/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const material = await getMaterialBySlug(slug);
  return { title: material?.titulo ?? "Material" };
}

export default async function MaterialPage(props: PageProps<"/biblioteca/[slug]">) {
  const { slug } = await props.params;
  const material = await getMaterialBySlug(slug);

  if (!material) notFound();

  return (
    <Container className="grid gap-10 py-16 lg:grid-cols-2 lg:items-start">
      <div>
        {material.categoria && (
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-gold-500">
            {material.categoria}
          </span>
        )}
        <h1 className="mt-1 text-3xl font-bold text-brand-black">{material.titulo}</h1>
        <p className="mt-4 text-black/70">{material.descricao}</p>
      </div>

      <div className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-brand-green-900">
          Preencha para liberar o download
        </h2>
        <div className="mt-4">
          <BibliotecaForm material={material} />
        </div>
      </div>
    </Container>
  );
}
