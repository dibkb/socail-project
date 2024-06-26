import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/nav/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shreads",
  description: "@dibkb",
};
import { CounterStoreProvider } from "../src/providers/user-store-provider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CounterStoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className="absolute top-20 w-full z-10">{children}</div>
            <Toaster />
          </ThemeProvider>
          <div id="portal-root"></div>
        </CounterStoreProvider>
      </body>
    </html>
  );
}
