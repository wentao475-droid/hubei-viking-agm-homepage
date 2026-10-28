import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  LeadAcidFluidTopUpStructuredData,
  buildLeadAcidFluidTopUpMetadata
} from "../../../seo";

export const metadata: Metadata = buildLeadAcidFluidTopUpMetadata("zh");

export default function Page() {
  return (
    <>
      <LeadAcidFluidTopUpStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="leadAcidFluidTopUp" />
    </>
  );
}
