import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorEnergyStorageApplicationStructuredData,
  buildAgmSeparatorEnergyStorageApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorEnergyStorageApplicationMetadata("ja");

export default function Page() {
  return (
    <>
      <AgmSeparatorEnergyStorageApplicationStructuredData lang="ja" />
      <ProductPage lang="ja" page="agmSeparatorEnergyStorageApplication" />
    </>
  );
}

