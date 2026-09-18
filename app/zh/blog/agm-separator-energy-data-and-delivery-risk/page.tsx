import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  AgmSeparatorEnergyDataDeliveryStructuredData,
  buildAgmSeparatorEnergyDataDeliveryMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorEnergyDataDeliveryMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmSeparatorEnergyDataDeliveryStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="agmSeparatorEnergyDataDelivery" />
    </>
  );
}
