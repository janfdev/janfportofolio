import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { TooltipProvider } from "../components/ui/tooltip";
import { cn } from "../lib/utils";
import { Inter as FontSans } from "next/font/google";
import Navbar from "../components/navbar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rizqinoorfauzan.my.id"),
  title: {
    default: "Rizqi Noor Fauzan | Fullstack Developer",
    template: "%s | Rizqi Noor Fauzan"
  },
  description:
    "Portfolio Rizqi Noor Fauzan, Fullstack Developer yang membangun aplikasi web end-to-end dari frontend, API, hingga database.",
  keywords: [
    "Rizqi Noor Fauzan",
    "Fullstack Developer",
    "Web Developer Indonesia",
    "Next.js Developer",
    "React Developer",
    "Portfolio Developer"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Rizqi Noor Fauzan | Fullstack Developer",
    description:
      "Portfolio, pengalaman kerja, dan proyek Fullstack Developer berbasis Next.js, React, dan Node.js.",
    url: "https://rizqinoorfauzan.my.id",
    siteName: "Rizqi Noor Fauzan Portfolio",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/icon.jpeg",
        width: 1200,
        height: 630,
        alt: "Rizqi Noor Fauzan Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizqi Noor Fauzan | Fullstack Developer",
    description:
      "Portfolio, pengalaman kerja, dan proyek Fullstack Developer berbasis Next.js, React, dan Node.js.",
    images: ["/icon.jpeg"]
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/icon.jpeg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="!scroll-smooth">
      <body
        className={cn(
          "antialiased min-h-screen bg-background max-w-2xl mx-auto py-14 sm:py-12 px-6",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
