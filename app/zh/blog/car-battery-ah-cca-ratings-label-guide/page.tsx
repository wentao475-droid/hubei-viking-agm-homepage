import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  AutomotiveBatteryAhCcaStructuredData,
  buildAutomotiveBatteryAhCcaMetadata
} from "../../../seo";

export const metadata: Metadata = buildAutomotiveBatteryAhCcaMetadata("zh");

export default function Page() {
  return (
    <>
      <AutomotiveBatteryAhCcaStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="automotiveBatteryAhCca" />
    </>
  );
}
