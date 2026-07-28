import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorMotorcycleApplicationStructuredData,
  buildAgmSeparatorMotorcycleApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorMotorcycleApplicationMetadata("vi");

export default function Page() {
  return (
    <>
      <AgmSeparatorMotorcycleApplicationStructuredData lang="vi" />
      <ProductPage lang="vi" page="agmSeparatorMotorcycleApplication" />
    </>
  );
}
