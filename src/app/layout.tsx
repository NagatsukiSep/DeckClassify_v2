import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header/Header";
import { DeckDataProvider } from "./context/DeckDataContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Decklassify",
  description: "デッキコードが書かれたCSVファイルからデッキタイプごとに分類し、集計するツールです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-8 md:m-12 lg:m-16`}
      >
        <DeckDataProvider>
          <Header />
          {children}
        </DeckDataProvider>
      </body>
    </html>
  );
}
