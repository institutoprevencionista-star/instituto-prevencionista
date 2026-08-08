"use client";

import { AgentChatApp } from "@/components/chat/AgentChatApp";

const FULL_MENU = [
  "1. Criar novo PGR",
  "2. Criar Inventário de Riscos",
  "3. Criar Plano de Ação",
  "4. Iniciar levantamento de campo",
  "5. Avaliar setor",
  "6. Avaliar função/grupo",
  "7. Avaliar ergonomia e fatores psicossociais",
  "8. Registrar avaliação ocupacional existente",
  "9. Solicitar avaliação ocupacional",
  "10. Revisar PGR existente",
  "11. Diagnosticar pendências",
  "12. Gerar relatório fotográfico",
  "13. Monitorar Plano de Ação",
  "14. Revisar/Atualizar PGR",
  "15. Gerar Dashboard",
  "16. Continuar projeto existente",
  "17. Gerar documentos finais",
  "18. Pacote completo",
];

export function ChatApp() {
  return (
    <AgentChatApp
      apiPath="/api/pgr-inteligente/chat"
      headerTitle="INSTITUTO PREVENCIONISTA"
      headerSubtitle="PGR Inteligente v4.0"
      bubbleLabel="IP — PGR Inteligente v4.0"
      welcomeTitle="Bem-vindo ao seu assistente inteligente para Gerenciamento de Riscos Ocupacionais (GRO) e PGR."
      welcomeSubtitle="O que deseja realizar?"
      menu={FULL_MENU}
    />
  );
}
