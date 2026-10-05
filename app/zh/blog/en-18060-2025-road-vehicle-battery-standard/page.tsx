import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  buildEn18060BatteryStandardMetadata,
  En18060BatteryStandardStructuredData
} from "../../../seo";

export const metadata: Metadata = buildEn18060BatteryStandardMetadata("zh");

export default function Page() {
  return (
    <>
      <En18060BatteryStandardStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="en18060BatteryStandard" />
    </>
  );
}
