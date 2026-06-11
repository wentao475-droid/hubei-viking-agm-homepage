import type { Metadata } from "next";
import { ProductPage } from "../../ProductPage";
import {
  AgmSeparatorRollsStructuredData,
  buildAgmSeparatorRollsMetadata
} from "../../seo";

export const metadata: Metadata = buildAgmSeparatorRollsMetadata("en");

export default function Page() {
  return (
    <>
      <AgmSeparatorRollsStructuredData lang="en" />
      <ProductPage lang="en" page="agmSeparatorRolls" />
    </>
  );
}
