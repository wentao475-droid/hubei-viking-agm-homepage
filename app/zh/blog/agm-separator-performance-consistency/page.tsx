import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  AgmSeparatorPerformanceConsistencyStructuredData,
  buildAgmSeparatorPerformanceConsistencyMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorPerformanceConsistencyMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmSeparatorPerformanceConsistencyStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="agmSeparatorPerformanceConsistency" />
    </>
  );
}
