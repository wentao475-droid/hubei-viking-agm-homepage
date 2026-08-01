import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorEnergyStorageApplicationStructuredData,
  buildAgmSeparatorEnergyStorageApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorEnergyStorageApplicationMetadata("ru");

export default function Page() {
  return (
    <>
      <AgmSeparatorEnergyStorageApplicationStructuredData lang="ru" />
      <ProductPage lang="ru" page="agmSeparatorEnergyStorageApplication" />
    </>
  );
}

