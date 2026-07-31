import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorSheetsStructuredData,
  buildAgmSeparatorSheetsMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorSheetsMetadata("vi");

export default function Page() {
  return (
    <>
      <AgmSeparatorSheetsStructuredData lang="vi" />
      <ProductPage lang="vi" page="agmSeparatorSheets" />
    </>
  );
}
