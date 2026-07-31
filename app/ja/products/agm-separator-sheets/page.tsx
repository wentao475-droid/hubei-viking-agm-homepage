import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorSheetsStructuredData,
  buildAgmSeparatorSheetsMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorSheetsMetadata("ja");

export default function Page() {
  return (
    <>
      <AgmSeparatorSheetsStructuredData lang="ja" />
      <ProductPage lang="ja" page="agmSeparatorSheets" />
    </>
  );
}
