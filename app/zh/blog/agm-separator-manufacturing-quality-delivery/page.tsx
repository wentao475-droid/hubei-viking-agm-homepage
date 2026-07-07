import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  AgmSeparatorManufacturingQualityDeliveryStructuredData,
  buildAgmSeparatorManufacturingQualityDeliveryMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorManufacturingQualityDeliveryMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmSeparatorManufacturingQualityDeliveryStructuredData lang="zh" />
      <BlogArticlePage
        lang="zh"
        page="agmSeparatorManufacturingQualityDelivery"
      />
    </>
  );
}
