import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorStructuredData,
  buildAgmSeparatorMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorMetadata("es");

export default function Page() {
  return (
    <>
      <AgmSeparatorStructuredData lang="es" />
      <ProductPage lang="es" />
    </>
  );
}
