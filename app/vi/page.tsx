import type { Metadata } from "next";
import { VikingHome } from "../VikingHome";
import { buildHomeMetadata, StructuredData } from "../seo";

export const metadata: Metadata = buildHomeMetadata("vi");

export default function Page() {
  return (
    <>
      <StructuredData lang="vi" />
      <VikingHome initialLang="vi" />
    </>
  );
}
