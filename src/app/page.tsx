import React from "react";
import Script from "next/script";
import Hero from "../comps/homeComp/hero";
import HowItWorks from "../comps/homeComp/howItWorks";
import FeaturedStories from "../comps/homeComp/featuredStories";
import Testimonials from "../comps/homeComp/testimonials";
import CTASection from "../comps/homeComp/ctaSection";
import {
  generateWebsiteStructuredData,
  generateOrganizationStructuredData,
} from "./lib/structured-data";

export const metadata = {
  title: "Quilted Chronicles - Collaborative Storytelling Community",
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
  openGraph: {
    title: "Quilted Chronicles - Collaborative Storytelling Community",
    description:
      "Join the ultimate collaborative storytelling community. Write chapters, continue stories, and explore multiple endings.",
    type: "website",
    url: "https://www.quiltedchronicles.com",
    siteName: "Quilted Chronicles",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quilted Chronicles - Collaborative Storytelling Community",
    description:
      "Join the ultimate collaborative storytelling community. Write chapters, continue stories, and explore multiple endings.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  const websiteStructuredData = generateWebsiteStructuredData();
  const organizationStructuredData = generateOrganizationStructuredData();

  return (
    <div className="flex flex-col">
      <Script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />

      {/* Hero Section */}
      <Hero />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Featured Stories Section */}
      <FeaturedStories />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Call to Action Section */}
      <CTASection />
    </div>
  );
}
