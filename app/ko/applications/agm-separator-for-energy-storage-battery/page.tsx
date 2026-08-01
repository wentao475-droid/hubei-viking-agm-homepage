import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorEnergyStorageApplicationStructuredData,
  buildAgmSeparatorEnergyStorageApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorEnergyStorageApplicationMetadata("ko");

export default function Page() {
  return (
    <>
      <AgmSeparatorEnergyStorageApplicationStructuredData lang="ko" />
      <ProductPage lang="ko" page="agmSeparatorEnergyStorageApplication" />
    </>
  );
}

