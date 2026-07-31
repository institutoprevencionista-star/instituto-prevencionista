"use client";

import { useActionState } from "react";
import { submitConsultoriaLead } from "@/app/actions/leads";
import { initialActionState } from "@/lib/form-state";
import { TextField, TextAreaField, ConsentCheckbox } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";

export function ConsultoriaForm() {
  const [state, formAction] = useActionState(submitConsultoriaLead, initialActionState);

  if (state.status === "success") {
    return (
      <div className="rounded-lg border border-brand-green-700/30 bg-brand-green-700/5 p-6 text-center">
        <p className="font-medium text-brand-green-900">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <TextField label="Nome" name="nome" required error={state.fieldErrors?.nome} />
      <TextField
        label="E-mail"
        name="email"
        type="email"
        required
        error={state.fieldErrors?.email}
      />
      <TextField
        label="WhatsApp"
        name="whatsapp"
        type="tel"
        placeholder="(00) 00000-0000"
        required
        error={state.fieldErrors?.whatsapp}
      />
      <TextField
        label="Empresa"
        name="empresa"
        required
        error={state.fieldErrors?.empresa}
      />
      <TextAreaField
        label="Qual é a sua necessidade?"
        name="necessidade"
        required
        placeholder="Conte um pouco sobre o que você precisa..."
        error={state.fieldErrors?.necessidade}
      />
      <TextField label="Prazo desejado" name="prazo" placeholder="Ex: em até 30 dias" />
      <TextField
        label="Orçamento estimado"
        name="orcamentoEstimado"
        placeholder="Opcional"
      />
      <ConsentCheckbox error={state.fieldErrors?.consentimento} />

      {state.status === "error" && !state.fieldErrors && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <SubmitButton label="Enviar briefing" pendingLabel="Enviando..." />
    </form>
  );
}
