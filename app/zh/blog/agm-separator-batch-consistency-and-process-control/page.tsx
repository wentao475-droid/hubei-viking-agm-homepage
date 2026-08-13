import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  AgmSeparatorBatchProcessControlStructuredData,
  buildAgmSeparatorBatchProcessControlMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorBatchProcessControlMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmSeparatorBatchProcessControlStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="agmSeparatorBatchProcessControl" />
    </>
  );
}
