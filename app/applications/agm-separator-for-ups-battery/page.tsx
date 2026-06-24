import type { Metadata } from "next";
import { ProductPage } from "../../ProductPage";
import {
  AgmSeparatorUpsApplicationStructuredData,
  buildAgmSeparatorUpsApplicationMetadata
} from "../../seo";

export const metadata: Metadata =
  buildAgmSeparatorUpsApplicationMetadata("en");

export default function Page() {
  return (
    <>
      <AgmSeparatorUpsApplicationStructuredData lang="en" />
      <ProductPage lang="en" page="agmSeparatorUpsApplication" />
    </>
  );
}
