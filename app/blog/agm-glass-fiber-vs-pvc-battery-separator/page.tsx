import { BlogArticlePage } from "../../BlogArticlePage";
import {
  AgmGlassFiberVsPvcSeparatorStructuredData,
  buildAgmGlassFiberVsPvcSeparatorMetadata
} from "../../seo";

export const metadata = buildAgmGlassFiberVsPvcSeparatorMetadata("en");

export default function AgmGlassFiberVsPvcBatterySeparatorPage() {
  return (
    <>
      <AgmGlassFiberVsPvcSeparatorStructuredData lang="en" />
      <BlogArticlePage lang="en" page="agmGlassFiberVsPvcSeparator" />
    </>
  );
}
