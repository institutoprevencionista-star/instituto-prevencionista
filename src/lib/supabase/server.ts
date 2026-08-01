import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { isSupabaseConfigured } from "./config";
import type { UserAccess } from "@/lib/access";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Chamado a partir de um Server Component sem permissão de escrita;
            // o proxy já cuida de renovar a sessão nesses casos.
          }
        },
      },
    }
  );
}

// Retorna null enquanto o Supabase não estiver configurado (área de Agentes
// Inteligentes segue liberada até o login ser ativado — veja README-PT.md).
export async function getCurrentUser() {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// Retorna o tier/agentes avulsos liberados para o usuário logado. Sem linha
// cadastrada em user_access, o usuário não tem acesso a nenhum agente ainda.
export async function getUserAccess(userId: string): Promise<UserAccess> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("user_access")
    .select("tier, agent_slugs")
    .eq("user_id", userId)
    .maybeSingle();

  return {
    tier: (data?.tier as UserAccess["tier"]) ?? null,
    agentSlugs: data?.agent_slugs ?? [],
  };
}
