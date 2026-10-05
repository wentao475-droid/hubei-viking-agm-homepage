import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  buildEn18060BatteryStandardMetadata,
  En18060BatteryStandardStructuredData
} from "../../seo";

export const metadata: Metadata = buildEn18060BatteryStandardMetadata("en");

export default function Page() {
  return (
    <>
      <En18060BatteryStandardStructuredData lang="en" />
      <BlogArticlePage lang="en" page="en18060BatteryStandard" />
    </>
  );
}
