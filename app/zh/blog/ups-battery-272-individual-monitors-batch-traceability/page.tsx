import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  UpsBatteryIndividualMonitoringStructuredData,
  buildUpsBatteryIndividualMonitoringMetadata
} from "../../../seo";

export const metadata: Metadata = buildUpsBatteryIndividualMonitoringMetadata("zh");

export default function Page() {
  return (
    <>
      <UpsBatteryIndividualMonitoringStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="upsBatteryIndividualMonitoring" />
    </>
  );
}
