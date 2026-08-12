import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  AgmSeparatorPressureRetentionStructuredData,
  buildAgmSeparatorPressureRetentionMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorPressureRetentionMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmSeparatorPressureRetentionStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="agmSeparatorPressureRetention" />
    </>
  );
}
