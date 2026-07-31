import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como o Instituto Prevencionista trata os dados coletados neste site.",
};

export default function PoliticaPrivacidadePage() {
  return (
    <Container className="max-w-3xl py-16">
      <h1 className="text-3xl font-bold text-brand-black">Política de Privacidade</h1>

      <p className="mt-6 text-black/80">
        O Instituto Prevencionista respeita a sua privacidade e segue a Lei Geral de Proteção de
        Dados (LGPD — Lei nº 13.709/2018). Esta página explica quais dados coletamos neste site,
        para que servem e como você pode exercer seus direitos.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-brand-green-900">Quais dados coletamos</h2>
      <p className="mt-3 text-black/80">
        Coletamos os dados que você mesmo informa ao preencher um dos formulários deste site:
        nome, e-mail, WhatsApp e, dependendo do formulário, cidade e informações sobre a sua
        necessidade de treinamento ou consultoria.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-brand-green-900">
        Para que usamos esses dados
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-black/80">
        <li>Enviar o material gratuito solicitado na Biblioteca Gratuita;</li>
        <li>
          Entrar em contato para apresentar propostas de consultoria, treinamento personalizado ou
          presencial;
        </li>
        <li>Manter um cadastro para futuras comunicações sobre nossos serviços.</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-brand-green-900">
        Onde os dados ficam armazenados
      </h2>
      <p className="mt-3 text-black/80">
        Os dados enviados nos formulários são armazenados em planilhas próprias do Instituto
        Prevencionista, com acesso restrito. O envio do material gratuito por e-mail é feito por
        meio de um provedor de e-mail transacional.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-brand-green-900">Seus direitos</h2>
      <p className="mt-3 text-black/80">
        Você pode solicitar a qualquer momento a confirmação, correção ou exclusão dos seus dados,
        entrando em contato pelos canais informados no rodapé deste site.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-brand-green-900">Contato</h2>
      <p className="mt-3 text-black/80">
        Em caso de dúvidas sobre esta política, entre em contato com o Instituto Prevencionista
        pelos canais de atendimento divulgados no site.
      </p>
    </Container>
  );
}
