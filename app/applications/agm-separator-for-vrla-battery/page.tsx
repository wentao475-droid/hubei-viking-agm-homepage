import type { Metadata } from "next";
import { ProductPage } from "../../ProductPage";
import {
  AgmSeparatorVrlaApplicationStructuredData,
  buildAgmSeparatorVrlaApplicationMetadata
} from "../../seo";

export const metadata: Metadata =
  buildAgmSeparatorVrlaApplicationMetadata("en");

export default function AgmSeparatorVrlaApplicationPage() {
  return (
    <>
      <AgmSeparatorVrlaApplicationStructuredData lang="en" />
      <ProductPage lang="en" page="agmSeparatorVrlaApplication" />
    </>
  );
}
