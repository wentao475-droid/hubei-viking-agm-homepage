import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorRollsStructuredData,
  buildAgmSeparatorRollsMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorRollsMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmSeparatorRollsStructuredData lang="zh" />
      <ProductPage lang="zh" page="agmSeparatorRolls" />
    </>
  );
}
