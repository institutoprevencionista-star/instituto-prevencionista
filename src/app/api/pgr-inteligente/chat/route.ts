import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getCurrentUser, getUserAccess } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getAgentes } from "@/lib/catalog";
import { canAccessAgente } from "@/lib/access";
import { PGR_INTELIGENTE_SYSTEM_PROMPT } from "@/lib/agents/pgr-inteligente-prompt";

const AGENT_SLUG = "ip-pgr-inteligente";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  if (isSupabaseConfigured()) {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
    }

    const agentes = await getAgentes();
    const agente = agentes.find((item) => item.slug === AGENT_SLUG);
    const access = await getUserAccess(user.id);
    if (!agente || !canAccessAgente(agente, access)) {
      return NextResponse.json({ error: "Sem acesso a este agente." }, { status: 403 });
    }
  }

  const body = await request.json().catch(() => null);
  if (!body || !Array.isArray(body.messages)) {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const messages = body.messages as ChatMessage[];
  const imageDataUrl = typeof body.image === "string" ? body.image : null;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      reply:
        "Este agente está em fase final de configuração e estará disponível em breve. Sua mensagem já ficou registrada por aqui.",
      configured: false,
    });
  }

  const openai = new OpenAI({ apiKey });

  const lastUserIndex = messages.map((m) => m.role).lastIndexOf("user");
  const openaiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: PGR_INTELIGENTE_SYSTEM_PROMPT },
    ...messages.map((m, index): OpenAI.Chat.ChatCompletionMessageParam => {
      if (m.role === "user" && index === lastUserIndex && imageDataUrl) {
        return {
          role: "user",
          content: [
            { type: "text", text: m.content || "Analise esta fotografia." },
            { type: "image_url", image_url: { url: imageDataUrl } },
          ],
        };
      }
      return { role: m.role, content: m.content };
    }),
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: openaiMessages,
      temperature: 0.4,
    });

    const reply = completion.choices[0]?.message?.content ?? "Não foi possível gerar uma resposta.";
    return NextResponse.json({ reply, configured: true });
  } catch (error) {
    console.error("Erro ao chamar a API da OpenAI:", error);
    return NextResponse.json(
      { error: "Erro ao conversar com o agente. Tente novamente em instantes." },
      { status: 502 }
    );
  }
}
