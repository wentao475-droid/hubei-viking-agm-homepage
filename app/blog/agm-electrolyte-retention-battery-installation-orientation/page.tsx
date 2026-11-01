import type { Metadata } from "next";
import { BlogArticlePage } from "../../BlogArticlePage";
import {
  AgmBatteryOrientationStructuredData,
  buildAgmBatteryOrientationMetadata
} from "../../seo";

export const metadata: Metadata = buildAgmBatteryOrientationMetadata("en");

export default function Page() {
  return (
    <>
      <AgmBatteryOrientationStructuredData lang="en" />
      <BlogArticlePage lang="en" page="agmBatteryOrientation" />
    </>
  );
}
