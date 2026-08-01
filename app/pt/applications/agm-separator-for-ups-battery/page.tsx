import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorUpsApplicationStructuredData,
  buildAgmSeparatorUpsApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorUpsApplicationMetadata("pt");

export default function Page() {
  return (
    <>
      <AgmSeparatorUpsApplicationStructuredData lang="pt" />
      <ProductPage lang="pt" page="agmSeparatorUpsApplication" />
    </>
  );
}

