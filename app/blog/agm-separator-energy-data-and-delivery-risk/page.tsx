import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  AgmSeparatorEnergyDataDeliveryStructuredData,
  buildAgmSeparatorEnergyDataDeliveryMetadata
} from "../../seo";

export const metadata: Metadata =
  buildAgmSeparatorEnergyDataDeliveryMetadata("en");

export default function Page() {
  return (
    <>
      <AgmSeparatorEnergyDataDeliveryStructuredData lang="en" />
      <BlogArticlePage lang="en" page="agmSeparatorEnergyDataDelivery" />
    </>
  );
}
