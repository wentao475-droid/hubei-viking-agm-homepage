import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorRollsStructuredData,
  buildAgmSeparatorRollsMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorRollsMetadata("es");

export default function Page() {
  return (
    <>
      <AgmSeparatorRollsStructuredData lang="es" />
      <ProductPage lang="es" page="agmSeparatorRolls" />
    </>
  );
}
