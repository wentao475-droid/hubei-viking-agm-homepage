import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  AgmSeparatorSupplyChainStructuredData,
  buildAgmSeparatorSupplyChainMetadata
} from "../../seo";

export const metadata: Metadata = buildAgmSeparatorSupplyChainMetadata("en");

export default function Page() {
  return (
    <>
      <AgmSeparatorSupplyChainStructuredData lang="en" />
      <BlogArticlePage lang="en" page="agmSeparatorSupplyChain" />
    </>
  );
}
