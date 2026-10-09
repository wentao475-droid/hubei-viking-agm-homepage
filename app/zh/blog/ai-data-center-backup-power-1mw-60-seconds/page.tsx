import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  AiDataCenterBackupPowerLayersStructuredData,
  buildAiDataCenterBackupPowerLayersMetadata
} from "../../../seo";

export const metadata: Metadata = buildAiDataCenterBackupPowerLayersMetadata("zh");

export default function Page() {
  return (
    <>
      <AiDataCenterBackupPowerLayersStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="aiDataCenterBackupPowerLayers" />
    </>
  );
}
