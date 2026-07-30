import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorStructuredData,
  buildAgmSeparatorMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorMetadata("ru");

export default function Page() {
  return (
    <>
      <AgmSeparatorStructuredData lang="ru" />
      <ProductPage lang="ru" />
    </>
  );
}
