import Image from "next/image";
import { Clock3, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { SECTIONS } from "@/content/sections";
import { buildWhatsappUrl } from "@/lib/contact";

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Conformidade com as NRs",
    description: "Mantenha sua empresa em dia com as Normas Regulamentadoras, sem complicação.",
  },
  {
    icon: Sparkles,
    title: "Inteligência artificial aplicada",
    description: "Agentes de IA especializados que aceleram rotinas inteiras de SST.",
  },
  {
    icon: Clock3,
    title: "Agilidade no dia a dia",
    description: "Materiais, respostas e documentos prontos em minutos, não semanas.",
  },
  {
    icon: HeartHandshake,
    title: "Suporte especializado",
    description: "Conteúdo e atendimento pensados por quem entende de segurança do trabalho.",
  },
];

const WHATSAPP_HREF = buildWhatsappUrl(
  "Olá! Vim pelo site do Instituto Prevencionista e gostaria de falar com um especialista."
);

export default function HomePage() {
  return (
    <>
      <section className="overflow-hidden bg-brand-green-900 text-white">
        <Container className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-8 lg:py-28">
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-[3.25rem]">
              Soluções inteligentes para transformar a{" "}
              <span className="text-brand-gold-400">Segurança e Saúde no Trabalho</span>
            </h1>
            <p className="max-w-xl text-base text-white/85 sm:text-lg">
              O Instituto Prevencionista reúne materiais gratuitos, treinamentos, agentes de IA e
              consultoria especializada para proteger pessoas e empresas.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              <ButtonLink href="/biblioteca" variant="secondary">
                Acessar Biblioteca Gratuita
              </ButtonLink>
              <ButtonLink href="/biblioteca-premium" variant="white">
                Soluções Premium
              </ButtonLink>
              <ButtonLink href={WHATSAPP_HREF} target="_blank" variant="outline-white">
                Falar com um especialista
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-sm items-center justify-center py-6 lg:max-w-none">
            <div className="absolute h-72 w-72 rounded-full bg-brand-gold-500/10 sm:h-80 sm:w-80" />
            <div className="absolute h-56 w-56 rounded-full border border-white/10 sm:h-64 sm:w-64" />
            <div className="absolute h-40 w-40 rounded-full border border-white/10 sm:h-48 sm:w-48" />
            <Image
              src="/logo.png"
              alt="Instituto Prevencionista"
              width={320}
              height={320}
              priority
              className="relative h-52 w-52 object-contain drop-shadow-2xl sm:h-64 sm:w-64"
            />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="text-center text-2xl font-bold text-brand-black sm:text-3xl">
            Como podemos ajudar
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map((section) => (
              <Card key={section.href} className="justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-900/5">
                    <section.icon className="h-6 w-6 text-brand-green-700" strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-brand-green-900">{section.title}</h3>
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

      <section className="bg-black/[0.03] py-16 sm:py-20">
        <Container>
          <h2 className="text-center text-2xl font-bold text-brand-black sm:text-3xl">
            Por que escolher o Instituto Prevencionista
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold-500/15">
                  <benefit.icon className="h-6 w-6 text-brand-gold-500" strokeWidth={2} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-brand-green-900">{benefit.title}</h3>
                <p className="mt-2 text-sm text-black/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-green-900 py-16 text-white sm:py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Pronto para transformar a segurança da sua empresa?
          </h2>
          <p className="max-w-2xl text-white/85">
            Fale com um dos nossos especialistas e descubra a melhor solução para o seu negócio.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={WHATSAPP_HREF} target="_blank" variant="secondary">
              Falar com um especialista
            </ButtonLink>
            <ButtonLink href="/biblioteca-premium" variant="outline-white">
              Conhecer Soluções Premium
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
