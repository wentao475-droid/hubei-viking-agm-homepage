import type { Metadata } from "next";
import { ResourcesHubPage } from "../ResourcesHubPage";
import {
  buildResourcesHubMetadata,
  ResourcesHubStructuredData
} from "../seo";

export const metadata: Metadata = buildResourcesHubMetadata("en");

export default function Page() {
  return (
    <>
      <ResourcesHubStructuredData lang="en" />
      <ResourcesHubPage lang="en" />
    </>
  );
}
