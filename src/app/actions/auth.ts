"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { ActionState } from "@/lib/form-state";

const loginSchema = z.object({
  email: z.string().trim().email("Informe um e-mail válido."),
  next: z.string().trim().optional().default("/agentes-inteligentes"),
});

export async function requestMagicLink(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  if (!isSupabaseConfigured()) {
    return {
      status: "error",
      message: "O login ainda não foi configurado neste site (veja README-PT.md, item 4).",
    };
  }

  const parsed = loginSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      status: "error",
      message: "Informe um e-mail válido.",
    };
  }

  const { email, next } = parsed.data;
  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: `${siteUrl}/auth/confirm?next=${encodeURIComponent(next)}`,
    },
  });

  if (error) {
    console.error("Erro ao enviar link mágico:", error);
    return {
      status: "error",
      message: "Não foi possível enviar o link de acesso. Verifique se esse e-mail foi liberado.",
    };
  }

  return {
    status: "success",
    message: "Prontinho! Enviamos um link de acesso para o seu e-mail.",
  };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
