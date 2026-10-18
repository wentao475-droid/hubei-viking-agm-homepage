export const secondaryResourceLocales: readonly string[];
export const articleKinds: readonly string[];
export const articleDefinitions: Record<
  string,
  readonly [string, string, string, string?]
>;
export const secondaryResourceData: Record<string, any>;
export const secondaryArticleCopy: Record<string, Record<string, any>>;
export function buildSecondaryArticleSeo(locale: string, kind: string): any;

export function generatedArticleImage(locale: string, kind: string, title: string): { src: string; alt: string; width: number; height: number; caption: string } | null;
