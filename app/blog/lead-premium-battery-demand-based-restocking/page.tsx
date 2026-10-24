import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  LeadPremiumDemandRestockingStructuredData,
  buildLeadPremiumDemandRestockingMetadata
} from "../../seo";

export const metadata: Metadata = buildLeadPremiumDemandRestockingMetadata("en");

export default function Page() {
  return (
    <>
      <LeadPremiumDemandRestockingStructuredData lang="en" />
      <BlogArticlePage lang="en" page="leadPremiumDemandRestocking" />
    </>
  );
}
