import React from "react";
import Search from "./comp/search";

export const metadata = {
  title: "Search Stories - Discover Amazing Collaborative Tales",
  description:
    "Search through thousands of collaborative stories on Quilted Chronicles. Find stories by genre, author, keywords, or themes. Discover your next great read.",
  keywords: [
    "search stories",
    "find stories",
    "discover",
    "browse stories",
    "story search",
    "collaborative stories",
    "story discovery",
  ],
  openGraph: {
    title: "Search Stories - Quilted Chronicles",
    description:
      "Discover amazing collaborative stories written by our community of writers.",
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
      <Search />
    </div>
  );
};

export default Page;
