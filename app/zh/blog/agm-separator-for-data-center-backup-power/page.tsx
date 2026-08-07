import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  DataCenterBackupPowerAgmSeparatorStructuredData,
  buildDataCenterBackupPowerAgmSeparatorMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildDataCenterBackupPowerAgmSeparatorMetadata("zh");

export default function Page() {
  return (
    <>
      <DataCenterBackupPowerAgmSeparatorStructuredData lang="zh" />
      <BlogArticlePage lang="zh" page="dataCenterBackupPowerAgmSeparator" />
    </>
  );
}
