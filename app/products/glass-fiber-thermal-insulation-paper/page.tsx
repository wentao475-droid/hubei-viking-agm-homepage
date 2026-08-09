import { ProductPage } from "../../ProductPage";
import {
  buildGlassFiberThermalInsulationPaperMetadata,
  GlassFiberThermalInsulationPaperStructuredData
} from "../../seo";

export const metadata = buildGlassFiberThermalInsulationPaperMetadata("en");

export default function Page() {
  return (
    <>
      <GlassFiberThermalInsulationPaperStructuredData lang="en" />
      <ProductPage lang="en" page="glassFiberThermalInsulationPaper" />
    </>
  );
}
