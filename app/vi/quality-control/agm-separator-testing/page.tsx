import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorTestingStructuredData,
  buildAgmSeparatorTestingMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorTestingMetadata("vi");

export default function Page() {
  return (
    <>
      <AgmSeparatorTestingStructuredData lang="vi" />
      <ProductPage lang="vi" page="agmSeparatorTesting" />
    </>
  );
}
