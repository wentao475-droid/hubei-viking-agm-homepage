import type { Metadata } from "next";
import { SampleRequestPage } from "../../SampleRequestPage";
import { buildSampleRequestMetadata, SampleRequestStructuredData } from "../../seo";
export const metadata: Metadata = buildSampleRequestMetadata("ar");
export default function Page() { return <><SampleRequestStructuredData lang="ar" /><SampleRequestPage lang="ar" /></>; }
