import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  AgmAcidVolumeWetOutStructuredData,
  buildAgmAcidVolumeWetOutMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmAcidVolumeWetOutMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmAcidVolumeWetOutStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="agmAcidVolumeWetOut" />
    </>
  );
}
