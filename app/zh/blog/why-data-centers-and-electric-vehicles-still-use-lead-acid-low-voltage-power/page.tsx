import type { Metadata } from "next";
import { BlogArticlePage } from "../../../BlogArticlePage";
import {
  buildDataCenterEvLowVoltageAgmMetadata,
  DataCenterEvLowVoltageAgmStructuredData
} from "../../../seo";

export const metadata: Metadata = buildDataCenterEvLowVoltageAgmMetadata("zh");

export default function Page() {
  return <><DataCenterEvLowVoltageAgmStructuredData lang="zh" /><BlogArticlePage lang="zh" page="dataCenterEvLowVoltageAgm" /></>;
}
