import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OptimizelyActivate from "@/components/OptimizelyActivate";
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
        <OptimizelyActivate />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
