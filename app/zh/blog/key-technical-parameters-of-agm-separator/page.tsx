import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  KeyTechnicalParametersStructuredData,
  buildKeyTechnicalParametersMetadata
} from "../../../seo";

export const metadata: Metadata = buildKeyTechnicalParametersMetadata("zh");

export default function Page() {
  return (
    <>
      <KeyTechnicalParametersStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="keyTechnicalParameters" />
    </>
  );
}
