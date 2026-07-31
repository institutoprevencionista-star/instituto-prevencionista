import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { SECTIONS } from "@/content/sections";

export default function HomePage() {
  return (
    <>
      <section className="bg-brand-green-900 py-20 text-white">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-3xl font-bold sm:text-5xl">
            Segurança e Saúde do Trabalho, do jeito certo
          </h1>
          <p className="max-w-2xl text-base text-white/85 sm:text-lg">
            O Instituto Prevencionista reúne materiais gratuitos, treinamentos, agentes de IA e
            consultoria especializada para proteger pessoas e empresas.
          </p>
          <ButtonLink href="/biblioteca" variant="secondary">
            Acessar Biblioteca Gratuita
          </ButtonLink>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="text-center text-2xl font-bold text-brand-black sm:text-3xl">
            Como podemos ajudar
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map((section) => (
              <Card key={section.href} className="justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-brand-green-900">{section.title}</h3>
                  <p className="mt-2 text-sm text-black/70">{section.description}</p>
                </div>
                <ButtonLink href={section.href} variant="ghost" className="mt-6">
                  Saiba mais
                </ButtonLink>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
