import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  EarlyLeadAcidElectrodeFormationStructuredData,
  buildEarlyLeadAcidElectrodeFormationMetadata
} from "../../seo";

export const metadata: Metadata = buildEarlyLeadAcidElectrodeFormationMetadata("en");

export default function Page() {
  return (
    <>
      <EarlyLeadAcidElectrodeFormationStructuredData lang="en" />
      <BlogArticlePage lang="en" page="earlyLeadAcidElectrodeFormation" />
    </>
  );
}
