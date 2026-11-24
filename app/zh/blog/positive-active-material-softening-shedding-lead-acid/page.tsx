import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  PositiveActiveMaterialSofteningStructuredData,
  buildPositiveActiveMaterialSofteningMetadata
} from "../../../seo";

export const metadata: Metadata = buildPositiveActiveMaterialSofteningMetadata("zh");

export default function Page() {
  return (
    <>
      <PositiveActiveMaterialSofteningStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="positiveActiveMaterialSoftening" />
    </>
  );
}
