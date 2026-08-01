import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorUpsApplicationStructuredData,
  buildAgmSeparatorUpsApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorUpsApplicationMetadata("vi");

export default function Page() {
  return (
    <>
      <AgmSeparatorUpsApplicationStructuredData lang="vi" />
      <ProductPage lang="vi" page="agmSeparatorUpsApplication" />
    </>
  );
}

