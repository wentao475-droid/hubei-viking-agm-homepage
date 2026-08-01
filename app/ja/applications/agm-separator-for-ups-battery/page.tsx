import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorUpsApplicationStructuredData,
  buildAgmSeparatorUpsApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorUpsApplicationMetadata("ja");

export default function Page() {
  return (
    <>
      <AgmSeparatorUpsApplicationStructuredData lang="ja" />
      <ProductPage lang="ja" page="agmSeparatorUpsApplication" />
    </>
  );
}

