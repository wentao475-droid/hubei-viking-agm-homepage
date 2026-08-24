import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import { buildAgmSeparatorSheetsMetadata, AgmSeparatorSheetsStructuredData } from "../../../seo";
export const metadata: Metadata = buildAgmSeparatorSheetsMetadata("ar");
export default function Page() { return <><AgmSeparatorSheetsStructuredData lang="ar" /><ProductPage lang="ar" page="agmSeparatorSheets" /></>; }
