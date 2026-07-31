import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorTestingStructuredData,
  buildAgmSeparatorTestingMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorTestingMetadata("ko");

export default function Page() {
  return (
    <>
      <AgmSeparatorTestingStructuredData lang="ko" />
      <ProductPage lang="ko" page="agmSeparatorTesting" />
    </>
  );
}
