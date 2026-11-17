import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  EbikeCccEvidenceScopeStructuredData,
  buildEbikeCccEvidenceScopeMetadata
} from "../../seo";

export const metadata: Metadata = buildEbikeCccEvidenceScopeMetadata("en");

export default function Page() {
  return (
    <>
      <EbikeCccEvidenceScopeStructuredData lang="en" />
      <BlogArticlePage lang="en" page="ebikeCccEvidenceScope" />
    </>
  );
}
