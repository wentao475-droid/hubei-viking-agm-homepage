import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  UpsOriginalManufacturerEvidenceStructuredData,
  buildUpsOriginalManufacturerEvidenceMetadata
} from "../../seo";

export const metadata: Metadata = buildUpsOriginalManufacturerEvidenceMetadata("en");

export default function Page() {
  return (
    <>
      <UpsOriginalManufacturerEvidenceStructuredData lang="en" />
      <BlogArticlePage lang="en" page="upsOriginalManufacturerEvidence" />
    </>
  );
}
