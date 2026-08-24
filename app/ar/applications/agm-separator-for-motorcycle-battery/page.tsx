import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import { buildAgmSeparatorMotorcycleApplicationMetadata, AgmSeparatorMotorcycleApplicationStructuredData } from "../../../seo";
export const metadata: Metadata = buildAgmSeparatorMotorcycleApplicationMetadata("ar");
export default function Page() { return <><AgmSeparatorMotorcycleApplicationStructuredData lang="ar" /><ProductPage lang="ar" page="agmSeparatorMotorcycleApplication" /></>; }
