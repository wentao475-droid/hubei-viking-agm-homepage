import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  VrlaAgmGelStructuresStructuredData,
  buildVrlaAgmGelStructuresMetadata
} from "../../../seo";

export const metadata: Metadata = buildVrlaAgmGelStructuresMetadata("zh");

export default function Page() {
  return (
    <>
      <VrlaAgmGelStructuresStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="vrlaAgmGelStructures" />
    </>
  );
}
