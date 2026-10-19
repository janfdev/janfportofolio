import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { TooltipProvider } from "../components/ui/tooltip";
import { SmoothCursor } from "../components/ui/smooth-cursor";
import { cn } from "../lib/utils";
import { Inter as FontSans, Plus_Jakarta_Sans as FontDashboard, JetBrains_Mono as FontMono } from "next/font/google";
import { DATA } from "../lib/data/resume";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

const fontDashboard = FontDashboard({
  subsets: ["latin"],
  variable: "--font-dashboard",
  weight: ["400", "500", "600", "700", "800"]
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: `${DATA.name} | Fullstack Developer & System Architect`,
    template: `%s | ${DATA.name}`
  },
  description:
    "Portfolio resmi Rizqi Noor Fauzan (janfdev) — Fullstack Developer yang membangun aplikasi web scalable end-to-end, RESTful APIs, dan modern interactive user experiences.",
  keywords: [
    "Rizqi Noor Fauzan",
    "janfdev",
    "Fullstack Developer Indonesia",
    "AI Agent Systems",
    "System Architect",
    "Next.js Craftsman",
    "Portfolio Developer"
  ],
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  publisher: DATA.name,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: `${DATA.name} | Fullstack Developer & System Architect`,
    description:
      "Jelajahi proyek web interaktif, pengalaman enterprise & kampus, serta arsitektur fullstack yang dibangun oleh Rizqi Noor Fauzan.",
    url: DATA.url,
    siteName: `${DATA.name} Portfolio`,
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/profiless.png",
        width: 800,
        height: 800,
        alt: `${DATA.name} - Fullstack Developer`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${DATA.name} | Fullstack Developer`,
    description:
      "Portfolio resmi, proyek unggulan (Smartseum, Quavity, API Public), dan pengalaman kerja Fullstack Developer.",
    images: ["/profiless.png"],
    creator: "@janfdev"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: [
      { url: "/profiless.png" },
      { url: "/profiless.png", sizes: "32x32", type: "image/png" },
      { url: "/profiless.png", sizes: "192x192", type: "image/png" }
    ],
    shortcut: "/profiless.png",
    apple: [
      { url: "/profiless.png", sizes: "180x180", type: "image/png" }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="!scroll-smooth">
      <head>
        <link rel="icon" href="/profiless.png" />
        <link rel="shortcut icon" href="/profiless.png" />
        <link rel="apple-touch-icon" href="/profiless.png" />
      </head>
      <body
        className={cn("antialiased min-h-screen bg-background", fontSans.variable, fontDashboard.variable, fontMono.variable)}
      >
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <TooltipProvider delayDuration={0}>
            <SmoothCursor />
            {children}
          </TooltipProvider>
        </ThemeProvider>

        {/* Structured Data (Schema.org JSON-LD for Search Engines) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: DATA.name,
              url: DATA.url,
              image: `${DATA.url}/profiless.png`,
              sameAs: [
                DATA.contact.social.GitHub.url,
                DATA.contact.social.LinkedIn.url
              ],
              jobTitle: "Fullstack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Library UMC"
              },
              knowsAbout: [
                "Next.js",
                "React",
                "TypeScript",
                "Autonomous AI Agents",
                "NestJS",
                "PostgreSQL"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
