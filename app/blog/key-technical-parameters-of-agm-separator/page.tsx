import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  KeyTechnicalParametersStructuredData,
  buildKeyTechnicalParametersMetadata
} from "../../seo";

export const metadata: Metadata = buildKeyTechnicalParametersMetadata("en");

export default function Page() {
  return (
    <>
      <KeyTechnicalParametersStructuredData lang="en" />
      <BlogArticlePage lang="en" page="keyTechnicalParameters" />
    </>
  );
}
