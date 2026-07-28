import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorStructuredData,
  buildAgmSeparatorMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorMetadata("vi");

export default function Page() {
  return (
    <>
      <AgmSeparatorStructuredData lang="vi" />
      <ProductPage lang="vi" />
    </>
  );
}
