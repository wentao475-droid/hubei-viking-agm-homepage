import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  SodiumIonColdStartAgmComparisonStructuredData,
  buildSodiumIonColdStartAgmComparisonMetadata
} from "../../../seo";

export const metadata: Metadata = buildSodiumIonColdStartAgmComparisonMetadata("zh");

export default function Page() {
  return (
    <>
      <SodiumIonColdStartAgmComparisonStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="sodiumIonColdStartAgmComparison" />
    </>
  );
}
