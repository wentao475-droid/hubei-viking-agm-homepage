import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  BatteryCapacityHourRatesStructuredData,
  buildBatteryCapacityHourRatesMetadata
} from "../../../seo";

export const metadata: Metadata = buildBatteryCapacityHourRatesMetadata("zh");

export default function Page() {
  return (
    <>
      <BatteryCapacityHourRatesStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="batteryCapacityHourRates" />
    </>
  );
}
