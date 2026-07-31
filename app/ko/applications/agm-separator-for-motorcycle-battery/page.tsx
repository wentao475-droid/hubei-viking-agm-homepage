import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorMotorcycleApplicationStructuredData,
  buildAgmSeparatorMotorcycleApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorMotorcycleApplicationMetadata("ko");

export default function Page() {
  return (
    <>
      <AgmSeparatorMotorcycleApplicationStructuredData lang="ko" />
      <ProductPage lang="ko" page="agmSeparatorMotorcycleApplication" />
    </>
  );
}
