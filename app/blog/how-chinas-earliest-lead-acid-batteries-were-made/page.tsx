import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  EarlyChinaLeadAcidBatteryManufacturingStructuredData,
  buildEarlyChinaLeadAcidBatteryManufacturingMetadata
} from "../../seo";

export const metadata: Metadata =
  buildEarlyChinaLeadAcidBatteryManufacturingMetadata("en");

export default function Page() {
  return (
    <>
      <EarlyChinaLeadAcidBatteryManufacturingStructuredData lang="en" />
      <BlogArticlePage lang="en" page="earlyChinaLeadAcidBatteryManufacturing" />
    </>
  );
}
