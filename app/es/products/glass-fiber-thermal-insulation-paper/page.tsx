import { ProductPage } from "../../../ProductPage";
import {
  buildGlassFiberThermalInsulationPaperMetadata,
  GlassFiberThermalInsulationPaperStructuredData
} from "../../../seo";

export const metadata = buildGlassFiberThermalInsulationPaperMetadata("es");

export default function Page() {
  return (
    <>
      <GlassFiberThermalInsulationPaperStructuredData lang="es" />
      <ProductPage lang="es" page="glassFiberThermalInsulationPaper" />
    </>
  );
}
