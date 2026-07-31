import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorSheetsStructuredData,
  buildAgmSeparatorSheetsMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorSheetsMetadata("es");

export default function Page() {
  return (
    <>
      <AgmSeparatorSheetsStructuredData lang="es" />
      <ProductPage lang="es" page="agmSeparatorSheets" />
    </>
  );
}
