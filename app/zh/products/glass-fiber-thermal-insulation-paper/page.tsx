import { ProductPage } from "../../../ProductPage";
import {
  buildGlassFiberThermalInsulationPaperMetadata,
  GlassFiberThermalInsulationPaperStructuredData
} from "../../../seo";

export const metadata = buildGlassFiberThermalInsulationPaperMetadata("zh");

export default function Page() {
  return (
    <>
      <GlassFiberThermalInsulationPaperStructuredData lang="zh" />
      <ProductPage lang="zh" page="glassFiberThermalInsulationPaper" />
    </>
  );
}
