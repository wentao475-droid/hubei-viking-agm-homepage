import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  RvAgmStartingHouseDutyStructuredData,
  buildRvAgmStartingHouseDutyMetadata
} from "../../../seo";

export const metadata: Metadata = buildRvAgmStartingHouseDutyMetadata("zh");

export default function Page() {
  return (
    <>
      <RvAgmStartingHouseDutyStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="rvAgmStartingHouseDuty" />
    </>
  );
}
