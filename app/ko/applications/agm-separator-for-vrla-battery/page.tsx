import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorVrlaApplicationStructuredData,
  buildAgmSeparatorVrlaApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorVrlaApplicationMetadata("ko");

export default function Page() {
  return (
    <>
      <AgmSeparatorVrlaApplicationStructuredData lang="ko" />
      <ProductPage lang="ko" page="agmSeparatorVrlaApplication" />
    </>
  );
}

