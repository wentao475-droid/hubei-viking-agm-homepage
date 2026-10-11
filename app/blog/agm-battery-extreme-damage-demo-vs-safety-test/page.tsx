import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  AgmBatteryDamageDemoSafetyTestStructuredData,
  buildAgmBatteryDamageDemoSafetyTestMetadata
} from "../../seo";

export const metadata: Metadata = buildAgmBatteryDamageDemoSafetyTestMetadata("en");

export default function Page() {
  return (
    <>
      <AgmBatteryDamageDemoSafetyTestStructuredData lang="en" />
      <BlogArticlePage lang="en" page="agmBatteryDamageDemoSafetyTest" />
    </>
  );
}
