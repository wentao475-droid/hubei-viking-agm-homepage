import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorMotorcycleApplicationStructuredData,
  buildAgmSeparatorMotorcycleApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorMotorcycleApplicationMetadata("ja");

export default function Page() {
  return (
    <>
      <AgmSeparatorMotorcycleApplicationStructuredData lang="ja" />
      <ProductPage lang="ja" page="agmSeparatorMotorcycleApplication" />
    </>
  );
}
