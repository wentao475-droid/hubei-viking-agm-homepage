import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorVrlaApplicationStructuredData,
  buildAgmSeparatorVrlaApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorVrlaApplicationMetadata("ja");

export default function Page() {
  return (
    <>
      <AgmSeparatorVrlaApplicationStructuredData lang="ja" />
      <ProductPage lang="ja" page="agmSeparatorVrlaApplication" />
    </>
  );
}

