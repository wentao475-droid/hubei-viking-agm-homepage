import type { Metadata } from "next";
import { ResourcesHubPage } from "../../ResourcesHubPage";
import {
  buildResourcesHubMetadata,
  ResourcesHubStructuredData
} from "../../seo";

export const metadata: Metadata = buildResourcesHubMetadata("zh");

export default function Page() {
  return (
    <>
      <ResourcesHubStructuredData lang="zh" />
      <ResourcesHubPage lang="zh" />
    </>
  );
}
