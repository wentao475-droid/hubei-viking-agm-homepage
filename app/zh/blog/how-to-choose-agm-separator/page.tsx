import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  HowToChooseAgmSeparatorStructuredData,
  buildHowToChooseAgmSeparatorMetadata
} from "../../../seo";

export const metadata: Metadata = buildHowToChooseAgmSeparatorMetadata("zh");

export default function Page() {
  return (
    <>
      <HowToChooseAgmSeparatorStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="howToChooseAgmSeparator" />
    </>
  );
}
