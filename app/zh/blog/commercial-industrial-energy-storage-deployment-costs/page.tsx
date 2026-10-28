import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  CiStorageDeploymentCostsStructuredData,
  buildCiStorageDeploymentCostsMetadata
} from "../../../seo";

export const metadata: Metadata = buildCiStorageDeploymentCostsMetadata("zh");

export default function Page() {
  return (
    <>
      <CiStorageDeploymentCostsStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="ciStorageDeploymentCosts" />
    </>
  );
}
