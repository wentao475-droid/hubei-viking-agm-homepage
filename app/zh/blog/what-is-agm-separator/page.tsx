import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  WhatIsAgmSeparatorStructuredData,
  buildWhatIsAgmSeparatorMetadata
} from "../../../seo";

export const metadata: Metadata = buildWhatIsAgmSeparatorMetadata("zh");

export default function Page() {
  return (
    <>
      <WhatIsAgmSeparatorStructuredData lang="zh" />
      <BlogArticlePage lang="zh" />
    </>
  );
}
