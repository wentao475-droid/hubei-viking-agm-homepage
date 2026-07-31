import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorTestingStructuredData,
  buildAgmSeparatorTestingMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorTestingMetadata("ru");

export default function Page() {
  return (
    <>
      <AgmSeparatorTestingStructuredData lang="ru" />
      <ProductPage lang="ru" page="agmSeparatorTesting" />
    </>
  );
}
