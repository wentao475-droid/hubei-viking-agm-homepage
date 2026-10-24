import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  AgmVsGemGlassFiberStructuredData,
  buildAgmVsGemGlassFiberMetadata
} from "../../seo";

export const metadata: Metadata = buildAgmVsGemGlassFiberMetadata("en");

export default function Page() {
  return (
    <>
      <AgmVsGemGlassFiberStructuredData lang="en" />
      <BlogArticlePage lang="en" page="agmVsGemGlassFiber" />
    </>
  );
}
