"use client";

import { useActionState } from "react";
import { submitBibliotecaLead } from "@/app/actions/leads";
import { initialActionState } from "@/lib/form-state";
import { TextField, ConsentCheckbox } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { ButtonLink } from "@/components/ui/Button";
import type { Material } from "@/lib/catalog";

export function BibliotecaForm({ material }: { material: Material }) {
  const [state, formAction] = useActionState(submitBibliotecaLead, initialActionState);

  if (state.status === "success") {
    return (
      <div className="rounded-lg border border-brand-green-700/30 bg-brand-green-700/5 p-6 text-center">
        <p className="font-medium text-brand-green-900">{state.message}</p>
        <ButtonLink href={state.downloadUrl ?? material.linkDrive} target="_blank" className="mt-4">
          Baixar material agora
        </ButtonLink>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="materialSlug" value={material.slug} />
      <input type="hidden" name="materialTitulo" value={material.titulo} />
      <input type="hidden" name="linkDrive" value={material.linkDrive} />

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
      <ConsentCheckbox error={state.fieldErrors?.consentimento} />

      {state.status === "error" && !state.fieldErrors && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <SubmitButton label="Liberar acesso" pendingLabel="Enviando..." />
    </form>
  );
}
