"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ITEMS_PER_PAGE = 6;

type Message = {
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
};

export type AgentChatAppProps = {
  apiPath: string;
  headerTitle: string;
  headerSubtitle: string;
  bubbleLabel: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  menu: string[];
};

export function AgentChatApp({
  apiPath,
  headerTitle,
  headerSubtitle,
  bubbleLabel,
  welcomeTitle,
  welcomeSubtitle,
  menu,
}: AgentChatAppProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [menuPage, setMenuPage] = useState(0);
  const [showMenu, setShowMenu] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, showMenu]);

  async function sendToAgent(userText: string, imageDataUrl?: string) {
    const userMessage: Message = { role: "user", content: userText, imageUrl: imageDataUrl };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setShowMenu(false);
    setLoading(true);

    try {
      const res = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
          image: imageDataUrl ?? null,
        }),
      });

      const data = await res.json();
      const reply = res.ok
        ? (data.reply as string)
        : (data.error as string) ?? "Não foi possível obter uma resposta agora.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Não foi possível conectar ao agente agora. Tente novamente." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSend() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    void sendToAgent(text);
  }

  function handleMenuSelection(num: string) {
    const item = menu.find((entry) => entry.startsWith(`${num}.`));
    void sendToAgent(item ?? num);
  }

  function handleMenuCommand() {
    setShowMenu(true);
    setMenuPage(0);
  }

  function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      void sendToAgent("Fotografia enviada para análise.", dataUrl);
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  const start = menuPage * ITEMS_PER_PAGE;
  const visibleMenuItems = menu.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="flex justify-center bg-black/[0.03] py-6 sm:py-10">
      <div className="flex h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-xl sm:h-[80vh]">
        {/* Header */}
        <header className="flex shrink-0 items-center gap-3 bg-brand-green-900 px-4 py-3 text-white shadow-md">
          <Image
            src="/logo.png"
            alt="Instituto Prevencionista"
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full object-contain"
          />
          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold leading-tight tracking-wide">
              {headerTitle}
            </h1>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-gold-400">
              {headerSubtitle}
            </p>
          </div>
        </header>

        {/* Slogan */}
        <div className="shrink-0 border-b border-black/10 bg-brand-black py-1.5 text-center">
          <p className="text-[11px] italic text-white/70">
            &quot;Prevenção com inteligência. Segurança com inovação.&quot;
          </p>
        </div>

        {/* Chat area */}
        <main ref={chatRef} className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4">
          {showMenu && (
            <AssistantBubble bubbleLabel={bubbleLabel}>
              <p className="mb-2 border-b border-black/10 pb-2 text-base font-bold text-brand-green-900">
                {welcomeTitle}
              </p>
              <p className="mb-3 text-sm text-black/70">{welcomeSubtitle}</p>
              <div className="space-y-2">
                {visibleMenuItems.map((item) => {
                  const num = item.split(".")[0];
                  return (
                    <button
                      key={item}
                      onClick={() => handleMenuSelection(num)}
                      className="flex w-full items-center gap-3 rounded-lg border border-black/10 bg-white p-3 text-left text-sm text-black/80 shadow-sm transition-colors hover:border-brand-green-700 hover:bg-brand-green-700/5"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/5 text-xs font-bold text-black/50">
                        {num}
                      </span>
                      <span className="truncate font-medium">
                        {item.slice(item.indexOf(".") + 1).trim()}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 flex gap-2">
                {menuPage > 0 && (
                  <button
                    onClick={() => setMenuPage((p) => p - 1)}
                    className="flex-1 rounded-lg bg-black/5 py-2 text-xs font-bold uppercase tracking-wider text-black/70"
                  >
                    Anterior
                  </button>
                )}
                {start + ITEMS_PER_PAGE < menu.length && (
                  <button
                    onClick={() => setMenuPage((p) => p + 1)}
                    className="flex-1 rounded-lg bg-brand-green-900 py-2 text-xs font-bold uppercase tracking-wider text-white"
                  >
                    Ver mais opções
                  </button>
                )}
              </div>
            </AssistantBubble>
          )}

          {messages.map((message, index) =>
            message.role === "user" ? (
              <UserBubble key={index} message={message} />
            ) : (
              <AssistantBubble key={index} bubbleLabel={bubbleLabel}>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-black/80">
                  {message.content}
                </p>
              </AssistantBubble>
            )
          )}

          {loading && (
            <AssistantBubble bubbleLabel={bubbleLabel}>
              <div className="flex h-4 items-center gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-black/40 [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-black/40 [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-black/40" />
              </div>
            </AssistantBubble>
          )}
        </main>

        {/* Footer / input */}
        <footer className="flex shrink-0 items-end gap-2 border-t border-black/10 bg-white p-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handlePhotoChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Enviar foto"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/5 text-black/60 transition-colors hover:bg-black/10"
          >
            📷
          </button>
          <button
            onClick={handleMenuCommand}
            title="Menu principal"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/5 text-black/60 transition-colors hover:bg-black/10"
          >
            ☰
          </button>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleSend();
            }}
            placeholder="Digite sua mensagem ou comando..."
            className="flex-1 rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-2.5 text-sm focus:border-brand-green-700 focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            title="Enviar"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-700 text-white shadow-md transition-colors hover:bg-brand-green-900 disabled:opacity-50"
          >
            ➤
          </button>
        </footer>
      </div>
    </div>
  );
}

function AssistantBubble({
  children,
  bubbleLabel,
}: {
  children: React.ReactNode;
  bubbleLabel: string;
}) {
  return (
    <div className="flex w-full items-start gap-3">
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-brand-green-900 text-xs text-white shadow-sm">
        IA
      </div>
      <div className="flex max-w-[85%] flex-col gap-1">
        <span className="ml-1 text-[10px] font-semibold uppercase text-black/40">
          {bubbleLabel}
        </span>
        <div className="rounded-2xl rounded-tl-none border border-black/10 bg-white p-3 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}

function UserBubble({ message }: { message: Message }) {
  return (
    <div className="flex w-full justify-end">
      <div className="flex max-w-[85%] flex-col items-end gap-1">
        <span className="mr-1 text-[10px] font-semibold uppercase text-black/40">Você</span>
        <div className="rounded-2xl rounded-tr-none bg-brand-green-700 p-3 text-sm text-white shadow-sm">
          {message.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={message.imageUrl}
              alt="Evidência enviada"
              className="mb-1 w-48 rounded-lg border-2 border-white/50 object-cover"
            />
          )}
          {message.content}
        </div>
      </div>
    </div>
  );
}
