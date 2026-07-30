import type { Metadata } from "next";
import { VikingHome } from "../VikingHome";
import { buildHomeMetadata, StructuredData } from "../seo";

export const metadata: Metadata = buildHomeMetadata("ko");

export default function Page() {
  return (
    <>
      <StructuredData lang="ko" />
      <VikingHome initialLang="ko" />
    </>
  );
}
