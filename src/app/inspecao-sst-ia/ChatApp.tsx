"use client";

import { AgentChatApp } from "@/components/chat/AgentChatApp";

const FULL_MENU = [
  "1. Analisar uma fotografia",
  "2. Realizar inspeção em campo pelo celular",
  "3. Realizar inspeção completa de SST",
  "4. Criar um checklist de inspeção (BIC-IP)",
  "5. Avaliar máquina ou equipamento",
  "6. Avaliar prevenção e resposta a emergências",
  "7. Avaliar trabalho em altura, escadas ou plataformas",
  "8. Analisar documentos e registros de SST",
  "9. Identificar NRs e requisitos aplicáveis",
  "10. Avaliar e priorizar riscos (Matriz 5x5 / IPP)",
  "11. Elaborar plano de ação 5W2H",
  "12. Consultar possível enquadramento e multas",
  "13. Gerar relatório de inspeção",
  "14. Gerar apresentação executiva",
  "15. Gerar resumo gerencial",
  "16. Módulo de Consultoria em SST",
  "17. Ver exemplos de utilização",
  "18. Descrever livremente uma necessidade técnica",
];

export function ChatApp() {
  return (
    <AgentChatApp
      apiPath="/api/inspecao-sst-ia/chat"
      headerTitle="INSTITUTO PREVENCIONISTA"
      headerSubtitle="Inspeção SST AI v3.0"
      bubbleLabel="IP — AI Modular v3.0"
      welcomeTitle="Bem-vindo ao seu assistente inteligente para inspeções de Segurança e Saúde no Trabalho."
      welcomeSubtitle="O que deseja realizar?"
      menu={FULL_MENU}
    />
  );
}
