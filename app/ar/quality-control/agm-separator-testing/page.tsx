import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import { buildAgmSeparatorTestingMetadata, AgmSeparatorTestingStructuredData } from "../../../seo";
export const metadata: Metadata = buildAgmSeparatorTestingMetadata("ar");
export default function Page() { return <><AgmSeparatorTestingStructuredData lang="ar" /><ProductPage lang="ar" page="agmSeparatorTesting" /></>; }
