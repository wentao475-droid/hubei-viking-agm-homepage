import { ProductPage } from "../../../ProductPage";
import {
  buildGlassFiberThermalInsulationPaperMetadata,
  GlassFiberThermalInsulationPaperStructuredData
} from "../../../seo";

export const metadata = buildGlassFiberThermalInsulationPaperMetadata("vi");

export default function Page() {
  return (
    <>
      <GlassFiberThermalInsulationPaperStructuredData lang="vi" />
      <ProductPage lang="vi" page="glassFiberThermalInsulationPaper" />
    </>
  );
}
