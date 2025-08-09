import React from "react";
import Chapter from "../comp/chapter";

export async function generateMetadata({ params }) {
  // In a real implementation, you would fetch chapter data here
  // const chapter = await fetchChapter(params.id)

  return {
    title: `Chapter ${params.id} - Quilted Chronicles`,
    description: `Read this engaging chapter in our collaborative storytelling community. Continue the story or explore different narrative paths.`,
    keywords: [
      "chapter",
      "story",
      "collaborative writing",
      "narrative",
      "continue reading",
    ],
    openGraph: {
      title: `Chapter ${params.id} - Quilted Chronicles`,
      description: `Read this engaging chapter in our collaborative storytelling community.`,
      type: "article",
      url: `https://www.quiltedchronicles.com/chapter/${params.id}`,
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const Page = () => {
  return (
    <div>
      <Chapter />
    </div>
  );
};

export default Page;
