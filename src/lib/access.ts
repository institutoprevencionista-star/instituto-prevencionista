import type { Agente } from "./catalog";

export type Tier = "essencial" | "profissional" | "premium" | "empresa";

export const TIERS: Tier[] = ["essencial", "profissional", "premium", "empresa"];

export const TIER_LABEL: Record<Tier, string> = {
  essencial: "Essencial",
  profissional: "Profissional",
  premium: "Premium",
  empresa: "Empresa",
};

const TIER_RANK: Record<Tier, number> = {
  essencial: 1,
  profissional: 2,
  premium: 3,
  empresa: 3,
};

const CATEGORIA_RANK: Record<string, number> = {
  Essencial: 1,
  Profissional: 2,
  Premium: 3,
};

export type UserAccess = {
  tier: Tier | null;
  agentSlugs: string[];
};

export function canAccessAgente(agente: Agente, access: UserAccess): boolean {
  if (access.agentSlugs.includes(agente.slug)) return true;

  const agenteRank = CATEGORIA_RANK[agente.categoria];
  if (!agenteRank) return false;

  const userRank = access.tier ? TIER_RANK[access.tier] : 0;
  return userRank >= agenteRank;
}
