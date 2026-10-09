import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  AiDataCenterBackupPowerLayersStructuredData,
  buildAiDataCenterBackupPowerLayersMetadata
} from "../../seo";

export const metadata: Metadata = buildAiDataCenterBackupPowerLayersMetadata("en");

export default function Page() {
  return (
    <>
      <AiDataCenterBackupPowerLayersStructuredData lang="en" />
      <BlogArticlePage lang="en" page="aiDataCenterBackupPowerLayers" />
    </>
  );
}
