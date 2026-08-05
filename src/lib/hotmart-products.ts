import type { Tier } from "./access";

export type ProductAccessRule = { kind: "tier"; tier: Tier } | { kind: "agent"; slug: string };

// IDs dos produtos cadastrados na Hotmart, mapeados para o que cada um
// libera. A Biblioteca Premium (produto 8228962) fica de fora — não é
// controlada por user_access.
export const HOTMART_PRODUCT_ACCESS: Record<string, ProductAccessRule> = {
  // Planos combo
  "8232374": { kind: "tier", tier: "essencial" },
  "8233154": { kind: "tier", tier: "profissional" },
  "8233203": { kind: "tier", tier: "premium" },
  "8233245": { kind: "tier", tier: "empresa" },

  // Agentes avulsos
  "8232561": { kind: "agent", slug: "gerador-corprorativo-de-pop" },
  "8232596": { kind: "agent", slug: "ip-comunicacao-sst-pro" },
  "8232628": { kind: "agent", slug: "ip-inspecao-sst-ai" },
  "8232652": { kind: "agent", slug: "ip-treinamento-studio-ai" },
  "8232680": { kind: "agent", slug: "ip-pgr-inteligente" },
  "8232717": { kind: "agent", slug: "ip-gestao-de-contratadas-e-terceiros" },
  "8232742": { kind: "agent", slug: "ip-apr-e-permissao-de-trabalho-ai" },
  "8232774": { kind: "agent", slug: "ip-ltcat-e-ppp" },
  "8232798": { kind: "agent", slug: "ip-gestao-de-saude-ocupacional-ai" },
  "8232835": { kind: "agent", slug: "ip-gestor-inteligente-de-epis" },
  "8232857": { kind: "agent", slug: "ip-nr-26-gestao-quimico-ia" },
  "8232884": { kind: "agent", slug: "ip-ergonomia-inteligente-ia" },
  "8232910": { kind: "agent", slug: "ip-psicossocial-e-ergonomia" },
  "8232938": { kind: "agent", slug: "ip-especialista-nr-12-e-avaliacao-de-riscos" },
  "8232975": { kind: "agent", slug: "ip-investigacao-ia" },
  "8232999": { kind: "agent", slug: "ip-cipa-nr-05" },
  "8233026": { kind: "agent", slug: "ip-insalubridade-e-periculosidade" },
  "8233062": { kind: "agent", slug: "ip-ho-engenharia-laudos-e-pericias" },
  "8233091": { kind: "agent", slug: "ip-gestao-de-seguranca-incendio" },
  "8255935": { kind: "agent", slug: "ip-nr-33-pro-master" },
  "8256209": { kind: "agent", slug: "ip-nr-35-expert-ai" },
};

const GRANT_EVENTS = new Set([
  "PURCHASE_APPROVED",
  "PURCHASE_COMPLETE",
  "SWITCH_PLAN",
]);

const REVOKE_EVENTS = new Set([
  "PURCHASE_CANCELED",
  "PURCHASE_REFUNDED",
  "PURCHASE_CHARGEBACK",
  "PURCHASE_PROTEST",
  "SUBSCRIPTION_CANCELLATION",
]);

export function classifyHotmartEvent(event: string): "grant" | "revoke" | "ignore" {
  if (GRANT_EVENTS.has(event)) return "grant";
  if (REVOKE_EVENTS.has(event)) return "revoke";
  return "ignore";
}
