import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  buildDataCenterEvLowVoltageAgmMetadata,
  DataCenterEvLowVoltageAgmStructuredData
} from "../../seo";

export const metadata: Metadata = buildDataCenterEvLowVoltageAgmMetadata("en");

export default function Page() {
  return <><DataCenterEvLowVoltageAgmStructuredData lang="en" /><BlogArticlePage lang="en" page="dataCenterEvLowVoltageAgm" /></>;
}
