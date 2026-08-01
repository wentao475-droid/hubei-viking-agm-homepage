import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorVrlaApplicationStructuredData,
  buildAgmSeparatorVrlaApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorVrlaApplicationMetadata("vi");

export default function Page() {
  return (
    <>
      <AgmSeparatorVrlaApplicationStructuredData lang="vi" />
      <ProductPage lang="vi" page="agmSeparatorVrlaApplication" />
    </>
  );
}

