import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import { buildAgmSeparatorVrlaApplicationMetadata, AgmSeparatorVrlaApplicationStructuredData } from "../../../seo";
export const metadata: Metadata = buildAgmSeparatorVrlaApplicationMetadata("ar");
export default function Page() { return <><AgmSeparatorVrlaApplicationStructuredData lang="ar" /><ProductPage lang="ar" page="agmSeparatorVrlaApplication" /></>; }
