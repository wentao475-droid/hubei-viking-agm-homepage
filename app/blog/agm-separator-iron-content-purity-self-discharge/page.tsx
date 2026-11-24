import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  AgmSeparatorIronPurityStructuredData,
  buildAgmSeparatorIronPurityMetadata
} from "../../seo";

export const metadata: Metadata = buildAgmSeparatorIronPurityMetadata("en");

export default function Page() {
  return (
    <>
      <AgmSeparatorIronPurityStructuredData lang="en" />
      <BlogArticlePage lang="en" page="agmSeparatorIronPurity" />
    </>
  );
}
