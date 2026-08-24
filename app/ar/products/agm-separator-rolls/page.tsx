import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import { buildAgmSeparatorRollsMetadata, AgmSeparatorRollsStructuredData } from "../../../seo";
export const metadata: Metadata = buildAgmSeparatorRollsMetadata("ar");
export default function Page() { return <><AgmSeparatorRollsStructuredData lang="ar" /><ProductPage lang="ar" page="agmSeparatorRolls" /></>; }
