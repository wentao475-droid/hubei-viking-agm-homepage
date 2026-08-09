import { ProductPage } from "../../../ProductPage";
import {
  buildGlassFiberThermalInsulationPaperMetadata,
  GlassFiberThermalInsulationPaperStructuredData
} from "../../../seo";

export const metadata = buildGlassFiberThermalInsulationPaperMetadata("ko");

export default function Page() {
  return (
    <>
      <GlassFiberThermalInsulationPaperStructuredData lang="ko" />
      <ProductPage lang="ko" page="glassFiberThermalInsulationPaper" />
    </>
  );
}
