import type { Metadata } from "next";
import { SampleRequestPage } from "../../SampleRequestPage";
import {
  buildSampleRequestMetadata,
  SampleRequestStructuredData
} from "../../seo";

export const metadata: Metadata = buildSampleRequestMetadata("vi");

export default function Page() {
  return (
    <>
      <SampleRequestStructuredData lang="vi" />
      <SampleRequestPage lang="vi" />
    </>
  );
}
