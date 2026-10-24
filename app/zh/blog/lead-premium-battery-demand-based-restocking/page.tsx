import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  LeadPremiumDemandRestockingStructuredData,
  buildLeadPremiumDemandRestockingMetadata
} from "../../../seo";

export const metadata: Metadata = buildLeadPremiumDemandRestockingMetadata("zh");

export default function Page() {
  return (
    <>
      <LeadPremiumDemandRestockingStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="leadPremiumDemandRestocking" />
    </>
  );
}
