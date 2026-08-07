import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  DataCenterBackupPowerAgmSeparatorStructuredData,
  buildDataCenterBackupPowerAgmSeparatorMetadata
} from "../../seo";

export const metadata: Metadata =
  buildDataCenterBackupPowerAgmSeparatorMetadata("en");

export default function Page() {
  return (
    <>
      <DataCenterBackupPowerAgmSeparatorStructuredData lang="en" />
      <BlogArticlePage lang="en" page="dataCenterBackupPowerAgmSeparator" />
    </>
  );
}
