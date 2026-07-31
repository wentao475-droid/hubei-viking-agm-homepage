import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorRollsStructuredData,
  buildAgmSeparatorRollsMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorRollsMetadata("ru");

export default function Page() {
  return (
    <>
      <AgmSeparatorRollsStructuredData lang="ru" />
      <ProductPage lang="ru" page="agmSeparatorRolls" />
    </>
  );
}
