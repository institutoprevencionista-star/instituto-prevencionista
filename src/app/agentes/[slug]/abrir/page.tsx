import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser, getUserAccess } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getAgentes, isLinkDisponivel } from "@/lib/catalog";
import { canAccessAgente } from "@/lib/access";
import { Container } from "@/components/ui/Container";
import { RedirectCountdown } from "./RedirectCountdown";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Abrindo seu agente...",
};

export default async function AbrirAgentePage(props: PageProps<"/agentes/[slug]/abrir">) {
  const { slug } = await props.params;

  let user = null;
  if (isSupabaseConfigured()) {
    user = await getCurrentUser();
    if (!user) {
      redirect(`/login?next=/agentes-inteligentes`);
    }
  }

  const agentes = await getAgentes();
  const agente = agentes.find((item) => item.slug === slug);

  if (!agente || !isLinkDisponivel(agente.link)) {
    redirect("/agentes-inteligentes");
  }

  if (user) {
    const access = await getUserAccess(user.id);
    if (!canAccessAgente(agente, access)) {
      redirect("/agentes-inteligentes");
    }
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-brand-green-900 text-white">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Image
          src="/logo.png"
          alt="Instituto Prevencionista"
          width={96}
          height={96}
          priority
          className="h-24 w-24 object-contain"
        />
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Abrindo seu agente...</h1>
          <p className="mt-2 text-white/85">
            Você será levado em instantes para conversar com o <strong>{agente.nome}</strong>.
          </p>
        </div>
        <RedirectCountdown href={agente.link} />
      </Container>
    </section>
  );
}
