export type AssetRecord = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  preview: string;
  download?: string;
  format: string;
  width?: number;
  height?: number;
  directions?: number;
  footprint?: string;
  transparent?: boolean;
  license: string;
  published: boolean;
};

const modules = import.meta.glob("../data/assets/*.json", {
  eager: true,
  import: "default",
});

export function getAssets(): AssetRecord[] {
  return Object.values(modules)
    .map((entry) => entry as AssetRecord)
    .filter((asset) => asset.published)
    .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
}

export function getAsset(slug: string): AssetRecord | undefined {
  return getAssets().find((asset) => asset.slug === slug);
}
