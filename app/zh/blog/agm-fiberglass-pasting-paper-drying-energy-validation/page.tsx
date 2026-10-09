import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  AgmPastingPaperEnergyValidationStructuredData,
  buildAgmPastingPaperEnergyValidationMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmPastingPaperEnergyValidationMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmPastingPaperEnergyValidationStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="agmPastingPaperEnergyValidation" />
    </>
  );
}
