import type { Metadata } from "next";
import "./globals.css";
import FontLoader from "./FontLoader";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tariqahmedbhatti.netlify.app/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tariq Ahmetti (Boby Shoes) - Candidate SLCCI Elections 2026-28",
    template: "%s | Tariq Ahmetti Campaign",
  },
  description: "Vote and Support Tariq Ahmetti (Boby Shoes) for Executive Member Associate Class in Sahiwal Chamber of Commerce & Industry (SLCCI) Elections 2026-28.",
  keywords: [
    "Tariq Ahmetti", "Boby Shoes Sahiwal", "SLCCI Elections",
    "Sahiwal Chamber Election 2026", "Associate Class Candidate Sahiwal",
  ],
  authors: [{ name: "Tariq Ahmed Bhatti", url: SITE_URL }],
  creator: "Tariq Ahmed Bhatti Campaign",
  publisher: "Tariq Ahmed Bhatti Campaign",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website", locale: "en_PK", url: SITE_URL, siteName: "Tariq Ahmetti Campaign",
    title: "Tariq Ahmetti (Boby Shoes) - Candidate SLCCI Elections 2026-28",
    description: "Vote and Support Tariq Ahmetti (Boby Shoes) for Executive Member Associate Class in Sahiwal Chamber of Commerce & Industry (SLCCI) Elections 2026-28.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tariq Ahmetti (Boby Shoes) - Candidate SLCCI Elections 2026-28",
    description: "Vote and Support Tariq Ahmetti (Boby Shoes) for Executive Member Associate Class in Sahiwal Chamber of Commerce & Industry (SLCCI) Elections 2026-28.",
  },
  icons: { icon: [{ url: "/favicon.ico" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }], apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }] },
  manifest: "/manifest.webmanifest",
  category: "business",
  verification: {
    google: "R_d4ABIq7OPlo679yrddl7e5w4YpNJs770wvcghVD2I",
  },
};

const candidateSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#candidate`,
  name: "Tariq Ahmed Bhatti",
  jobTitle: "Owner of Boby Shoes",
  description: "Candidate for Executive Committee Member (Associate Class) in Sahiwal Chamber Elections 2026-28.",
  address: { "@type": "PostalAddress", addressLocality: "Sahiwal", addressRegion: "Punjab", addressCountry: "PK" },
  sameAs: [`${SITE_URL}/`, "https://wa.me/923009696293"],
};

const campaignSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#campaign`,
  name: "Tariq Ahmed Bhatti Campaign",
  description: "Campaign for Tariq Ahmed Bhatti in Sahiwal Chamber Elections 2026-28.",
  url: SITE_URL,
  founder: { "@id": `${SITE_URL}/#candidate` },
  areaServed: { "@type": "City", name: "Sahiwal" },
  memberOf: { "@type": "Organization", name: "Sahiwal Chamber of Commerce & Industry" },
  sameAs: ["https://wa.me/923009696293"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Tariq Ahmed Bhatti Campaign",
  url: SITE_URL,
  description: "Tajiron ki Awaaz, Sahiwal ki Tarraqi!",
  inLanguage: ["en-PK", "ur"],
  publisher: { "@id": `${SITE_URL}/#campaign` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-PK">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(candidateSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(campaignSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body><FontLoader />{children}</body>
    </html>
  );
}
