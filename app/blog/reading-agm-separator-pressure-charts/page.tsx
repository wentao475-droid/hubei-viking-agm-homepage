import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  AgmSeparatorPressureChartsStructuredData,
  buildAgmSeparatorPressureChartsMetadata
} from "../../seo";

export const metadata: Metadata = buildAgmSeparatorPressureChartsMetadata("en");

export default function Page() {
  return (
    <>
      <AgmSeparatorPressureChartsStructuredData lang="en" />
      <BlogArticlePage lang="en" page="agmSeparatorPressureCharts" />
    </>
  );
}
