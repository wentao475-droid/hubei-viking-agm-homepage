import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  PositiveActiveMaterialSofteningStructuredData,
  buildPositiveActiveMaterialSofteningMetadata
} from "../../seo";

export const metadata: Metadata = buildPositiveActiveMaterialSofteningMetadata("en");

export default function Page() {
  return (
    <>
      <PositiveActiveMaterialSofteningStructuredData lang="en" />
      <BlogArticlePage lang="en" page="positiveActiveMaterialSoftening" />
    </>
  );
}
