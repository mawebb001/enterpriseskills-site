import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Enterprise Skills - Governance-First AI Development",
  description:
    "Enterprise-grade AI agent skills with governance, session management, and structured workflows. Works across Cursor, VS Code, Claude Code, and 5 more IDEs.",
  openGraph: {
    title: "Enterprise Skills - Governance-First AI Development",
    description:
      "40+ AI agent skills with governance, session management, and multi-IDE support.",
    url: "https://enterpriseskills.dev",
    siteName: "Enterprise Skills",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Skills",
    description:
      "Governance-first AI development across every IDE.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
