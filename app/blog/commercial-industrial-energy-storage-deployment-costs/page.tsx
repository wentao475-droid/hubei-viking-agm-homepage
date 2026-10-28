import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  CiStorageDeploymentCostsStructuredData,
  buildCiStorageDeploymentCostsMetadata
} from "../../seo";

export const metadata: Metadata = buildCiStorageDeploymentCostsMetadata("en");

export default function Page() {
  return (
    <>
      <CiStorageDeploymentCostsStructuredData lang="en" />
      <BlogArticlePage lang="en" page="ciStorageDeploymentCosts" />
    </>
  );
}
