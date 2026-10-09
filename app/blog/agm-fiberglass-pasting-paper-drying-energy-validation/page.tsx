import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  AgmPastingPaperEnergyValidationStructuredData,
  buildAgmPastingPaperEnergyValidationMetadata
} from "../../seo";

export const metadata: Metadata = buildAgmPastingPaperEnergyValidationMetadata("en");

export default function Page() {
  return (
    <>
      <AgmPastingPaperEnergyValidationStructuredData lang="en" />
      <BlogArticlePage lang="en" page="agmPastingPaperEnergyValidation" />
    </>
  );
}
