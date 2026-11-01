import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  BatteryStorageSelfDischargeStructuredData,
  buildBatteryStorageSelfDischargeMetadata
} from "../../seo";

export const metadata: Metadata = buildBatteryStorageSelfDischargeMetadata("en");

export default function Page() {
  return (
    <>
      <BatteryStorageSelfDischargeStructuredData lang="en" />
      <BlogArticlePage lang="en" page="batteryStorageSelfDischarge" />
    </>
  );
}
