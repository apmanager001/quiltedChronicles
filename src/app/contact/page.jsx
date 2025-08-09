import React from "react";
import Contact from "./comp/contact";

export const metadata = {
  title: "Contact Us - Get Help & Support",
  description:
    "Need help with Quilted Chronicles? Contact our support team for assistance with your account, technical issues, or general questions about collaborative storytelling.",
  keywords: [
    "contact",
    "support",
    "help",
    "customer service",
    "technical support",
    "feedback",
    "questions",
  ],
  openGraph: {
    title: "Contact Quilted Chronicles Support",
    description:
      "Get help and support for your collaborative storytelling experience.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const Page = () => {
  return (
    <div>
      <Contact />
    </div>
  );
};

export default Page;
