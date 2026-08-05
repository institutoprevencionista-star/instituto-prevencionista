import Papa from "papaparse";

const DIACRITICS_REGEX = /[̀-ͯ]/g;

function normalizeHeader(header: string): string {
  return header
    .normalize("NFD")
    .replace(DIACRITICS_REGEX, "")
    .trim()
    .toLowerCase();
}

export async function fetchCsvRows(
  url: string | undefined
): Promise<Record<string, string>[]> {
  if (!url) return [];

  const response = await fetch(url, { next: { revalidate: 300 } });
  if (!response.ok) {
    throw new Error(`Falha ao buscar planilha (${response.status})`);
  }

  const csvText = await response.text();
  const { data } = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: normalizeHeader,
  });

  return data.filter((row) => Object.values(row).some((value) => value?.trim()));
}

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(DIACRITICS_REGEX, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
