"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  { href: "/biblioteca", label: "Biblioteca Gratuita" },
  { href: "/biblioteca-premium", label: "Biblioteca Premium" },
  { href: "/agentes-ia", label: "Agentes de IA" },
  { href: "/consultoria", label: "Consultoria" },
  { href: "/presencial", label: "Presencial" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-brand-green-900">
          <Image
            src="/logo.png"
            alt="Instituto Prevencionista"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span className="hidden sm:inline">Instituto Prevencionista</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-brand-green-700 ${
                pathname?.startsWith(link.href) ? "text-brand-green-700" : "text-brand-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-black/10 lg:hidden"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1">
            <span className="h-0.5 w-5 bg-brand-black" />
            <span className="h-0.5 w-5 bg-brand-black" />
            <span className="h-0.5 w-5 bg-brand-black" />
          </div>
        </button>
      </Container>

      {menuOpen && (
        <nav className="border-t border-black/10 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-brand-black hover:bg-brand-green-700/10"
              >
                {link.label}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
