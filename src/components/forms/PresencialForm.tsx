"use client";

import { useActionState } from "react";
import { submitPresencialLead } from "@/app/actions/leads";
import { initialActionState } from "@/lib/form-state";
import { TextField, TextAreaField, ConsentCheckbox } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";

export function PresencialForm() {
  const [state, formAction] = useActionState(submitPresencialLead, initialActionState);

  if (state.status === "success") {
    return (
      <div className="rounded-lg border border-brand-green-700/30 bg-brand-green-700/5 p-6 text-center">
        <p className="font-medium text-brand-green-900">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <TextField
        label="Cidade"
        name="cidade"
        required
        placeholder="Em qual cidade seria o treinamento?"
        error={state.fieldErrors?.cidade}
      />
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
        label="Quantidade de participantes"
        name="quantidadeParticipantes"
        placeholder="Opcional"
      />
      <TextField
        label="Data desejada"
        name="dataDesejada"
        placeholder="Opcional"
      />
      <TextAreaField
        label="Observações"
        name="observacoes"
        placeholder="Detalhes sobre o treinamento desejado (opcional)"
      />
      <ConsentCheckbox error={state.fieldErrors?.consentimento} />

      {state.status === "error" && !state.fieldErrors && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <SubmitButton label="Solicitar treinamento presencial" pendingLabel="Enviando..." />
    </form>
  );
}
