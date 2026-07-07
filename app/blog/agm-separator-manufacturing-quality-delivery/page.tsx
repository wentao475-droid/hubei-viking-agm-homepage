import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  AgmSeparatorManufacturingQualityDeliveryStructuredData,
  buildAgmSeparatorManufacturingQualityDeliveryMetadata
} from "../../seo";

export const metadata: Metadata =
  buildAgmSeparatorManufacturingQualityDeliveryMetadata("en");

export default function Page() {
  return (
    <>
      <AgmSeparatorManufacturingQualityDeliveryStructuredData lang="en" />
      <BlogArticlePage
        lang="en"
        page="agmSeparatorManufacturingQualityDelivery"
      />
    </>
  );
}
