import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  AgmBatteryDamageDemoSafetyTestStructuredData,
  buildAgmBatteryDamageDemoSafetyTestMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmBatteryDamageDemoSafetyTestMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmBatteryDamageDemoSafetyTestStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="agmBatteryDamageDemoSafetyTest" />
    </>
  );
}
