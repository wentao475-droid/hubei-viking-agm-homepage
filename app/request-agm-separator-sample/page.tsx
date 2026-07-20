import type { Metadata } from "next";
import { SampleRequestPage } from "../SampleRequestPage";
import {
  buildSampleRequestMetadata,
  SampleRequestStructuredData
} from "../seo";

export const metadata: Metadata = buildSampleRequestMetadata("en");

export default function Page() {
  return (
    <>
      <SampleRequestStructuredData lang="en" />
      <SampleRequestPage lang="en" />
    </>
  );
}
