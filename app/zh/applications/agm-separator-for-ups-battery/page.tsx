import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorUpsApplicationStructuredData,
  buildAgmSeparatorUpsApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorUpsApplicationMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmSeparatorUpsApplicationStructuredData lang="zh" />
      <ProductPage lang="zh" page="agmSeparatorUpsApplication" />
    </>
  );
}
