import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  LeadAcidChargingDischargeStructuredData,
  buildLeadAcidChargingDischargeMetadata
} from "../../seo";

export const metadata: Metadata = buildLeadAcidChargingDischargeMetadata("en");

export default function Page() {
  return (
    <>
      <LeadAcidChargingDischargeStructuredData lang="en" />
      <BlogArticlePage lang="en" page="leadAcidChargingDischarge" />
    </>
  );
}
