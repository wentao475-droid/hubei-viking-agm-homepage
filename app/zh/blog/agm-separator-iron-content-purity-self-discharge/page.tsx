import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  AgmSeparatorIronPurityStructuredData,
  buildAgmSeparatorIronPurityMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorIronPurityMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmSeparatorIronPurityStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="agmSeparatorIronPurity" />
    </>
  );
}
