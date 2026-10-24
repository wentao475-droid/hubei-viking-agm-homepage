import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  TelecomLeadAcidProcurementStructuredData,
  buildTelecomLeadAcidProcurementMetadata
} from "../../../seo";

export const metadata: Metadata = buildTelecomLeadAcidProcurementMetadata("zh");

export default function Page() {
  return (
    <>
      <TelecomLeadAcidProcurementStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="telecomLeadAcidProcurement" />
    </>
  );
}
