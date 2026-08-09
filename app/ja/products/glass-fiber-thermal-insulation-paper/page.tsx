import { ProductPage } from "../../../ProductPage";
import {
  buildGlassFiberThermalInsulationPaperMetadata,
  GlassFiberThermalInsulationPaperStructuredData
} from "../../../seo";

export const metadata = buildGlassFiberThermalInsulationPaperMetadata("ja");

export default function Page() {
  return (
    <>
      <GlassFiberThermalInsulationPaperStructuredData lang="ja" />
      <ProductPage lang="ja" page="glassFiberThermalInsulationPaper" />
    </>
  );
}
