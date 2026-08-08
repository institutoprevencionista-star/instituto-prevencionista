export type AgentPricing = {
  preco: string;
  checkoutUrl: string;
};

// Preços e links de checkout individuais de cada agente na Hotmart. Ao contrário
// dos planos combo (assinatura anual em src/app/planos/page.tsx), todos os
// agentes avulsos são assinatura mensal recorrente.
export const AGENT_PRICING: Record<string, AgentPricing> = {
  "gerador-corprorativo-de-pop": {
    preco: "R$ 39,90/mês",
    checkoutUrl: "https://pay.hotmart.com/X106974349J",
  },
  "ip-comunicacao-sst-pro": {
    preco: "R$ 39,90/mês",
    checkoutUrl: "https://pay.hotmart.com/A106974406Q",
  },
  "ip-inspecao-sst-ai": {
    preco: "R$ 39,90/mês",
    checkoutUrl: "https://pay.hotmart.com/Q106974462Y",
  },
  "ip-treinamento-studio-ai": {
    preco: "R$ 49,90/mês",
    checkoutUrl: "https://pay.hotmart.com/M106974515P",
  },
  "ip-pgr-inteligente": {
    preco: "R$ 49,90/mês",
    checkoutUrl: "https://pay.hotmart.com/G106974594H",
  },
  "ip-gestao-de-contratadas-e-terceiros": {
    preco: "R$ 49,90/mês",
    checkoutUrl: "https://pay.hotmart.com/C106974663O",
  },
  "ip-apr-e-permissao-de-trabalho-ai": {
    preco: "R$ 49,90/mês",
    checkoutUrl: "https://pay.hotmart.com/S106974713N",
  },
  "ip-ltcat-e-ppp": {
    preco: "R$ 49,90/mês",
    checkoutUrl: "https://pay.hotmart.com/T106974785G",
  },
  "ip-gestao-de-saude-ocupacional-ai": {
    preco: "R$ 49,90/mês",
    checkoutUrl: "https://pay.hotmart.com/T106974943M",
  },
  "ip-gestor-inteligente-de-epis": {
    preco: "R$ 49,90/mês",
    checkoutUrl: "https://pay.hotmart.com/P106975007O",
  },
  "ip-nr-26-gestao-quimico-ia": {
    preco: "R$ 49,90/mês",
    checkoutUrl: "https://pay.hotmart.com/H106975059D",
  },
  "ip-ergonomia-inteligente-ia": {
    preco: "R$ 49,90/mês",
    checkoutUrl: "https://pay.hotmart.com/E106975117I",
  },
  "ip-psicossocial-e-ergonomia": {
    preco: "R$ 49,90/mês",
    checkoutUrl: "https://pay.hotmart.com/P106975175F",
  },
  "ip-especialista-nr-12-e-avaliacao-de-riscos": {
    preco: "R$ 49,90/mês",
    checkoutUrl: "https://pay.hotmart.com/N106975235M",
  },
  "ip-investigacao-ia": {
    preco: "R$ 49,90/mês",
    checkoutUrl: "https://pay.hotmart.com/U106975320T",
  },
  "ip-cipa-nr-05": {
    preco: "R$ 49,90/mês",
    checkoutUrl: "https://pay.hotmart.com/U106975381X",
  },
  "ip-insalubridade-e-periculosidade": {
    preco: "R$ 49,90/mês",
    checkoutUrl: "https://pay.hotmart.com/A106975441I",
  },
  "ip-ho-engenharia-laudos-e-pericias": {
    preco: "R$ 49,90/mês",
    checkoutUrl: "https://pay.hotmart.com/Q106975512P",
  },
  "ip-gestao-de-seguranca-incendio": {
    preco: "R$ 49,90/mês",
    checkoutUrl: "https://pay.hotmart.com/A106975583T",
  },
  "ip-nr-33-pro-master": {
    preco: "R$ 49,90/mês",
    checkoutUrl: "https://pay.hotmart.com/T107069365S",
  },
  "ip-nr-35-expert-ai": {
    preco: "R$ 49,90/mês",
    checkoutUrl: "https://pay.hotmart.com/I107069486I",
  },
};
