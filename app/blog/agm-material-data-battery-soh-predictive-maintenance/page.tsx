import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  AgmMaterialDataPredictiveMaintenanceStructuredData,
  buildAgmMaterialDataPredictiveMaintenanceMetadata
} from "../../seo";

export const metadata: Metadata = buildAgmMaterialDataPredictiveMaintenanceMetadata("en");

export default function Page() {
  return (
    <>
      <AgmMaterialDataPredictiveMaintenanceStructuredData lang="en" />
      <BlogArticlePage lang="en" page="agmMaterialDataPredictiveMaintenance" />
    </>
  );
}
