import type { Metadata } from "next";
import { SampleRequestPage } from "../../SampleRequestPage";
import {
  buildSampleRequestMetadata,
  SampleRequestStructuredData
} from "../../seo";

export const metadata: Metadata = buildSampleRequestMetadata("ja");

export default function Page() {
  return (
    <>
      <SampleRequestStructuredData lang="ja" />
      <SampleRequestPage lang="ja" />
    </>
  );
}
