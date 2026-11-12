import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  ParallelBatteryCurrentSharingStructuredData,
  buildParallelBatteryCurrentSharingMetadata
} from "../../../seo";

export const metadata: Metadata = buildParallelBatteryCurrentSharingMetadata("zh");

export default function Page() {
  return (
    <>
      <ParallelBatteryCurrentSharingStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="parallelBatteryCurrentSharing" />
    </>
  );
}
