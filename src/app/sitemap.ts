import type { MetadataRoute } from "next";
import { getMateriais, getTreinamentos } from "@/lib/catalog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://institutoprevencionista.vercel.app";

const STATIC_ROUTES = [
  "",
  "/biblioteca",
  "/treinamentos-vip",
  "/agentes-ia",
  "/consultoria",
  "/presencial",
  "/politica-privacidade",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [materiais, treinamentos] = await Promise.all([getMateriais(), getTreinamentos()]);

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
  }));

  const materiaisEntries = materiais.map((material) => ({
    url: `${SITE_URL}/biblioteca/${material.slug}`,
  }));

  const treinamentosEntries = treinamentos.map((treinamento) => ({
    url: `${SITE_URL}/treinamentos-vip/${treinamento.slug}`,
  }));

  return [...staticEntries, ...materiaisEntries, ...treinamentosEntries];
}
