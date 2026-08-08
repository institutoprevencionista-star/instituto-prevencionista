import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser, getUserAccess } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getAgentes } from "@/lib/catalog";
import { canAccessAgente } from "@/lib/access";
import { ChatApp } from "./ChatApp";

const AGENT_SLUG = "ip-pgr-inteligente";

export const metadata: Metadata = {
  title: "IP PGR Inteligente",
};

export default async function PgrInteligentePage() {
  if (isSupabaseConfigured()) {
    const user = await getCurrentUser();
    if (!user) {
      redirect("/login?next=/pgr-inteligente");
    }

    const agentes = await getAgentes();
    const agente = agentes.find((item) => item.slug === AGENT_SLUG);
    const access = await getUserAccess(user.id);

    if (!agente || !canAccessAgente(agente, access)) {
      redirect("/agentes-inteligentes");
    }
  }

  return <ChatApp />;
}
