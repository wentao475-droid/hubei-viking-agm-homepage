import type { Metadata } from "next";
import { SampleRequestPage } from "../../SampleRequestPage";
import {
  buildSampleRequestMetadata,
  SampleRequestStructuredData
} from "../../seo";

export const metadata: Metadata = buildSampleRequestMetadata("pt");

export default function Page() {
  return (
    <>
      <SampleRequestStructuredData lang="pt" />
      <SampleRequestPage lang="pt" />
    </>
  );
}
