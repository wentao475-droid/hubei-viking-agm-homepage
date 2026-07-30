import type { Metadata } from "next";
import { SampleRequestPage } from "../../SampleRequestPage";
import {
  buildSampleRequestMetadata,
  SampleRequestStructuredData
} from "../../seo";

export const metadata: Metadata = buildSampleRequestMetadata("ko");

export default function Page() {
  return (
    <>
      <SampleRequestStructuredData lang="ko" />
      <SampleRequestPage lang="ko" />
    </>
  );
}
