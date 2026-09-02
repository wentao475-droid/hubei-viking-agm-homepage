import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  AgmSeparatorSupplyChainStructuredData,
  buildAgmSeparatorSupplyChainMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorSupplyChainMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmSeparatorSupplyChainStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="agmSeparatorSupplyChain" />
    </>
  );
}
