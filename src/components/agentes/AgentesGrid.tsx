"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { ButtonLink, Button } from "@/components/ui/Button";
import { isLinkDisponivel, type Agente } from "@/lib/catalog";
import { canAccessAgente, type UserAccess } from "@/lib/access";

export function AgentesGrid({
  agentes,
  access,
}: {
  agentes: Agente[];
  access: UserAccess | null;
}) {
  const [busca, setBusca] = useState("");

  const agentesFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return agentes;

    return agentes.filter((agente) =>
      [agente.nome, agente.descricao, agente.categoria]
        .join(" ")
        .toLowerCase()
        .includes(termo)
    );
  }, [agentes, busca]);

  return (
    <div>
      <div className="mx-auto max-w-md">
        <input
          type="search"
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
          placeholder="Buscar agente por nome ou categoria..."
          className="w-full rounded-md border border-black/20 bg-white px-4 py-2.5 text-sm focus:border-brand-green-700 focus:outline-none focus:ring-1 focus:ring-brand-green-700"
        />
      </div>

      {agentesFiltrados.length === 0 ? (
        <p className="mt-10 text-center text-black/60">Nenhum agente encontrado para essa busca.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agentesFiltrados.map((agente) => {
            const liberado = access === null || canAccessAgente(agente, access);

            return (
              <Card key={agente.slug} className="justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    {agente.categoria && (
                      <span className="text-xs font-semibold uppercase tracking-wide text-brand-gold-500">
                        {agente.categoria}
                      </span>
                    )}
                    {!isLinkDisponivel(agente.link) && (
                      <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs font-semibold text-black/60">
                        Em breve
                      </span>
                    )}
                  </div>
                  <h2 className="mt-1 text-lg font-semibold text-brand-green-900">{agente.nome}</h2>
                  <p className="mt-2 text-sm text-black/70">{agente.descricao}</p>
                </div>
                {!isLinkDisponivel(agente.link) ? (
                  <Button variant="primary" className="mt-6" disabled>
                    Em breve
                  </Button>
                ) : !liberado ? (
                  <Button variant="primary" className="mt-6" disabled>
                    Disponível no plano {agente.categoria}
                  </Button>
                ) : (
                  <ButtonLink
                    href={`/agentes/${agente.slug}/abrir`}
                    target="_blank"
                    className="mt-6"
                  >
                    Acessar agente
                  </ButtonLink>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
