import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  TelecomLeadAcidProcurementStructuredData,
  buildTelecomLeadAcidProcurementMetadata
} from "../../seo";

export const metadata: Metadata = buildTelecomLeadAcidProcurementMetadata("en");

export default function Page() {
  return (
    <>
      <TelecomLeadAcidProcurementStructuredData lang="en" />
      <BlogArticlePage lang="en" page="telecomLeadAcidProcurement" />
    </>
  );
}
