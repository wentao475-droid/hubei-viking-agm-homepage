import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  BatteryTechnologyProjectComparisonStructuredData,
  buildBatteryTechnologyProjectComparisonMetadata
} from "../../../seo";

export const metadata: Metadata = buildBatteryTechnologyProjectComparisonMetadata("zh");

export default function Page() {
  return (
    <>
      <BatteryTechnologyProjectComparisonStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="batteryTechnologyProjectComparison" />
    </>
  );
}
