import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorVrlaApplicationStructuredData,
  buildAgmSeparatorVrlaApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorVrlaApplicationMetadata("ru");

export default function Page() {
  return (
    <>
      <AgmSeparatorVrlaApplicationStructuredData lang="ru" />
      <ProductPage lang="ru" page="agmSeparatorVrlaApplication" />
    </>
  );
}

