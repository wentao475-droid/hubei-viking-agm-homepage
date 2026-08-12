import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  AgmSeparatorPressureRetentionStructuredData,
  buildAgmSeparatorPressureRetentionMetadata
} from "../../seo";

export const metadata: Metadata =
  buildAgmSeparatorPressureRetentionMetadata("en");

export default function Page() {
  return (
    <>
      <AgmSeparatorPressureRetentionStructuredData lang="en" />
      <BlogArticlePage lang="en" page="agmSeparatorPressureRetention" />
    </>
  );
}
