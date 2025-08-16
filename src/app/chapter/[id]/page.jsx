"use client";
import React, { useState, useEffect } from "react";
import Chapter from "../comp/chapter";
import { useParams } from "next/navigation";
import validator from "validator";

const Page = () => {
  const { id } = useParams();
  const [pageTitle, setPageTitle] = useState(
    `Chapter ${id} - Quilted Chronicles`
  );
  const [pageDescription, setPageDescription] = useState(
    `Read this engaging chapter in our collaborative storytelling community. Continue the story or explore different narrative paths.`
  );
  const [authorName, setAuthorName] = useState("");
  const [publicationDate, setPublicationDate] = useState("");

  // Update document title and meta tags when pageTitle changes
  useEffect(() => {
    document.title = pageTitle;

    // Update Open Graph meta tags
    updateMetaTag("og:title", pageTitle);
    updateMetaTag("og:description", pageDescription);
    updateMetaTag("og:url", `https://www.quiltedchronicles.com/chapter/${id}`);

    // Update Twitter Card meta tags
    updateMetaTag("twitter:title", pageTitle);
    updateMetaTag("twitter:description", pageDescription);

    // Update other meta tags
    updateMetaTag("description", pageDescription);
    updateMetaTag(
      "keywords",
      "chapter, story, collaborative writing, narrative, continue reading"
    );
  }, [pageTitle, pageDescription, id]);

  // Update author and publication date meta tags
  useEffect(() => {
    if (authorName) {
      updateMetaTag("og:author", authorName);
      updateMetaTag("twitter:creator", `@${authorName.replace(/\s+/g, "")}`);
      updateMetaTag("author", authorName);
    }

    if (publicationDate) {
      updateMetaTag("og:published_time", publicationDate);
      updateMetaTag("article:published_time", publicationDate);
    }
  }, [authorName, publicationDate]);

  // Helper function to update or create meta tags
  const updateMetaTag = (name, content) => {
    let meta =
      document.querySelector(`meta[name="${name}"]`) ||
      document.querySelector(`meta[property="${name}"]`);

    if (meta) {
      meta.setAttribute("content", content);
    } else {
      meta = document.createElement("meta");
      if (name.startsWith("og:")) {
        meta.setAttribute("property", name);
      } else if (name.startsWith("twitter:")) {
        meta.setAttribute("name", name);
      } else {
        meta.setAttribute("name", name);
      }
      meta.setAttribute("content", content);
      document.head.appendChild(meta);
    }
  };

  // Set initial meta tags when component mounts
  useEffect(() => {
    // Set initial Open Graph meta tags
    updateMetaTag("og:type", "article");
    updateMetaTag("og:site_name", "Quilted Chronicles");
    updateMetaTag("og:image", "/quilted.webp");
    updateMetaTag("og:image:width", "1200");
    updateMetaTag("og:image:height", "630");
    updateMetaTag(
      "og:image:alt",
      "Quilted Chronicles - Collaborative Storytelling Platform"
    );
    updateMetaTag("og:locale", "en_US");
    updateMetaTag("og:url", `https://www.quiltedchronicles.com/chapter/${id}`);

    // Set initial Twitter Card meta tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:site", "@quiltedchronicles");
    updateMetaTag("twitter:creator", "@quiltedchronicles");
    updateMetaTag("twitter:image", "/quilted.webp");
    updateMetaTag(
      "twitter:image:alt",
      "Quilted Chronicles - Collaborative Storytelling Platform"
    );

    // Set initial other meta tags
    updateMetaTag("robots", "index, follow");
    updateMetaTag(
      "canonical",
      `https://www.quiltedchronicles.com/chapter/${id}`
    );

    // Cleanup function to remove meta tags when component unmounts
    return () => {
      const metaTags = document.querySelectorAll(
        'meta[name^="og:"], meta[property^="og:"], meta[name^="twitter:"], meta[name="description"], meta[name="keywords"], meta[name="robots"], meta[name="canonical"]'
      );
      metaTags.forEach((tag) => {
        if (
          tag.getAttribute("name")?.startsWith("og:") ||
          tag.getAttribute("property")?.startsWith("og:") ||
          tag.getAttribute("name")?.startsWith("twitter:") ||
          ["description", "keywords", "robots", "canonical"].includes(
            tag.getAttribute("name")
          )
        ) {
          tag.remove();
        }
      });
    };
  }, [id]);

  const handleTitleChange = ({
    chapterTitle,
    storyTitle,
    authorName: author,
    createDate,
  }) => {
    // Set author and publication date for meta tags
    setAuthorName(author);
    setPublicationDate(createDate);

    if (chapterTitle && storyTitle) {
      // Chapter with title
      setPageTitle(
        `${validator.unescape(chapterTitle)} - ${validator.unescape(
          storyTitle
        )} | Quilted Chronicles`
      );
      setPageDescription(
        `Read "${validator.unescape(chapterTitle)}" from "${validator.unescape(
          storyTitle
        )}" by ${author}. Continue the story or explore different narrative paths.`
      );
    } else if (storyTitle) {
      // First chapter (no chapter title)
      setPageTitle(`${validator.unescape(storyTitle)} | Quilted Chronicles`);
      setPageDescription(
        `Read "${validator.unescape(
          storyTitle
        )}" by ${author}. Start this collaborative story and continue the narrative.`
      );
    }
  };

  return (
    <div>
      <Chapter onTitleChange={handleTitleChange} />
    </div>
  );
};

export default Page;
