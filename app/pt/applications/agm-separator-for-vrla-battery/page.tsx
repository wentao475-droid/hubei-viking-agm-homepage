import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorVrlaApplicationStructuredData,
  buildAgmSeparatorVrlaApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorVrlaApplicationMetadata("pt");

export default function Page() {
  return (
    <>
      <AgmSeparatorVrlaApplicationStructuredData lang="pt" />
      <ProductPage lang="pt" page="agmSeparatorVrlaApplication" />
    </>
  );
}

