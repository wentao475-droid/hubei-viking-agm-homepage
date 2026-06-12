import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  HowToChooseAgmSeparatorStructuredData,
  buildHowToChooseAgmSeparatorMetadata
} from "../../seo";

export const metadata: Metadata = buildHowToChooseAgmSeparatorMetadata("en");

export default function Page() {
  return (
    <>
      <HowToChooseAgmSeparatorStructuredData lang="en" />
      <BlogArticlePage lang="en" page="howToChooseAgmSeparator" />
    </>
  );
}
