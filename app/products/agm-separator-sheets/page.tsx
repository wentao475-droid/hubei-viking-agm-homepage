import type { Metadata } from "next";
import { ProductPage } from "../../ProductPage";
import {
  AgmSeparatorSheetsStructuredData,
  buildAgmSeparatorSheetsMetadata
} from "../../seo";

export const metadata: Metadata = buildAgmSeparatorSheetsMetadata("en");

export default function Page() {
  return (
    <>
      <AgmSeparatorSheetsStructuredData lang="en" />
      <ProductPage lang="en" page="agmSeparatorSheets" />
    </>
  );
}
