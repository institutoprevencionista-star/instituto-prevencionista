import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { buildWhatsappUrl, WHATSAPP_NUMBER } from "@/lib/contact";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/icons/SocialIcons";

const SECTIONS = [
  { href: "/biblioteca", label: "Biblioteca Gratuita" },
  { href: "/biblioteca-premium", label: "Biblioteca Premium" },
  { href: "/agentes-inteligentes", label: "Agentes Inteligentes" },
  { href: "/consultoria", label: "Consultoria Especializada" },
  { href: "/treinamento-in-company", label: "Treinamento In Company" },
];

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/institutoprevencionista/", label: "Instagram", icon: InstagramIcon },
  { href: "https://www.facebook.com/InstitutoPrevencionista/", label: "Facebook", icon: FacebookIcon },
  { href: "https://linkedin.com/company/instituto-prevencionista", label: "LinkedIn", icon: LinkedinIcon },
  { href: "https://www.youtube.com/@InstitutoPrevencionista", label: "YouTube", icon: YoutubeIcon },
];

const CONTACT_EMAIL = "contato@institutoprevencionista.com.br";
const WHATSAPP_LABEL = `(${WHATSAPP_NUMBER.slice(2, 4)}) ${WHATSAPP_NUMBER.slice(4, 9)}-${WHATSAPP_NUMBER.slice(9)}`;
const WHATSAPP_HREF = buildWhatsappUrl("Olá! Vim pelo site do Instituto Prevencionista.");

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-black/10 bg-brand-black text-white/80">
      <Container className="grid gap-10 py-12 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Instituto Prevencionista"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <p className="text-lg font-semibold text-white">Instituto Prevencionista</p>
          </div>
          <p className="mt-3 max-w-sm text-sm">
            Segurança e saúde do trabalho: materiais, treinamentos, agentes de IA e consultoria
            para proteger pessoas e empresas.
          </p>
          <div className="mt-4 flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Soluções</p>
          <ul className="mt-3 flex flex-col gap-2">
            {SECTIONS.map((section) => (
              <li key={section.href}>
                <Link href={section.href} className="text-sm hover:text-white">
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Contato</p>
          <ul className="mt-3 flex flex-col gap-3">
            <li>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-white"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                {WHATSAPP_LABEL}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2 text-sm hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} Instituto Prevencionista. Todos os direitos reservados.</p>
        <Link href="/politica-privacidade" className="hover:text-white">
          Política de Privacidade
        </Link>
      </Container>
    </footer>
  );
}
