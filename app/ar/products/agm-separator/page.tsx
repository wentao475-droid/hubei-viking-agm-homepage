import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import { AgmSeparatorStructuredData, buildAgmSeparatorMetadata } from "../../../seo";
export const metadata: Metadata = buildAgmSeparatorMetadata("ar");
export default function Page() { return <><AgmSeparatorStructuredData lang="ar" /><ProductPage lang="ar" /></>; }
