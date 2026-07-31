import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorTestingStructuredData,
  buildAgmSeparatorTestingMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorTestingMetadata("es");

export default function Page() {
  return (
    <>
      <AgmSeparatorTestingStructuredData lang="es" />
      <ProductPage lang="es" page="agmSeparatorTesting" />
    </>
  );
}
