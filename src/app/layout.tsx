import type { Metadata } from "next";
import { Syne, Instrument_Sans, Martian_Mono, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const martianMono = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fiveYears = localFont({
  src: "../../public/fonts/FiveYearsLater.woff",
  variable: "--font-five",
  display: "swap",
  fallback: ["Syne", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "PRAVEEN — AI/ML Engineer & Creative Technologist",
  description:
    "Personal portfolio of Praveen. AI/ML Engineer, Full-Stack Developer, and Creative Technologist building intelligent platforms, robotics, and generative systems.",
  keywords: [
    "Praveen",
    "AI Engineer",
    "Machine Learning",
    "Creative Technologist",
    "Full-Stack Developer",
    "Next.js",
    "WebGL",
    "Three.js",
    "Robotics",
  ],
  authors: [{ name: "Praveen", url: "https://praveenai.tech" }],
  creator: "Praveen",
  openGraph: {
    title: "PRAVEEN — AI/ML Engineer & Creative Technologist",
    description:
      "Selected works, robotics, shipped apps, generative lab, and autonomous AI systems engineered by hand.",
    url: "https://praveenai.tech",
    siteName: "PRAVEEN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${fiveYears.variable} ${instrumentSans.variable} ${martianMono.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#f4f5f7] text-[#101113] selection:bg-[#0037ff] selection:text-[#f4f5f7]">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
