import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  SodiumIonColdStartAgmComparisonStructuredData,
  buildSodiumIonColdStartAgmComparisonMetadata
} from "../../seo";

export const metadata: Metadata = buildSodiumIonColdStartAgmComparisonMetadata("en");

export default function Page() {
  return (
    <>
      <SodiumIonColdStartAgmComparisonStructuredData lang="en" />
      <BlogArticlePage lang="en" page="sodiumIonColdStartAgmComparison" />
    </>
  );
}
