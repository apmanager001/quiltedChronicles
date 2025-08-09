// Structured Data (JSON-LD) utilities for SEO

export const generateWebsiteStructuredData = () => {
  return {
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
      logo: {
        "@type": "ImageObject",
        url: "https://www.quiltedchronicles.org/quilted.webp",
      },
    },
  };
};

export const generateOrganizationStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Quilted Chronicles",
    url: "https://www.quiltedchronicles.org",
    logo: "https://www.quiltedchronicles.org/quilted.webp",
    description:
      "A collaborative storytelling platform where writers create stories together, chapter by chapter, creating unique branching narratives.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      url: "https://www.quiltedchronicles.org/contact",
    },
    sameAs: [
      "https://twitter.org/quiltedchronicles",
      "https://facebook.org/quiltedchronicles",
    ],
  };
};

export const generateChapterStructuredData = (chapterData) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: chapterData.title || `Chapter ${chapterData.id}`,
    description:
      chapterData.description ||
      "A chapter in our collaborative storytelling community",
    author: {
      "@type": "Person",
      name: chapterData.author || "Quilted Chronicles Author",
    },
    publisher: {
      "@type": "Organization",
      name: "Quilted Chronicles",
      logo: {
        "@type": "ImageObject",
        url: "https://www.quiltedchronicles.org/quilted.webp",
      },
    },
    datePublished: chapterData.publishedDate || new Date().toISOString(),
    dateModified: chapterData.modifiedDate || new Date().toISOString(),
    url: `https://www.quiltedchronicles.org/chapter/${chapterData.id}`,
    isPartOf: {
      "@type": "CreativeWorkSeries",
      name: chapterData.storyTitle || "Collaborative Story",
    },
    genre: "Fiction",
    inLanguage: "en",
  };
};

export const generateStoryChainStructuredData = (chainData) => {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name: chainData.title || `Story Chain ${chainData.id}`,
    description:
      chainData.description ||
      "A collaborative story with multiple narrative paths",
    url: `https://www.quiltedchronicles.org/chain/${chainData.id}`,
    creator: {
      "@type": "Organization",
      name: "Quilted Chronicles Community",
    },
    publisher: {
      "@type": "Organization",
      name: "Quilted Chronicles",
    },
    genre: "Collaborative Fiction",
    inLanguage: "en",
  };
};

export const generateProfileStructuredData = (profileData) => {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: profileData.name || "Quilted Chronicles Author",
      description:
        profileData.bio ||
        "A collaborative storytelling author on Quilted Chronicles",
      url: `https://www.quiltedchronicles.org/profile/${profileData.id}`,
      sameAs: profileData.socialLinks || [],
    },
  };
};

export const generateBreadcrumbStructuredData = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url,
    })),
  };
};

export const generateFAQStructuredData = (faqs) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};
