import type { Metadata } from "next";
import { SampleRequestPage } from "../../SampleRequestPage";
import {
  buildSampleRequestMetadata,
  SampleRequestStructuredData
} from "../../seo";

export const metadata: Metadata = buildSampleRequestMetadata("es");

export default function Page() {
  return (
    <>
      <SampleRequestStructuredData lang="es" />
      <SampleRequestPage lang="es" />
    </>
  );
}
