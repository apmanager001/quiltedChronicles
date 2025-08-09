import React from "react";
import Chain from "../comp/chain";

export async function generateMetadata({ params }) {
  // In a real implementation, you would fetch chain data here
  // const chain = await fetchChain(params.id)

  return {
    title: `Story Chain ${params.id} - Explore Multiple Paths`,
    description: `Explore this story chain on Quilted Chronicles. Follow different narrative branches and discover how multiple authors have continued this collaborative tale.`,
    keywords: [
      "story chain",
      "narrative paths",
      "collaborative story",
      "multiple endings",
      "story branches",
    ],
    openGraph: {
      title: `Story Chain ${params.id} - Quilted Chronicles`,
      description: `Explore different narrative paths in this collaborative story chain.`,
      type: "article",
      url: `https://www.quiltedchronicles.org/chain/${params.id}`,
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
      <Chain />
    </div>
  );
};

export default Page;
