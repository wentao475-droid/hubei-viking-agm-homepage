import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorSheetsStructuredData,
  buildAgmSeparatorSheetsMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorSheetsMetadata("ko");

export default function Page() {
  return (
    <>
      <AgmSeparatorSheetsStructuredData lang="ko" />
      <ProductPage lang="ko" page="agmSeparatorSheets" />
    </>
  );
}
