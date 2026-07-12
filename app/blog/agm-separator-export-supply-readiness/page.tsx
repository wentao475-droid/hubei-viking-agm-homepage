import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  AgmSeparatorExportSupplyReadinessStructuredData,
  buildAgmSeparatorExportSupplyReadinessMetadata
} from "../../seo";

export const metadata: Metadata =
  buildAgmSeparatorExportSupplyReadinessMetadata("en");

export default function Page() {
  return (
    <>
      <AgmSeparatorExportSupplyReadinessStructuredData lang="en" />
      <BlogArticlePage lang="en" page="agmSeparatorExportSupplyReadiness" />
    </>
  );
}
