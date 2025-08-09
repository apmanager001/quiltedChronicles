import React from "react";
import ClientStory from "./comp/createStory";

export const metadata = {
  title: "Create New Story - Start Your Collaborative Tale",
  description:
    "Start a new collaborative story on Quilted Chronicles. Begin an engaging tale that other writers can continue, creating unique branching narratives and multiple endings.",
  keywords: [
    "create story",
    "start writing",
    "new story",
    "collaborative writing",
    "story creation",
    "writing prompt",
    "begin story",
  ],
  openGraph: {
    title: "Create New Story - Quilted Chronicles",
    description:
      "Start a new collaborative story and let the community help you create something amazing.",
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
      <ClientStory />
    </div>
  );
};

export default Page;
