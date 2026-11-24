import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  AutomotiveBatteryAhCcaStructuredData,
  buildAutomotiveBatteryAhCcaMetadata
} from "../../seo";

export const metadata: Metadata = buildAutomotiveBatteryAhCcaMetadata("en");

export default function Page() {
  return (
    <>
      <AutomotiveBatteryAhCcaStructuredData lang="en" />
      <BlogArticlePage lang="en" page="automotiveBatteryAhCca" />
    </>
  );
}
