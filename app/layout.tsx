import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OptimizelyActivate from "@/components/OptimizelyActivate";
import AdobeDataLayerProvider from "@/components/AdobeDataLayerProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "SecureBank - Your Financial Partner for Life",
  description:
    "Experience banking designed around you with competitive rates, zero fees, and 24/7 access to your money",
  icons: {
    icon: "/images/icon-light-32x32.png",
    apple: "/images/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script src="//cdn.optimizely.com/js/6089558538846208.js" strategy="beforeInteractive" />
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body className="font-sans antialiased">
          {/*
          AdobeDataLayerProvider:
            • Sets window.digitalData on every route change (port of the AEM
              inline <script> block)
            • Injects the Adobe Launch embed script once (same URL as AEM)
          Must be a Client Component; placed before <Header> so digitalData
          is ready before any child component fires analytics events.
        */}
        <OptimizelyActivate />
        <AdobeDataLayerProvider />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>  
    </html>
  );
}
