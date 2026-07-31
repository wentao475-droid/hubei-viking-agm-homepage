import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorRollsStructuredData,
  buildAgmSeparatorRollsMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorRollsMetadata("ja");

export default function Page() {
  return (
    <>
      <AgmSeparatorRollsStructuredData lang="ja" />
      <ProductPage lang="ja" page="agmSeparatorRolls" />
    </>
  );
}
