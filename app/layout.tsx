import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A ONE JUICE & ICE CREAM | Fresh Juices, Shakes & More",
  description: "Premium fresh juices, power shakes, smoothies, ice cream and more. Quality you can taste. Order now via WhatsApp.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
