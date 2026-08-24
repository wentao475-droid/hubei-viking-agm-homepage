import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import { buildAgmSeparatorUpsApplicationMetadata, AgmSeparatorUpsApplicationStructuredData } from "../../../seo";
export const metadata: Metadata = buildAgmSeparatorUpsApplicationMetadata("ar");
export default function Page() { return <><AgmSeparatorUpsApplicationStructuredData lang="ar" /><ProductPage lang="ar" page="agmSeparatorUpsApplication" /></>; }
