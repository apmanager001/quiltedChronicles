import React from "react";
import FAQ from "./comp/faq";
import Script from "next/script";
import { generateFAQStructuredData } from "../lib/structured-data";

export const metadata = {
  title: "Frequently Asked Questions - Quilted Chronicles Help",
  description:
    "Find answers to common questions about Quilted Chronicles. Learn how collaborative storytelling works, account management, writing guidelines, and community features.",
  keywords: [
    "FAQ",
    "help",
    "questions",
    "support",
    "how to use",
    "collaborative writing help",
    "storytelling guide",
  ],
  openGraph: {
    title: "FAQ - Quilted Chronicles Help Center",
    description:
      "Get answers to your questions about collaborative storytelling on Quilted Chronicles.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqs = [
  {
    question: "Can I mess up a story?",
    answer:
      "Not at all. Our goal is to allow everyone to be creative and your pivot in a story is one of many to be creative. Be as creative as you can!",
  },
  {
    question: "Can I view a full story on a page?",
    answer:
      "Yes! It is called a chain and you click the button that says 'View Full Chain' when you are on the chapter page with the last chapter you want to read. This will put all the chapters into a single page to read through.",
  },
  {
    question: "How can I start a new story?",
    answer:
      "Starting a new story is easy! Simply click the 'Create a Story' button when you login, choose a title, keywords, and write the first chapter. Once you're done, publish it, and others can begin adding their chapters to yours.",
  },
  {
    question: "Can I add my Chapter to an existing story?",
    answer:
      "Yes, definitely! Browse through the existing stories and click on any story that interests you. Click 'Add a Chapter' to contribute your part to the narrative.",
  },
  {
    question: "Are there any guidelines for writing sections?",
    answer:
      "We encourage creativity and originality! However, please adhere to our community guidelines which prohibit content that is offensive, inappropriate, or violates copyright laws. If you see anything offensive please use the flag button under the chapter to notify us.",
  },
  {
    question: "Can I edit or delete my section after it's published?",
    answer:
      "Once a section is published, it cannot be edited. This maintains the integrity of collaborative storytelling. However, if you need a section removed, please contact us.",
  },
];

const Page = () => {
  const faqStructuredData = generateFAQStructuredData(faqs);

  return (
    <div>
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <FAQ />
    </div>
  );
};

export default Page;
