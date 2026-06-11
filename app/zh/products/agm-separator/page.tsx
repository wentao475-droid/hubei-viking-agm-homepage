import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorStructuredData,
  buildAgmSeparatorMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmSeparatorStructuredData lang="zh" />
      <ProductPage lang="zh" />
    </>
  );
}
