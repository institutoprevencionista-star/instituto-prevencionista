"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { TIERS, TIER_LABEL, type Tier } from "@/lib/access";
import { updateUserAccess, type UpdateAccessState } from "./actions";
import type { Agente } from "@/lib/catalog";

const INITIAL_STATE: UpdateAccessState = { ok: false };

export function AccessForm({
  userId,
  email,
  tier,
  agentSlugs,
  agentes,
}: {
  userId: string;
  email: string;
  tier: Tier | null;
  agentSlugs: string[];
  agentes: Agente[];
}) {
  const [state, formAction, pending] = useActionState(updateUserAccess, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="userId" value={userId} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-semibold text-brand-green-900">{email}</span>
        <select
          name="tier"
          defaultValue={tier ?? ""}
          className="rounded-md border border-black/20 px-3 py-1.5 text-sm"
        >
          <option value="">Sem plano</option>
          {TIERS.map((t) => (
            <option key={t} value={t}>
              {TIER_LABEL[t]}
            </option>
          ))}
        </select>
      </div>

      <details>
        <summary className="cursor-pointer text-sm text-black/60">Agentes avulsos (opcional)</summary>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {agentes.map((agente) => (
            <label key={agente.slug} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="agentSlugs"
                value={agente.slug}
                defaultChecked={agentSlugs.includes(agente.slug)}
              />
              {agente.nome}
            </label>
          ))}
        </div>
      </details>

      <div className="flex items-center gap-3">
        <Button type="submit" variant="secondary" disabled={pending}>
          {pending ? "Salvando..." : "Salvar"}
        </Button>
        {!pending && state.ok && <span className="text-sm font-medium text-brand-green-700">Salvo!</span>}
        {!pending && state.error && <span className="text-sm font-medium text-red-600">{state.error}</span>}
      </div>
    </form>
  );
}
