import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorTestingStructuredData,
  buildAgmSeparatorTestingMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorTestingMetadata("ja");

export default function Page() {
  return (
    <>
      <AgmSeparatorTestingStructuredData lang="ja" />
      <ProductPage lang="ja" page="agmSeparatorTesting" />
    </>
  );
}
