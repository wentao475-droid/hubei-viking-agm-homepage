import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  AgmVsGemGlassFiberStructuredData,
  buildAgmVsGemGlassFiberMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmVsGemGlassFiberMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmVsGemGlassFiberStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="agmVsGemGlassFiber" />
    </>
  );
}
