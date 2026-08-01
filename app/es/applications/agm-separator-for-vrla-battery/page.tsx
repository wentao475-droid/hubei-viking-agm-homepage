import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorVrlaApplicationStructuredData,
  buildAgmSeparatorVrlaApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorVrlaApplicationMetadata("es");

export default function Page() {
  return (
    <>
      <AgmSeparatorVrlaApplicationStructuredData lang="es" />
      <ProductPage lang="es" page="agmSeparatorVrlaApplication" />
    </>
  );
}

