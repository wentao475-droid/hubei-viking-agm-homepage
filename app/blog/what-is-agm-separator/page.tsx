import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  WhatIsAgmSeparatorStructuredData,
  buildWhatIsAgmSeparatorMetadata
} from "../../seo";

export const metadata: Metadata = buildWhatIsAgmSeparatorMetadata("en");

export default function Page() {
  return (
    <>
      <WhatIsAgmSeparatorStructuredData lang="en" />
      <BlogArticlePage lang="en" />
    </>
  );
}
