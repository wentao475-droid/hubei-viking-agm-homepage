import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  AgmSeparatorExportSupplyReadinessStructuredData,
  buildAgmSeparatorExportSupplyReadinessMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorExportSupplyReadinessMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmSeparatorExportSupplyReadinessStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="agmSeparatorExportSupplyReadiness" />
    </>
  );
}
