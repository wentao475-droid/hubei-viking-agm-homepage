import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hubei Viking Technology Co., Ltd. | AGM Battery Separator Manufacturer",
  description:
    "AGM battery separator manufacturer supplying glass fiber separators for VRLA, UPS, motorcycle, automotive and energy storage batteries.",
  icons: {
    icon: "/images/viking_logo_transparent_cropped.png",
    shortcut: "/images/viking_logo_transparent_cropped.png",
    apple: "/images/viking_logo_transparent_cropped.png"
  },
  keywords: [
    "AGM Battery Separator",
    "Absorbent Glass Mat Separator",
    "VRLA Battery Separator",
    "Lead Acid Battery Separator",
    "Hubei Viking Technology"
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
