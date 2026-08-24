import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import { buildAgmSeparatorEnergyStorageApplicationMetadata, AgmSeparatorEnergyStorageApplicationStructuredData } from "../../../seo";
export const metadata: Metadata = buildAgmSeparatorEnergyStorageApplicationMetadata("ar");
export default function Page() { return <><AgmSeparatorEnergyStorageApplicationStructuredData lang="ar" /><ProductPage lang="ar" page="agmSeparatorEnergyStorageApplication" /></>; }
