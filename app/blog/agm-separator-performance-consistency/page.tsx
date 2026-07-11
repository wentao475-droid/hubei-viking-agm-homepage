import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  AgmSeparatorPerformanceConsistencyStructuredData,
  buildAgmSeparatorPerformanceConsistencyMetadata
} from "../../seo";

export const metadata: Metadata =
  buildAgmSeparatorPerformanceConsistencyMetadata("en");

export default function Page() {
  return (
    <>
      <AgmSeparatorPerformanceConsistencyStructuredData lang="en" />
      <BlogArticlePage lang="en" page="agmSeparatorPerformanceConsistency" />
    </>
  );
}
