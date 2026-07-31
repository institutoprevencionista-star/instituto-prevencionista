"use server";

import { z } from "zod";
import { saveLead, sendMaterialEmail } from "@/lib/leads";
import { ActionState } from "@/lib/form-state";

const contatoBase = {
  nome: z.string().trim().min(2, "Informe seu nome completo."),
  email: z.string().trim().email("Informe um e-mail válido."),
  whatsapp: z.string().trim().min(8, "Informe um número de WhatsApp válido."),
  consentimento: z.literal("on", {
    message: "É necessário aceitar o uso dos seus dados para continuar.",
  }),
};

const bibliotecaSchema = z.object({
  ...contatoBase,
  materialSlug: z.string().trim().min(1),
  materialTitulo: z.string().trim().min(1),
  linkDrive: z.string().trim().min(1),
});

const consultoriaSchema = z.object({
  ...contatoBase,
  empresa: z.string().trim().min(2, "Informe o nome da empresa."),
  necessidade: z.string().trim().min(10, "Descreva a necessidade com um pouco mais de detalhe."),
  prazo: z.string().trim().optional().default(""),
  orcamentoEstimado: z.string().trim().optional().default(""),
});

const presencialSchema = z.object({
  ...contatoBase,
  cidade: z.string().trim().min(2, "Informe a cidade."),
  quantidadeParticipantes: z.string().trim().optional().default(""),
  dataDesejada: z.string().trim().optional().default(""),
  observacoes: z.string().trim().optional().default(""),
});

function firstFieldError(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

export async function submitBibliotecaLead(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = bibliotecaSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      status: "error",
      message: "Revise os campos destacados.",
      fieldErrors: firstFieldError(parsed.error),
    };
  }

  const { nome, email, whatsapp, materialSlug, materialTitulo, linkDrive } = parsed.data;

  try {
    await saveLead({
      formulario: "biblioteca",
      nome,
      email,
      whatsapp,
      detalhes: { materialSlug, materialTitulo },
    });

    await sendMaterialEmail({
      toEmail: email,
      nome,
      materialTitulo,
      linkDrive,
    });

    return {
      status: "success",
      message: "Prontinho! Enviamos o link também para o seu e-mail.",
      downloadUrl: linkDrive,
    };
  } catch (error) {
    console.error("Erro ao processar lead da biblioteca:", error);
    return {
      status: "error",
      message: "Não foi possível liberar o material agora. Tente novamente em instantes.",
    };
  }
}

export async function submitConsultoriaLead(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = consultoriaSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      status: "error",
      message: "Revise os campos destacados.",
      fieldErrors: firstFieldError(parsed.error),
    };
  }

  const { nome, email, whatsapp, empresa, necessidade, prazo, orcamentoEstimado } =
    parsed.data;

  try {
    await saveLead({
      formulario: "consultoria",
      nome,
      email,
      whatsapp,
      detalhes: { empresa, necessidade, prazo, orcamentoEstimado },
    });

    return {
      status: "success",
      message: "Recebemos seu briefing! Nossa equipe vai analisar e entrar em contato.",
    };
  } catch (error) {
    console.error("Erro ao processar lead de consultoria:", error);
    return {
      status: "error",
      message: "Não foi possível enviar seu briefing agora. Tente novamente em instantes.",
    };
  }
}

export async function submitPresencialLead(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = presencialSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      status: "error",
      message: "Revise os campos destacados.",
      fieldErrors: firstFieldError(parsed.error),
    };
  }

  const { nome, email, whatsapp, cidade, quantidadeParticipantes, dataDesejada, observacoes } =
    parsed.data;

  try {
    await saveLead({
      formulario: "presencial",
      nome,
      email,
      whatsapp,
      cidade,
      detalhes: { quantidadeParticipantes, dataDesejada, observacoes },
    });

    return {
      status: "success",
      message: "Recebemos sua solicitação! Vamos entrar em contato para confirmar os detalhes.",
    };
  } catch (error) {
    console.error("Erro ao processar lead presencial:", error);
    return {
      status: "error",
      message: "Não foi possível enviar sua solicitação agora. Tente novamente em instantes.",
    };
  }
}
