import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  AgmStartStopBatteryProcurementStructuredData,
  buildAgmStartStopBatteryProcurementMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmStartStopBatteryProcurementMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmStartStopBatteryProcurementStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="agmStartStopBatteryProcurement" />
    </>
  );
}
