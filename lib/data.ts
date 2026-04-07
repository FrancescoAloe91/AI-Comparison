import type { EntitiesFile, EntityRecord, NewsFile, NewsItem } from "@/data/types";
import entitiesJson from "@/data/entities.json";
import newsJson from "@/data/news.json";

const entitiesFile = entitiesJson as EntitiesFile;
const newsFile = newsJson as NewsFile;

export function getEntities(): EntityRecord[] {
  return entitiesFile.entities;
}

export function getEntityBySlug(slug: string): EntityRecord | undefined {
  return entitiesFile.entities.find((e) => e.slug === slug);
}

export function getEntitiesMeta() {
  return {
    lastDatasetUpdate: entitiesFile.lastDatasetUpdate,
    disclaimer: entitiesFile.disclaimer,
  };
}

export function getNews(): NewsItem[] {
  return newsFile.items;
}

export function getNewsMeta() {
  return { lastFetched: newsFile.lastFetched };
}

export function getNewsForEntity(slug: string): NewsItem[] {
  return newsFile.items.filter((n) => n.entitySlugs.includes(slug));
}
