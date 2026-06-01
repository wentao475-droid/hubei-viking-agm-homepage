import type { Metadata } from "next";
import { VikingHome } from "./VikingHome";
import { buildHomeMetadata, StructuredData } from "./seo";

export const metadata: Metadata = buildHomeMetadata("en");

export default function Page() {
  return (
    <>
      <StructuredData lang="en" />
      <VikingHome initialLang="en" />
    </>
  );
}
