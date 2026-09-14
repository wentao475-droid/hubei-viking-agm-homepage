import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  AgmSeparatorThirdPoleStructuredData,
  buildAgmSeparatorThirdPoleMetadata
} from "../../seo";

export const metadata: Metadata = buildAgmSeparatorThirdPoleMetadata("en");

export default function Page() {
  return (
    <>
      <AgmSeparatorThirdPoleStructuredData lang="en" />
      <BlogArticlePage lang="en" page="agmSeparatorThirdPole" />
    </>
  );
}
