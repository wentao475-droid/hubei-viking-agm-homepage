import type { Metadata } from "next";
import { ProductPage } from "../../ProductPage";
import {
  AgmSeparatorEnergyStorageApplicationStructuredData,
  buildAgmSeparatorEnergyStorageApplicationMetadata
} from "../../seo";

export const metadata: Metadata =
  buildAgmSeparatorEnergyStorageApplicationMetadata("en");

export default function Page() {
  return (
    <>
      <AgmSeparatorEnergyStorageApplicationStructuredData lang="en" />
      <ProductPage lang="en" page="agmSeparatorEnergyStorageApplication" />
    </>
  );
}
