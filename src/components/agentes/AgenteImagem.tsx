import Image from "next/image";

function isImagemValida(imagem: string): boolean {
  const trimmed = imagem.trim();
  if (!trimmed || trimmed === "#") return false;
  if (trimmed.startsWith("/")) return true;

  try {
    const url = new URL(trimmed);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function AgenteImagem({
  imagem,
  nome,
  className = "",
}: {
  imagem: string;
  nome: string;
  className?: string;
}) {
  if (isImagemValida(imagem)) {
    return (
      <div className={`relative w-full overflow-hidden bg-black/5 ${className}`}>
        <Image src={imagem} alt={nome} fill className="object-cover" unoptimized />
      </div>
    );
  }

  return (
    <div
      className={`flex w-full items-center justify-center bg-brand-green-900 ${className}`}
    >
      <span className="text-4xl font-bold text-brand-gold-400">
        {nome.trim().charAt(0).toUpperCase() || "IP"}
      </span>
    </div>
  );
}
