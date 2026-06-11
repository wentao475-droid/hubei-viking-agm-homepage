import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vikingagm.com"),
  title: "Viking AGM | AGM Battery Separator Manufacturer",
  description:
    "AGM battery separator manufacturer supplying glass fiber separators for VRLA, UPS, motorcycle, automotive and energy storage batteries.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48 64x64", type: "image/x-icon" },
      { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: "/images/apple-touch-icon.png"
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
