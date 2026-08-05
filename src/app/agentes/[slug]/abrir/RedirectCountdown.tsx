"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/Button";

export function RedirectCountdown({ href }: { href: string }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.replace(href);
    }, 1600);
    return () => clearTimeout(timer);
  }, [href]);

  return (
    <ButtonLink href={href} variant="white">
      Continuar agora
    </ButtonLink>
  );
}
