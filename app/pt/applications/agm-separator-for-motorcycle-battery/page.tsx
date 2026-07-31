import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorMotorcycleApplicationStructuredData,
  buildAgmSeparatorMotorcycleApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorMotorcycleApplicationMetadata("pt");

export default function Page() {
  return (
    <>
      <AgmSeparatorMotorcycleApplicationStructuredData lang="pt" />
      <ProductPage lang="pt" page="agmSeparatorMotorcycleApplication" />
    </>
  );
}
