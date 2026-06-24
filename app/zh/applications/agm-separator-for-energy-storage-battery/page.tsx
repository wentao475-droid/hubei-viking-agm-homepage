import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorEnergyStorageApplicationStructuredData,
  buildAgmSeparatorEnergyStorageApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorEnergyStorageApplicationMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmSeparatorEnergyStorageApplicationStructuredData lang="zh" />
      <ProductPage lang="zh" page="agmSeparatorEnergyStorageApplication" />
    </>
  );
}
