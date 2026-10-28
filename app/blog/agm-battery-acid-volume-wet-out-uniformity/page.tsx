import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  AgmAcidVolumeWetOutStructuredData,
  buildAgmAcidVolumeWetOutMetadata
} from "../../seo";

export const metadata: Metadata = buildAgmAcidVolumeWetOutMetadata("en");

export default function Page() {
  return (
    <>
      <AgmAcidVolumeWetOutStructuredData lang="en" />
      <BlogArticlePage lang="en" page="agmAcidVolumeWetOut" />
    </>
  );
}
