import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorRollsStructuredData,
  buildAgmSeparatorRollsMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorRollsMetadata("vi");

export default function Page() {
  return (
    <>
      <AgmSeparatorRollsStructuredData lang="vi" />
      <ProductPage lang="vi" page="agmSeparatorRolls" />
    </>
  );
}
