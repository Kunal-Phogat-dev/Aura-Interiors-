import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura Interiors | Bespoke Luxury Living & Modern Spaces",
  description: "Experience premium interior design that combines harmony, functionality, and timeless elegance. Crafting high-end residential and commercial sanctuaries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="preload" href="/hero-interior.png" as="image" />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-50 overflow-x-hidden">{children}</body>
    </html>
  );
}
