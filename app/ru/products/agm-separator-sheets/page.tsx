import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorSheetsStructuredData,
  buildAgmSeparatorSheetsMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorSheetsMetadata("ru");

export default function Page() {
  return (
    <>
      <AgmSeparatorSheetsStructuredData lang="ru" />
      <ProductPage lang="ru" page="agmSeparatorSheets" />
    </>
  );
}
