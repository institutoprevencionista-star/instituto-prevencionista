import Link from "next/link";
import { Container } from "@/components/ui/Container";

const SECTIONS = [
  { href: "/biblioteca", label: "Biblioteca Gratuita" },
  { href: "/biblioteca-premium", label: "Biblioteca Premium" },
  { href: "/agentes-inteligentes", label: "Agentes Inteligentes" },
  { href: "/consultoria", label: "Consultoria Especializada" },
  { href: "/treinamento-in-company", label: "Treinamento In Company" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-black/10 bg-brand-black text-white/80">
      <Container className="grid gap-8 py-10 sm:grid-cols-2">
        <div>
          <p className="text-lg font-semibold text-white">Instituto Prevencionista</p>
          <p className="mt-2 max-w-sm text-sm">
            Segurança e saúde do trabalho: materiais, treinamentos e consultoria para proteger
            pessoas e empresas.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Seções</p>
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
