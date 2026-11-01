import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  VrlaAgmGelStructuresStructuredData,
  buildVrlaAgmGelStructuresMetadata
} from "../../seo";

export const metadata: Metadata = buildVrlaAgmGelStructuresMetadata("en");

export default function Page() {
  return (
    <>
      <VrlaAgmGelStructuresStructuredData lang="en" />
      <BlogArticlePage lang="en" page="vrlaAgmGelStructures" />
    </>
  );
}
