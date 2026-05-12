import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OfferSpark — AI Offer Generator",
  description: "Turn rough business ideas into clear, sales-ready offers with AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
