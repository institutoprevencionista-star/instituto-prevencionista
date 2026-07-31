import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Entrar",
};

export default async function LoginPage(props: PageProps<"/login">) {
  const searchParams = await props.searchParams;
  const nextParam = searchParams.next;
  const next = (Array.isArray(nextParam) ? nextParam[0] : nextParam) ?? "/agentes-inteligentes";

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-md rounded-lg border border-black/10 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-brand-black">Acessar Agentes Inteligentes</h1>
        <p className="mt-2 text-sm text-black/70">
          Digite seu e-mail liberado para receber um link de acesso.
        </p>

        <div className="mt-6">
          <LoginForm next={next} />
        </div>
      </div>
    </Container>
  );
}
