import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorSheetsStructuredData,
  buildAgmSeparatorSheetsMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorSheetsMetadata("pt");

export default function Page() {
  return (
    <>
      <AgmSeparatorSheetsStructuredData lang="pt" />
      <ProductPage lang="pt" page="agmSeparatorSheets" />
    </>
  );
}
