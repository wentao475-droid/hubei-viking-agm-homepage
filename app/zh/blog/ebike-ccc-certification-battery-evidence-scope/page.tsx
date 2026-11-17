import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  EbikeCccEvidenceScopeStructuredData,
  buildEbikeCccEvidenceScopeMetadata
} from "../../../seo";

export const metadata: Metadata = buildEbikeCccEvidenceScopeMetadata("zh");

export default function Page() {
  return (
    <>
      <EbikeCccEvidenceScopeStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="ebikeCccEvidenceScope" />
    </>
  );
}
