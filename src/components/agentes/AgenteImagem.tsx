import Image from "next/image";
import { isLinkDisponivel } from "@/lib/catalog";

export function AgenteImagem({
  imagem,
  nome,
  className = "",
}: {
  imagem: string;
  nome: string;
  className?: string;
}) {
  if (isLinkDisponivel(imagem)) {
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
