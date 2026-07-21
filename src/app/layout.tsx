import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Backcountry Light | Premium Outdoor Gear & Rental",
  description: "Premium outdoor retail and rental company specializing in ultralight backpacking, hiking, and camping equipment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${GeistSans.variable}`}>
      <body className="font-sans antialiased flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
