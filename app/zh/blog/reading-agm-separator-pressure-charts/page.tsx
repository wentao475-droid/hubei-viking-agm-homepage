import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  AgmSeparatorPressureChartsStructuredData,
  buildAgmSeparatorPressureChartsMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorPressureChartsMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmSeparatorPressureChartsStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="agmSeparatorPressureCharts" />
    </>
  );
}
