import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import "./globals.css";
import Header from "../comps/header";
import Footer from "../comps/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Quilted Chronicles - Collaborative Storytelling Community",
    template: "%s | Quilted Chronicles",
  },
  description:
    "Join the ultimate collaborative storytelling community. Write chapters, continue stories, and explore multiple endings in this unique creative writing platform.",
  keywords: [
    "collaborative storytelling",
    "community writing",
    "creative writing",
    "story chapters",
    "interactive fiction",
    "writing community",
    "shared stories",
    "creative collaboration",
  ],
  authors: [{ name: "Quilted Chronicles Team" }],
  creator: "Quilted Chronicles",
  publisher: "Quilted Chronicles",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.quiltedchronicles.org"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.quiltedchronicles.org",
    title: "Quilted Chronicles - Collaborative Storytelling Community",
    description:
      "Join the ultimate collaborative storytelling community. Write chapters, continue stories, and explore multiple endings in this unique creative writing platform.",
    siteName: "Quilted Chronicles",
    images: [
      {
        url: "/quilted.webp",
        width: 1200,
        height: 630,
        alt: "Quilted Chronicles - Collaborative Storytelling Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quilted Chronicles - Collaborative Storytelling Community",
    description:
      "Join the ultimate collaborative storytelling community. Write chapters, continue stories, and explore multiple endings.",
    creator: "@quiltedchronicles",
    images: ["/quilted.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Quilted Chronicles",
              description:
                "Join the ultimate collaborative storytelling community. Write chapters, continue stories, and explore multiple endings in this unique creative writing platform.",
              url: "https://www.quiltedchronicles.org",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://www.quiltedchronicles.org/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "Quilted Chronicles",
                url: "https://www.quiltedchronicles.org",
              },
            }),
          }}
        />
        <link rel="canonical" href="https://www.quiltedchronicles.org" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
