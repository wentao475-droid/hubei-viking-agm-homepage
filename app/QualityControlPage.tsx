import { ProductPage } from "./ProductPage";
import type { Lang } from "./VikingHome";

export function QualityControlPage({ lang }: { lang: Lang }) {
  return <ProductPage lang={lang} page="agmSeparatorTesting" />;
}
