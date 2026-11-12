import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  ParallelBatteryCurrentSharingStructuredData,
  buildParallelBatteryCurrentSharingMetadata
} from "../../seo";

export const metadata: Metadata = buildParallelBatteryCurrentSharingMetadata("en");

export default function Page() {
  return (
    <>
      <ParallelBatteryCurrentSharingStructuredData lang="en" />
      <BlogArticlePage lang="en" page="parallelBatteryCurrentSharing" />
    </>
  );
}
