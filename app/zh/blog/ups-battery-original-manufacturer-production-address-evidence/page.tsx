import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  UpsOriginalManufacturerEvidenceStructuredData,
  buildUpsOriginalManufacturerEvidenceMetadata
} from "../../../seo";

export const metadata: Metadata = buildUpsOriginalManufacturerEvidenceMetadata("zh");

export default function Page() {
  return (
    <>
      <UpsOriginalManufacturerEvidenceStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="upsOriginalManufacturerEvidence" />
    </>
  );
}
