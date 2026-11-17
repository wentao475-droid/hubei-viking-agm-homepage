import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  LeadAcidChargingDischargeStructuredData,
  buildLeadAcidChargingDischargeMetadata
} from "../../../seo";

export const metadata: Metadata = buildLeadAcidChargingDischargeMetadata("zh");

export default function Page() {
  return (
    <>
      <LeadAcidChargingDischargeStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="leadAcidChargingDischarge" />
    </>
  );
}
