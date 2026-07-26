import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  AgmGlassFiberVsPvcSeparatorStructuredData,
  buildAgmGlassFiberVsPvcSeparatorMetadata
} from "../../../seo";

export const metadata = buildAgmGlassFiberVsPvcSeparatorMetadata("zh");

export default function AgmGlassFiberVsPvcBatterySeparatorZhPage() {
  return (
    <>
      <AgmGlassFiberVsPvcSeparatorStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="agmGlassFiberVsPvcSeparator" />
    </>
  );
}
