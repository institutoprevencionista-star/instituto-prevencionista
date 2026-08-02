import { BookOpen, Bot, Crown, GraduationCap, Users, type LucideIcon } from "lucide-react";

export const SECTIONS: {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    href: "/biblioteca",
    title: "Biblioteca Gratuita",
    description:
      "Materiais gratuitos sobre segurança e saúde do trabalho. Baixe informando nome, e-mail e WhatsApp.",
    icon: BookOpen,
  },
  {
    href: "/biblioteca-premium",
    title: "Biblioteca Premium",
    description: "Treinamentos pagos e completos, com acesso liberado direto no checkout.",
    icon: Crown,
  },
  {
    href: "/agentes-inteligentes",
    title: "Agentes Inteligentes",
    description: "Agentes de inteligência artificial especializados para apoiar seu dia a dia em SST.",
    icon: Bot,
  },
  {
    href: "/consultoria",
    title: "Consultoria Especializada",
    description: "Conte sua necessidade e receba uma proposta sob medida para sua empresa.",
    icon: Users,
  },
  {
    href: "/treinamento-in-company",
    title: "Treinamento In Company",
    description: "Solicite um treinamento presencial na sua cidade para sua equipe.",
    icon: GraduationCap,
  },
];
