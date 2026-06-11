import type { Metadata } from "next";
import { ProductPage } from "../../../ProductPage";
import {
  AgmSeparatorVrlaApplicationStructuredData,
  buildAgmSeparatorVrlaApplicationMetadata
} from "../../../seo";

export const metadata: Metadata =
  buildAgmSeparatorVrlaApplicationMetadata("zh");

export default function ZhAgmSeparatorVrlaApplicationPage() {
  return (
    <>
      <AgmSeparatorVrlaApplicationStructuredData lang="zh" />
      <ProductPage lang="zh" page="agmSeparatorVrlaApplication" />
    </>
  );
}
