import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://a-one-juice-sahiwal.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "A One Juice & Ice Cream Sahiwal | Fresh Juices, Shakes & More",
    template: "%s | A One Juice Sahiwal",
  },
  description:
    "Best fresh juice shop in Sahiwal, Punjab, Pakistan. Enjoy 50+ items: fresh fruit juices, power shakes, milk shakes, ice cream, salads & coffee. Order on WhatsApp.",
  keywords: [
    "juice shop Sahiwal",
    "fresh juice Sahiwal",
    "A One Juice Sahiwal",
    "best juice Sahiwal",
    "mango juice Sahiwal",
    "orange juice Sahiwal",
    "fruit juice Pakistan",
    "healthy drinks Sahiwal",
    "ice cream Sahiwal",
    "milk shake Sahiwal",
    "power shake Sahiwal",
    "fresh drinks Punjab",
    "juice bar Pakistan",
    "falsa juice Sahiwal",
    "anaar juice Sahiwal",
    "WhatsApp juice order Sahiwal",
    "اے ون جوس ساہیوال",
  ],
  authors: [{ name: "A One Juice & Ice Cream", url: SITE_URL }],
  creator: "A One Juice & Ice Cream",
  publisher: "A One Juice & Ice Cream",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: "A One Juice & Ice Cream Sahiwal",
    title: "A One Juice & Ice Cream Sahiwal | Fresh Juices & Shakes",
    description:
      "Best fresh juice shop in Sahiwal, Punjab. 50+ items including fruit juices, power shakes, milk shakes, ice cream & more. Order on WhatsApp!",
  },
  twitter: {
    card: "summary_large_image",
    title: "A One Juice & Ice Cream Sahiwal | Fresh Juices & Shakes",
    description:
      "Best fresh juice shop in Sahiwal, Punjab. 50+ items. Order on WhatsApp!",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  category: "food",
};

/* ── JSON-LD Structured Data ── */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["FoodEstablishment", "LocalBusiness"],
  "@id": `${SITE_URL}/#business`,
  name: "A One Juice & Ice Cream",
  alternateName: "A One Juice Sahiwal",
  description:
    "Premium fresh juice bar and ice cream shop in Sahiwal, Punjab, Pakistan, offering 50+ menu items including fresh fruit juices, power shakes, milk shakes, salads and coffee.",
  url: SITE_URL,
  telephone: "+923136010673",
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/icon-512.png`,
  priceRange: "Rs. 150 – Rs. 1200",
  servesCuisine: ["Fresh Juice", "Shakes", "Ice Cream", "Salads", "Soups", "Coffee"],
  currenciesAccepted: "PKR",
  paymentAccepted: "Cash, Easypaisa, JazzCash",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Bazar",
    addressLocality: "Sahiwal",
    addressRegion: "Punjab",
    postalCode: "57000",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "30.6682",
    longitude: "73.0875",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
      ],
      opens: "09:00",
      closes: "01:00",
    },
  ],
  hasMap: "https://maps.app.goo.gl/k8Le8ZCPxenc8uyv7",
  sameAs: [
    "https://wa.me/923136010673",
    "https://maps.app.goo.gl/k8Le8ZCPxenc8uyv7",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "120",
    bestRating: "5",
    worstRating: "1",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "A One Juice & Ice Cream Sahiwal",
  url: SITE_URL,
  description: "Best fresh juice shop in Sahiwal, Punjab, Pakistan.",
  inLanguage: "en-PK",
  publisher: { "@id": `${SITE_URL}/#business` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?s={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const menuSchema = {
  "@context": "https://schema.org",
  "@type": "Menu",
  "@id": `${SITE_URL}/#menu`,
  name: "A One Juice Menu",
  description: "Full menu of fresh juices, shakes, ice cream and more at A One Juice Sahiwal.",
  hasMenuSection: [
    {
      "@type": "MenuSection",
      name: "Special Juices",
      hasMenuItem: [
        { "@type": "MenuItem", name: "Apple Juice", offers: { "@type": "Offer", price: "300", priceCurrency: "PKR" } },
        { "@type": "MenuItem", name: "Strawberry Juice", offers: { "@type": "Offer", price: "350", priceCurrency: "PKR" } },
        { "@type": "MenuItem", name: "Pineapple Juice", offers: { "@type": "Offer", price: "400", priceCurrency: "PKR" } },
        { "@type": "MenuItem", name: "Orange Juice", offers: { "@type": "Offer", price: "150", priceCurrency: "PKR" } },
        { "@type": "MenuItem", name: "Red Anaar Juice", offers: { "@type": "Offer", price: "800", priceCurrency: "PKR" } },
        { "@type": "MenuItem", name: "Special Sharbat e Falsa", offers: { "@type": "Offer", price: "800", priceCurrency: "PKR" } },
      ],
    },
    {
      "@type": "MenuSection",
      name: "Power Shakes",
      hasMenuItem: [
        { "@type": "MenuItem", name: "Power Shake", offers: { "@type": "Offer", price: "650", priceCurrency: "PKR" } },
        { "@type": "MenuItem", name: "Kaju Badam Mix Shake", offers: { "@type": "Offer", price: "650", priceCurrency: "PKR" } },
        { "@type": "MenuItem", name: "Dry Fruit Mix Shake", offers: { "@type": "Offer", price: "650", priceCurrency: "PKR" } },
      ],
    },
    {
      "@type": "MenuSection",
      name: "Milk Shakes",
      hasMenuItem: [
        { "@type": "MenuItem", name: "Mango Shake", offers: { "@type": "Offer", price: "200", priceCurrency: "PKR" } },
        { "@type": "MenuItem", name: "Banana Milk Shake", offers: { "@type": "Offer", price: "200", priceCurrency: "PKR" } },
        { "@type": "MenuItem", name: "Strawberry Shake", offers: { "@type": "Offer", price: "200", priceCurrency: "PKR" } },
      ],
    },
    {
      "@type": "MenuSection",
      name: "Ice Cream",
      hasMenuItem: [
        { "@type": "MenuItem", name: "Ice Cream 2 Scoop", offers: { "@type": "Offer", price: "190", priceCurrency: "PKR" } },
        { "@type": "MenuItem", name: "Ice Cream 1 Liter", offers: { "@type": "Offer", price: "1000", priceCurrency: "PKR" } },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-PK" className={poppins.variable}>
      <body>
        {children}
        <Script
          id="schema-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
          strategy="afterInteractive"
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          strategy="afterInteractive"
        />
        <Script
          id="schema-menu"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
