import React from "react";
import Works from "./comp/works";

export const metadata = {
  title: "How It Works - Collaborative Storytelling Guide",
  description:
    "Discover how Quilted Chronicles brings writers together to create amazing collaborative stories. Learn the process of writing chapters, continuing stories, and building narrative chains.",
  keywords: [
    "how it works",
    "collaborative writing process",
    "storytelling guide",
    "writing chapters",
    "story chains",
    "community writing",
  ],
  openGraph: {
    title: "How Collaborative Storytelling Works on Quilted Chronicles",
    description:
      "Learn how writers collaborate to create amazing stories together on Quilted Chronicles.",
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
      <Works />
    </div>
  );
};

export default Page;
