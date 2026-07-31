import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorRollsStructuredData,
  buildAgmSeparatorRollsMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorRollsMetadata("ko");

export default function Page() {
  return (
    <>
      <AgmSeparatorRollsStructuredData lang="ko" />
      <ProductPage lang="ko" page="agmSeparatorRolls" />
    </>
  );
}
