import type { Metadata } from "next";
import { VikingHome } from "../VikingHome";
import { buildHomeMetadata, StructuredData } from "../seo";

export const metadata: Metadata = buildHomeMetadata("ja");

export default function Page() {
  return (
    <>
      <StructuredData lang="ja" />
      <VikingHome initialLang="ja" />
    </>
  );
}
