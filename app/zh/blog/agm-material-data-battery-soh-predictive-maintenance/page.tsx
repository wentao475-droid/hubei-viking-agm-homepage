import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  AgmMaterialDataPredictiveMaintenanceStructuredData,
  buildAgmMaterialDataPredictiveMaintenanceMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmMaterialDataPredictiveMaintenanceMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmMaterialDataPredictiveMaintenanceStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="agmMaterialDataPredictiveMaintenance" />
    </>
  );
}
