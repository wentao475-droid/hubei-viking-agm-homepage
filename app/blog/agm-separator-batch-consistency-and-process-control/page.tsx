import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  AgmSeparatorBatchProcessControlStructuredData,
  buildAgmSeparatorBatchProcessControlMetadata
} from "../../seo";

export const metadata: Metadata =
  buildAgmSeparatorBatchProcessControlMetadata("en");

export default function Page() {
  return (
    <>
      <AgmSeparatorBatchProcessControlStructuredData lang="en" />
      <BlogArticlePage lang="en" page="agmSeparatorBatchProcessControl" />
    </>
  );
}
