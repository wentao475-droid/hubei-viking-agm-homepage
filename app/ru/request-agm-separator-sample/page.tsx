import type { Metadata } from "next";
import { SampleRequestPage } from "../../SampleRequestPage";
import {
  buildSampleRequestMetadata,
  SampleRequestStructuredData
} from "../../seo";

export const metadata: Metadata = buildSampleRequestMetadata("ru");

export default function Page() {
  return (
    <>
      <SampleRequestStructuredData lang="ru" />
      <SampleRequestPage lang="ru" />
    </>
  );
}
