import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  UpsVrlaTechnologySelectionStructuredData,
  buildUpsVrlaTechnologySelectionMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildUpsVrlaTechnologySelectionMetadata("zh");

export default function Page() {
  return (
    <>
      <UpsVrlaTechnologySelectionStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="upsVrlaTechnologySelection" />
    </>
  );
}
