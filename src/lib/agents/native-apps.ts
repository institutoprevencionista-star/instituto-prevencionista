// Agentes que têm uma tela própria no site (estilo app) em vez de abrir
// direto no ChatGPT. Quando o slug estiver aqui, /agentes/[slug]/abrir
// leva para essa página em vez do link externo do agente.
export const NATIVE_APP_PATHS: Record<string, string> = {
  "ip-inspecao-sst-ai": "/inspecao-sst-ia",
  "ip-pgr-inteligente": "/pgr-inteligente",
};
