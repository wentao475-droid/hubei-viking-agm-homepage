import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  BatteryCapacityHourRatesStructuredData,
  buildBatteryCapacityHourRatesMetadata
} from "../../seo";

export const metadata: Metadata = buildBatteryCapacityHourRatesMetadata("en");

export default function Page() {
  return (
    <>
      <BatteryCapacityHourRatesStructuredData lang="en" />
      <BlogArticlePage lang="en" page="batteryCapacityHourRates" />
    </>
  );
}
