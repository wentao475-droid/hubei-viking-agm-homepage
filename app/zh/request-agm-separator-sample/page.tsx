import type { Metadata } from "next";
import { SampleRequestPage } from "../../SampleRequestPage";
import {
  buildSampleRequestMetadata,
  SampleRequestStructuredData
} from "../../seo";

export const metadata: Metadata = buildSampleRequestMetadata("zh");

export default function Page() {
  return (
    <>
      <SampleRequestStructuredData lang="zh" />
      <SampleRequestPage lang="zh" />
    </>
  );
}
