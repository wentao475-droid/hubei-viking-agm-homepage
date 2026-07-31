import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorRollsStructuredData,
  buildAgmSeparatorRollsMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorRollsMetadata("pt");

export default function Page() {
  return (
    <>
      <AgmSeparatorRollsStructuredData lang="pt" />
      <ProductPage lang="pt" page="agmSeparatorRolls" />
    </>
  );
}
