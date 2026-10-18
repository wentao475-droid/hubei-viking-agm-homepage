import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  UpsBatteryIndividualMonitoringStructuredData,
  buildUpsBatteryIndividualMonitoringMetadata
} from "../../seo";

export const metadata: Metadata = buildUpsBatteryIndividualMonitoringMetadata("en");

export default function Page() {
  return (
    <>
      <UpsBatteryIndividualMonitoringStructuredData lang="en" />
      <BlogArticlePage lang="en" page="upsBatteryIndividualMonitoring" />
    </>
  );
}
