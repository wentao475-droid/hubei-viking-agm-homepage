import { ProductPage } from "../../../ProductPage";
import {
  buildGlassFiberThermalInsulationPaperMetadata,
  GlassFiberThermalInsulationPaperStructuredData
} from "../../../seo";

export const metadata = buildGlassFiberThermalInsulationPaperMetadata("ru");

export default function Page() {
  return (
    <>
      <GlassFiberThermalInsulationPaperStructuredData lang="ru" />
      <ProductPage lang="ru" page="glassFiberThermalInsulationPaper" />
    </>
  );
}
