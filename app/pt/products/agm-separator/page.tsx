import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorStructuredData,
  buildAgmSeparatorMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorMetadata("pt");

export default function Page() {
  return (
    <>
      <AgmSeparatorStructuredData lang="pt" />
      <ProductPage lang="pt" />
    </>
  );
}
