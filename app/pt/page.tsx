import type { Metadata } from "next";
import { VikingHome } from "../VikingHome";
import { buildHomeMetadata, StructuredData } from "../seo";

export const metadata: Metadata = buildHomeMetadata("pt");

export default function Page() {
  return (
    <>
      <StructuredData lang="pt" />
      <VikingHome initialLang="pt" />
    </>
  );
}
