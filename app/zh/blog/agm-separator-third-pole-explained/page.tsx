import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  AgmSeparatorThirdPoleStructuredData,
  buildAgmSeparatorThirdPoleMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorThirdPoleMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmSeparatorThirdPoleStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="agmSeparatorThirdPole" />
    </>
  );
}
