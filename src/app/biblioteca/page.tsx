import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { getMateriais } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Biblioteca Gratuita",
  description: "Materiais gratuitos sobre segurança e saúde do trabalho.",
};

export default async function BibliotecaPage() {
  const materiais = await getMateriais();

  return (
    <Container className="py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand-black">Biblioteca Gratuita</h1>
        <p className="mx-auto mt-3 max-w-2xl text-black/70">
          Baixe gratuitamente nossos materiais sobre segurança e saúde do trabalho. É só informar
          seus dados de contato.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {materiais.map((material) => (
          <Card key={material.slug} className="justify-between">
            <div>
              {material.categoria && (
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-gold-500">
                  {material.categoria}
                </span>
              )}
              <h2 className="mt-1 text-lg font-semibold text-brand-green-900">
                {material.titulo}
              </h2>
              <p className="mt-2 text-sm text-black/70">{material.descricao}</p>
            </div>
            <ButtonLink href={`/biblioteca/${material.slug}`} className="mt-6">
              Baixar gratuitamente
            </ButtonLink>
          </Card>
        ))}
      </div>
    </Container>
  );
}
