import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  AgmStartStopBatteryProcurementStructuredData,
  buildAgmStartStopBatteryProcurementMetadata
} from "../../seo";

export const metadata: Metadata =
  buildAgmStartStopBatteryProcurementMetadata("en");

export default function Page() {
  return (
    <>
      <AgmStartStopBatteryProcurementStructuredData lang="en" />
      <BlogArticlePage lang="en" page="agmStartStopBatteryProcurement" />
    </>
  );
}
