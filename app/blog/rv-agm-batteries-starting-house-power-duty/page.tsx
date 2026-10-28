import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  RvAgmStartingHouseDutyStructuredData,
  buildRvAgmStartingHouseDutyMetadata
} from "../../seo";

export const metadata: Metadata = buildRvAgmStartingHouseDutyMetadata("en");

export default function Page() {
  return (
    <>
      <RvAgmStartingHouseDutyStructuredData lang="en" />
      <BlogArticlePage lang="en" page="rvAgmStartingHouseDuty" />
    </>
  );
}
