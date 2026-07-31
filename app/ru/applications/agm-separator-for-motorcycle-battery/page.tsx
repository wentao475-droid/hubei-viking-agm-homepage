import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorMotorcycleApplicationStructuredData,
  buildAgmSeparatorMotorcycleApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorMotorcycleApplicationMetadata("ru");

export default function Page() {
  return (
    <>
      <AgmSeparatorMotorcycleApplicationStructuredData lang="ru" />
      <ProductPage lang="ru" page="agmSeparatorMotorcycleApplication" />
    </>
  );
}
