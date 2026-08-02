import { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`flex flex-col rounded-2xl border border-black/5 bg-white p-7 shadow-[0_2px_10px_rgba(15,61,36,0.06)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,61,36,0.12)] ${className}`}
    >
      {children}
    </div>
  );
}
