import type { Metadata } from "next";
import { ProductPage } from "../../ProductPage";
import {
  AgmSeparatorMotorcycleApplicationStructuredData,
  buildAgmSeparatorMotorcycleApplicationMetadata
} from "../../seo";

export const metadata: Metadata =
  buildAgmSeparatorMotorcycleApplicationMetadata("en");

export default function Page() {
  return (
    <>
      <AgmSeparatorMotorcycleApplicationStructuredData lang="en" />
      <ProductPage lang="en" page="agmSeparatorMotorcycleApplication" />
    </>
  );
}
