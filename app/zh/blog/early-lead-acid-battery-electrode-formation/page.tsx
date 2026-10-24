import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  EarlyLeadAcidElectrodeFormationStructuredData,
  buildEarlyLeadAcidElectrodeFormationMetadata
} from "../../../seo";

export const metadata: Metadata = buildEarlyLeadAcidElectrodeFormationMetadata("zh");

export default function Page() {
  return (
    <>
      <EarlyLeadAcidElectrodeFormationStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="earlyLeadAcidElectrodeFormation" />
    </>
  );
}
