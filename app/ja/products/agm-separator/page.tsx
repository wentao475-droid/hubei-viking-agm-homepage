import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorStructuredData,
  buildAgmSeparatorMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorMetadata("ja");

export default function Page() {
  return (
    <>
      <AgmSeparatorStructuredData lang="ja" />
      <ProductPage lang="ja" />
    </>
  );
}
