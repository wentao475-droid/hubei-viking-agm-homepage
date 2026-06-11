import type { Metadata } from "next";
import { QualityControlPage } from "../../QualityControlPage";
import {
  AgmSeparatorTestingStructuredData,
  buildAgmSeparatorTestingMetadata
} from "../../seo";

export const metadata: Metadata = buildAgmSeparatorTestingMetadata("en");

export default function Page() {
  return (
    <>
      <AgmSeparatorTestingStructuredData lang="en" />
      <QualityControlPage lang="en" />
    </>
  );
}
