import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorSheetsStructuredData,
  buildAgmSeparatorSheetsMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorSheetsMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmSeparatorSheetsStructuredData lang="zh" />
      <ProductPage lang="zh" page="agmSeparatorSheets" />
    </>
  );
}
