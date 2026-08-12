import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  EarlyChinaLeadAcidBatteryManufacturingStructuredData,
  buildEarlyChinaLeadAcidBatteryManufacturingMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildEarlyChinaLeadAcidBatteryManufacturingMetadata("zh");

export default function Page() {
  return (
    <>
      <EarlyChinaLeadAcidBatteryManufacturingStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="earlyChinaLeadAcidBatteryManufacturing" />
    </>
  );
}
