import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorTestingStructuredData,
  buildAgmSeparatorTestingMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorTestingMetadata("pt");

export default function Page() {
  return (
    <>
      <AgmSeparatorTestingStructuredData lang="pt" />
      <ProductPage lang="pt" page="agmSeparatorTesting" />
    </>
  );
}
