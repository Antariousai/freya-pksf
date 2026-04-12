import type { Metadata } from "next";
import { DM_Sans, Noto_Sans_Bengali, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/lib/theme-context";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Freya | Antarious AI — PKSF Intelligence",
  description:
    "Antarious AI Freya — Financial Intelligence Platform for PKSF (Palli Karma-Sahayak Foundation)",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
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
      data-theme="light"
      className={`${dmSans.variable} ${notoSansBengali.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="h-full overflow-hidden" style={{ background: "var(--bg-0)" }}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
