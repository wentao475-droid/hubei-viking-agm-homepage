import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  LeadAcidFluidTopUpStructuredData,
  buildLeadAcidFluidTopUpMetadata
} from "../../seo";

export const metadata: Metadata = buildLeadAcidFluidTopUpMetadata("en");

export default function Page() {
  return (
    <>
      <LeadAcidFluidTopUpStructuredData lang="en" />
      <BlogArticlePage lang="en" page="leadAcidFluidTopUp" />
    </>
  );
}
