"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import validator from "validator";
import { useParams } from "next/navigation";
import axiosInstance from "../../../comps/utility/axios";
import AccountPage from "../../account/layout";
import Expanded from "./expand";

import { Share2, ClipboardCopy, ChevronDown } from "lucide-react";
import Loading from "../../../comps/utility/loading";
import toast from "react-hot-toast";
import { SocialIcon } from "react-social-icons";

const Chain = ({ onTitleChange }) => {
  const { id } = useParams();
  const [chain, setChain] = useState([]);
  const [storyTitle, setStoryTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showShareDropdown, setShowShareDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/chain/${id}`);
        setChain(response.data);
        setStoryTitle(response.data[0].storyTitle);
        setLoading(true);

        // Notify parent component of title changes for SEO
        if (onTitleChange && response.data[0]) {
          onTitleChange({
            storyTitle: response.data[0].storyTitle,
            authorName: response.data[0].authorName,
            createDate: new Date(
              response.data[0].createDate
            ).toLocaleDateString(),
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [id, onTitleChange]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showShareDropdown &&
        !event.target.closest(".share-dropdown-container")
      ) {
        setShowShareDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShareDropdown]);

  const processText = (text) => {
    return text
      .split("\n")
      .map((paragraph, index) => (
        <p key={index}>{validator.unescape(paragraph)}</p>
      ));
  };

  function copyURL() {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("URL Copied!");
        setShowShareDropdown(false); // Close dropdown after copying
      })
      .catch((err) => {
        toast.error("Failed to copy the URL");
      });
  }

  const toggleShareDropdown = () => {
    setShowShareDropdown(!showShareDropdown);
  };

  const handleSocialShare = () => {
    setShowShareDropdown(false);
  };
  return (
    <AccountPage>
      {error ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-error mb-2">
            Error Loading Story Chain
          </h3>
          <p className="text-base-content/70 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-outline btn-error"
          >
            Try Again
          </button>
        </div>
      ) : loading ? (
        <>
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            {/* Breadcrumb Navigation */}
            <div className="text-sm breadcrumbs mb-6">
              <ul className="flex items-center gap-2 text-base-content/70">
                <li>
                  <Link
                    href="/"
                    className="hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <span className="text-base-content/50">/</span>
                </li>
                <li>
                  <Link
                    href="/search"
                    className="hover:text-primary transition-colors"
                  >
                    Stories
                  </Link>
                </li>
                <li>
                  <span className="text-base-content/50">/</span>
                </li>
                <li className="text-primary font-medium">
                  {validator.unescape(storyTitle)}
                </li>
              </ul>
            </div>

            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1"></div>
                <h1 className="text-2xl lg:text-3xl font-bold text-base-content">
                  Story Chain
                </h1>
                <div className="flex-1 flex justify-end">
                  <Expanded />
                </div>
              </div>

              {/* Story Title and Share Button Row */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <h2 className="text-xl lg:text-2xl font-semibold text-primary">
                  {validator.unescape(storyTitle)}
                </h2>

                <div className="relative share-dropdown-container">
                  <button
                    onClick={toggleShareDropdown}
                    className="btn btn-primary btn-sm gap-2 hover:btn-primary-focus transition-all duration-200"
                    aria-label="Share this story chain"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        showShareDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Share Dropdown */}
                  {showShareDropdown && (
                    <div className="absolute top-full right-0 mt-2 bg-base-100 rounded-xl shadow-lg border border-base-300/50 p-3 min-w-[200px] z-10 animate-in fade-in-0 zoom-in-95 duration-200">
                      <div className="space-y-3">
                        <button
                          onClick={copyURL}
                          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-base-200 transition-colors text-left hover:text-primary"
                        >
                          <ClipboardCopy className="w-4 h-4" />
                          <span className="font-medium">Copy URL</span>
                        </button>
                        <div className="border-t border-base-300/50 pt-3">
                          <p className="text-xs text-base-content/60 mb-2 text-center">
                            Share to social media
                          </p>
                          <div className="flex justify-between items-center gap-3">
                            <div
                              className="tooltip tooltip-bottom"
                              data-tip="Share to Threads"
                            >
                              <SocialIcon
                                network="threads"
                                style={{ height: 35, width: 35 }}
                                url={`https://threads.net/intent/post?text=${encodeURIComponent(
                                  "Check out this story on Quilted!"
                                )}%20${encodeURI(window.location.href)}`}
                                target="_blank"
                                onClick={handleSocialShare}
                                className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                              />
                            </div>
                            <div
                              className="tooltip tooltip-bottom"
                              data-tip="Share to Facebook"
                            >
                              <SocialIcon
                                network="facebook"
                                style={{ height: 35, width: 35 }}
                                url={`https://www.facebook.com/share.php?u=${encodeURI(
                                  window.location.href
                                )}`}
                                target="_blank"
                                onClick={handleSocialShare}
                                className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                              />
                            </div>
                            <div
                              className="tooltip tooltip-bottom"
                              data-tip="Share to Reddit"
                            >
                              <SocialIcon
                                network="reddit"
                                style={{ height: 35, width: 35 }}
                                url={`http://www.reddit.com/submit?url=${encodeURI(
                                  window.location.href
                                )}&title=${encodeURIComponent(
                                  storyTitle
                                )}&text=${encodeURIComponent(
                                  "Check out this story on Quilted!"
                                )}`}
                                target="_blank"
                                onClick={handleSocialShare}
                                className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                              />
                            </div>
                            <div
                              className="tooltip tooltip-bottom"
                              data-tip="Share to BlueSky"
                            >
                              <SocialIcon
                                network="bsky.app"
                                style={{ height: 35, width: 35 }}
                                url={`https://bsky.app/intent/compose?text=${encodeURIComponent(
                                  "Check out this story on Quilted!"
                                )}%20${encodeURIComponent(
                                  storyTitle
                                )}%20${encodeURI(window.location.href)}`}
                                target="_blank"
                                onClick={handleSocialShare}
                                className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                              />
                            </div>
                            <div
                              className="tooltip tooltip-bottom"
                              data-tip="Share to X"
                            >
                              <SocialIcon
                                network="x"
                                style={{ height: 35, width: 35 }}
                                url={`https://x.com/share?&text=${encodeURIComponent(
                                  "Check out this story on Quilted!"
                                )}&url=${encodeURI(window.location.href)}`}
                                target="_blank"
                                onClick={handleSocialShare}
                                className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Chain Summary */}
            <div className="bg-base-200/50 rounded-2xl border border-base-300/50 p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 text-center">
                <div className="space-y-2 min-w-0">
                  <div className="text-2xl sm:text-xl font-bold text-primary">
                    {chain.length}
                  </div>
                  <div className="text-sm text-base-content/70">
                    Total Chapters
                  </div>
                </div>
                <div className="space-y-2 min-w-0">
                  <div className="text-2xl sm:text-xl font-bold text-secondary">
                    {new Set(chain.map((ch) => ch.authorName)).size}
                  </div>
                  <div className="text-sm text-base-content/70">
                    Unique Authors
                  </div>
                </div>
                <div className="space-y-2 min-w-0">
                  <div className="text-lg sm:text-xl  font-bold text-accent break-words">
                    {new Date(chain[0]?.createDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-base-content/70">Started</div>
                </div>
              </div>
            </div>

            {/* Chapters List */}
            <div className="space-y-6">
              {chain.length > 0 ? (
                chain.map((chapter, index) => (
                  <div
                    key={index}
                    className="bg-base-100 rounded-2xl border border-base-300/50 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Chapter Header */}
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-4 border-b border-base-300/30">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                        <div className="flex-1">
                          <Link
                            href={`/chapter/${chapter.chapterId}`}
                            onClick={() => setMiddleColumn("chapter")}
                            className="group"
                          >
                            <h3 className="text-lg font-semibold text-primary group-hover:text-primary-focus transition-colors duration-200">
                              {validator.unescape(chapter.chapterTitle || "") ||
                                validator.unescape(chapter.storyTitle || "")}
                            </h3>
                          </Link>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3 text-sm">
                          <Link
                            href={`/profile/${chapter.authorName}`}
                            className="flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors duration-200 group"
                          >
                            <div className="avatar placeholder">
                              <div className="bg-primary text-primary-content rounded-full w-8 text-sm">
                                <span>
                                  {chapter.authorName.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <span className="font-medium group-hover:underline">
                              {chapter.authorName}
                            </span>
                          </Link>

                          <div className="flex items-center gap-1 text-base-content/60">
                            <span className="text-xs">
                              {new Date(
                                chapter.createDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chapter Content */}
                    <div className="p-6">
                      <div className="prose prose-lg max-w-none">
                        {processText(chapter.bodyText)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold text-base-content mb-2">
                    No Chapters Yet
                  </h3>
                  <p className="text-base-content/70 mb-6">
                    This story chain is waiting for its first chapter to be
                    written.
                  </p>
                  <Link
                    href={`/chapter/${chain[0]?.chapterId || id}`}
                    className="btn btn-primary gap-2"
                  >
                    <span>Start Writing</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </AccountPage>
  );
};

export default Chain;
