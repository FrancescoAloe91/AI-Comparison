export type SourceRef = {
  label: string;
  url: string;
};

export type CuratedPoint = {
  text: string;
  sources: SourceRef[];
};

export type EntityAxes = {
  /** Higher = more self-custody / user-controlled */
  selfCustody: number;
  /** Higher = more open-weight / portable AI stack */
  openStack: number;
  /** Higher = clearer issuer disclosures / licensing posture (curated label) */
  regulatoryPosture: number;
  /** Higher = broader chain & app compatibility */
  interoperability: number;
};

export type EntityRecord = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  officialUrl?: string;
  axes: EntityAxes;
  facts: { label: string; value: string }[];
  pros: CuratedPoint[];
  cons: CuratedPoint[];
  lastReviewed: string;
};

export type EntitiesFile = {
  lastDatasetUpdate: string;
  disclaimer: string;
  entities: EntityRecord[];
};

export type NewsItem = {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  entitySlugs: string[];
  sourceName: string;
};

export type NewsFile = {
  lastFetched: string;
  items: NewsItem[];
};
