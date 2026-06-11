import type { Metadata } from "next";
import { QualityControlPage } from "../../../QualityControlPage";
import {
  AgmSeparatorTestingStructuredData,
  buildAgmSeparatorTestingMetadata
} from "../../../seo";

export const metadata: Metadata = buildAgmSeparatorTestingMetadata("zh");

export default function Page() {
  return (
    <>
      <AgmSeparatorTestingStructuredData lang="zh" />
      <QualityControlPage lang="zh" />
    </>
  );
}
