import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser, getUserAccess } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getAgentes, isLinkDisponivel } from "@/lib/catalog";
import { canAccessAgente } from "@/lib/access";

export async function GET(request: NextRequest, ctx: RouteContext<"/api/agentes/[slug]/ir">) {
  const { slug } = await ctx.params;

  let user = null;
  if (isSupabaseConfigured()) {
    user = await getCurrentUser();
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", "/agentes-inteligentes");
      return NextResponse.redirect(loginUrl);
    }
  }

  const agentes = await getAgentes();
  const agente = agentes.find((item) => item.slug === slug);

  if (!agente || !isLinkDisponivel(agente.link)) {
    return NextResponse.redirect(new URL("/agentes-inteligentes", request.url));
  }

  if (user) {
    const access = await getUserAccess(user.id);
    if (!canAccessAgente(agente, access)) {
      return NextResponse.redirect(new URL("/agentes-inteligentes", request.url));
    }
  }

  return NextResponse.redirect(agente.link, { status: 307 });
}
