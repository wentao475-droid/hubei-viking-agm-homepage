import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  BatteryStorageSelfDischargeStructuredData,
  buildBatteryStorageSelfDischargeMetadata
} from "../../../seo";

export const metadata: Metadata = buildBatteryStorageSelfDischargeMetadata("zh");

export default function Page() {
  return (
    <>
      <BatteryStorageSelfDischargeStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="batteryStorageSelfDischarge" />
    </>
  );
}
