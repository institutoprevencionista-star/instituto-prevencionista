import { fetchCsvRows, slugify } from "./csv";

export type Material = {
  slug: string;
  titulo: string;
  descricao: string;
  categoria: string;
  imagem: string;
  linkDrive: string;
};

export type Treinamento = {
  slug: string;
  titulo: string;
  descricao: string;
  categoria: string;
  imagem: string;
  preco: string;
  linkHotmart: string;
};

export type Agente = {
  slug: string;
  nome: string;
  descricao: string;
  categoria: string;
  imagem: string;
  link: string;
};

const PLACEHOLDER_MATERIAIS: Material[] = [
  {
    slug: "checklist-nr-35",
    titulo: "Checklist NR-35 (exemplo)",
    descricao:
      "Este é um material de exemplo. Cadastre seus materiais reais na planilha do Google configurada em SHEETS_MATERIAIS_CSV_URL.",
    categoria: "Exemplo",
    imagem: "",
    linkDrive: "#",
  },
];

const PLACEHOLDER_TREINAMENTOS: Treinamento[] = [
  {
    slug: "treinamento-exemplo",
    titulo: "Treinamento exemplo",
    descricao:
      "Este é um treinamento de exemplo. Cadastre os treinamentos reais na planilha configurada em SHEETS_TREINAMENTOS_CSV_URL.",
    categoria: "Exemplo",
    imagem: "",
    preco: "",
    linkHotmart: "#",
  },
];

const PLACEHOLDER_AGENTES: Agente[] = [
  {
    slug: "agente-exemplo",
    nome: "Agente exemplo",
    descricao:
      "Este é um agente de exemplo. Cadastre os 20+ agentes reais na planilha configurada em SHEETS_AGENTES_CSV_URL.",
    categoria: "Exemplo",
    imagem: "",
    link: "#",
  },
];

function withSlug(row: Record<string, string>, nameField: string): string {
  const explicit = row.slug?.trim();
  if (explicit) return slugify(explicit);
  return slugify(row[nameField] ?? "");
}

export async function getMateriais(): Promise<Material[]> {
  const rows = await fetchCsvRows(process.env.SHEETS_MATERIAIS_CSV_URL);
  if (rows.length === 0) return PLACEHOLDER_MATERIAIS;

  return rows.map((row) => ({
    slug: withSlug(row, "titulo"),
    titulo: row.titulo ?? "",
    descricao: row.descricao ?? "",
    categoria: row.categoria ?? "",
    imagem: row.imagem ?? "",
    linkDrive: row.linkdrive ?? row.link ?? "#",
  }));
}

export async function getTreinamentos(): Promise<Treinamento[]> {
  const rows = await fetchCsvRows(process.env.SHEETS_TREINAMENTOS_CSV_URL);
  if (rows.length === 0) return PLACEHOLDER_TREINAMENTOS;

  return rows.map((row) => ({
    slug: withSlug(row, "titulo"),
    titulo: row.titulo ?? "",
    descricao: row.descricao ?? "",
    categoria: row.categoria ?? "",
    imagem: row.imagem ?? "",
    preco: row.preco ?? "",
    linkHotmart: row.linkhotmart ?? row.link ?? "#",
  }));
}

export async function getAgentes(): Promise<Agente[]> {
  const rows = await fetchCsvRows(process.env.SHEETS_AGENTES_CSV_URL);
  if (rows.length === 0) return PLACEHOLDER_AGENTES;

  return rows.map((row) => ({
    slug: withSlug(row, "nome"),
    nome: row.nome ?? "",
    descricao: row.descricao ?? "",
    categoria: row.categoria ?? "",
    imagem: row.imagem ?? "",
    link: row.link ?? "#",
  }));
}

export async function getMaterialBySlug(slug: string): Promise<Material | undefined> {
  const materiais = await getMateriais();
  return materiais.find((material) => material.slug === slug);
}

export async function getTreinamentoBySlug(
  slug: string
): Promise<Treinamento | undefined> {
  const treinamentos = await getTreinamentos();
  return treinamentos.find((treinamento) => treinamento.slug === slug);
}
