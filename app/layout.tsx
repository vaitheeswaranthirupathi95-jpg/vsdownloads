import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VSdownloads — Download Supported Public Media",
  description: "Analyze supported public media URLs and download available audio or video formats.",
  metadataBase: new URL("https://vasfastdownload.online"),
  openGraph: {
    title: "VSdownloads — Download Supported Public Media",
    description: "Analyze supported public media URLs and download available audio or video formats.",
    url: "https://vasfastdownload.online",
    siteName: "VSdownloads",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VSdownloads — Download Supported Public Media",
    description: "Analyze supported public media URLs and download available audio or video formats.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-indigo-500 selection:text-white`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
