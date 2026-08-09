import { ProductPage } from "../../../ProductPage";
import {
  buildGlassFiberThermalInsulationPaperMetadata,
  GlassFiberThermalInsulationPaperStructuredData
} from "../../../seo";

export const metadata = buildGlassFiberThermalInsulationPaperMetadata("pt");

export default function Page() {
  return (
    <>
      <GlassFiberThermalInsulationPaperStructuredData lang="pt" />
      <ProductPage lang="pt" page="glassFiberThermalInsulationPaper" />
    </>
  );
}
