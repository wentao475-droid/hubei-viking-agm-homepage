import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorUpsApplicationStructuredData,
  buildAgmSeparatorUpsApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorUpsApplicationMetadata("es");

export default function Page() {
  return (
    <>
      <AgmSeparatorUpsApplicationStructuredData lang="es" />
      <ProductPage lang="es" page="agmSeparatorUpsApplication" />
    </>
  );
}

