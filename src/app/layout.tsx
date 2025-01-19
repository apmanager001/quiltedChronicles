import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
} from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import "./globals.css";
import Header from '../comps/header'
import Footer from '../comps/footer'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quilted Chronicles",
  description: "Complete a story as a community. Each user writes a chapter and the next person writes the next one. Each story has multiple middles and endings.",
  keywords: "chapter, story, book, writing, journal, community",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CWG0K8DNT9"
        ></Script>
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-CWG0K8DNT9');`}
        </Script>
        <title>Quilted Chronicles</title>
        <meta
          name="description"
          content="Complete a story as a community. Each user writes a chapter and the next person writes the next one. Each story has multiple middles and endings."
        />
        <meta
          name="keywords"
          content="chapter, story, book, writing, journal, community, collaborative, storytelling"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Toaster
          position={"top-left"}
          toastOptions={{
            duration: 5000,
            style: {
              border: "2px solid #000",
              padding: "22px",
              color: "#713200",
              fontSize: "16px",
              fontWeight: "700",
            },
            success: {
              style: {
                background: "#CFFDBC",
              },
            },
            error: {
              style: {
                background: "#ff9494",
              },
            },
          }}
        />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
