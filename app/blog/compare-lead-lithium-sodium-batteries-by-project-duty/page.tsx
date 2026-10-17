import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  BatteryTechnologyProjectComparisonStructuredData,
  buildBatteryTechnologyProjectComparisonMetadata
} from "../../seo";

export const metadata: Metadata = buildBatteryTechnologyProjectComparisonMetadata("en");

export default function Page() {
  return (
    <>
      <BatteryTechnologyProjectComparisonStructuredData lang="en" />
      <BlogArticlePage lang="en" page="batteryTechnologyProjectComparison" />
    </>
  );
}
