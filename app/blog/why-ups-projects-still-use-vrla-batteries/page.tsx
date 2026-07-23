import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  UpsVrlaTechnologySelectionStructuredData,
  buildUpsVrlaTechnologySelectionMetadata
} from "../../seo";

export const metadata: Metadata =
  buildUpsVrlaTechnologySelectionMetadata("en");

export default function Page() {
  return (
    <>
      <UpsVrlaTechnologySelectionStructuredData lang="en" />
      <BlogArticlePage lang="en" page="upsVrlaTechnologySelection" />
    </>
  );
}
