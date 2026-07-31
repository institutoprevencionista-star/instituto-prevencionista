"use client";

import { useActionState } from "react";
import { requestMagicLink } from "@/app/actions/auth";
import { initialActionState } from "@/lib/form-state";
import { TextField } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction] = useActionState(requestMagicLink, initialActionState);

  if (state.status === "success") {
    return (
      <div className="rounded-lg border border-brand-green-700/30 bg-brand-green-700/5 p-6 text-center">
        <p className="font-medium text-brand-green-900">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />
      <TextField label="E-mail" name="email" type="email" required />

      {state.status === "error" && <p className="text-sm text-red-600">{state.message}</p>}

      <SubmitButton label="Enviar link de acesso" pendingLabel="Enviando..." />
    </form>
  );
}
