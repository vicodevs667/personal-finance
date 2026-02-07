import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Finance",
  description: "Track expenses and view insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem("personal-finance-theme");var r=!window.matchMedia||!window.matchMedia("(prefers-color-scheme: dark)").matches?"light":"dark";var s=t==="light"||t==="dark"?t:r;document.documentElement.classList.add(s);})();`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${syne.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
