import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorUpsApplicationStructuredData,
  buildAgmSeparatorUpsApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorUpsApplicationMetadata("ru");

export default function Page() {
  return (
    <>
      <AgmSeparatorUpsApplicationStructuredData lang="ru" />
      <ProductPage lang="ru" page="agmSeparatorUpsApplication" />
    </>
  );
}

