"use client";
import React, { useState, useEffect } from "react";
import useStore from "../../store/store";
import validator from "validator";
import Link from "next/link";
import {
  Share2,
  Heart,
  ArrowBigLeft,
  Rewind,
  ClipboardCopy,
  Calendar,
  User,
  BookOpen,
  FileText,
} from "lucide-react";
import { useParams } from "next/navigation";
import Expanded from "../../chain/comp/expand";
import FollowAuthor from "../../profile/comp/followAuthor";
import SharedButtons from "./shareButtons";
import axiosInstance from "../../../comps/utility/axios";
import Toolbar from "./toolbar/toolbar";
import Loading from "../../../comps/utility/loading";
import toast from "react-hot-toast";

const ChapterInd = ({ onTitleChange }) => {
  const user = useStore((state) => state.user);
  const { id } = useParams();
  const [chapter, setChapter] = useState("Loading...");
  const [loading, setLoading] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);

  const [chapterData, setChapterData] = useState({
    authorName: "",
    body: "",
    chapterTitle: null,
    storyTitle: "",
    previousChapter: null,
    storyId: "",
    chapterId: "",
    createDate: "",
    continuationChapters: "",
  });

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await axiosInstance.get(`/chapter/${id}`);
        const {
          authorName,
          bodyText: body,
          chapterTitle,
          storyTitle,
          previousChapter,
          storyId,
          _id,
          createDate,
          continuationChapters,
        } = response.data;

        setChapter(response.data);
        const dateWithoutTime = new Date(createDate).toLocaleDateString();
        setChapterData({
          authorName,
          body,
          chapterTitle,
          storyTitle,
          previousChapter,
          storyId,
          chapterId: _id,
          createDate: dateWithoutTime,
          continuationChapters,
        });
        setLoading(true);

        // Notify parent component of title changes for SEO
        if (onTitleChange) {
          onTitleChange({
            chapterTitle,
            storyTitle,
            authorName,
            createDate: dateWithoutTime,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchChapter();
  }, [id, onTitleChange]);

  const {
    authorName,
    body,
    chapterTitle,
    storyTitle,
    previousChapter,
    storyId,
    chapterId,
    createDate,
    continuationChapters,
  } = chapterData;

  const paragraphs = body.split("\n").map((paragraph, index) => (
    <p key={index} className="mb-4 leading-relaxed">
      {validator.unescape(paragraph)}
    </p>
  ));

  function copyURL() {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("URL Copied!");
      })
      .catch((err) => {
        toast.error("Failed to copy the URL");
      });
  }

  const toggleShareDropdown = () => {
    setShowShareDropdown(!showShareDropdown);
  };

  return loading ? (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        {/* Story/Chapter Title with Expand Button */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold text-base-content mb-2">
              {chapterTitle
                ? validator.unescape(chapterTitle)
                : validator.unescape(storyTitle)}
            </h1>
            {chapterTitle && (
              <p className="text-lg text-base-content/70">
                Part of:{" "}
                <span className="font-semibold">
                  {validator.unescape(storyTitle)}
                </span>
              </p>
            )}
          </div>
          <div className="ml-4">
            <Expanded />
          </div>
        </div>

        {/* Meta Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Author Card */}
          <div className="bg-base-200/50 rounded-xl p-4 border border-base-300/50">
            <div className="flex flex-col xl:flex-row items-center justify-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-center">
                <p className="text-sm text-base-content/60 mb-1">Author</p>
                <Link
                  href={`/profile/${authorName}`}
                  className="font-semibold text-primary hover:text-primary-focus transition-colors"
                >
                  {authorName}
                </Link>
              </div>
              {user && user.userName !== authorName && (
                <FollowAuthor userId={chapter.authorId} />
              )}
            </div>
          </div>

          {/* Date Card */}
          <div className="bg-base-200/50 rounded-xl p-4 border border-base-300/50">
            <div className="flex flex-col xl:flex-row items-center justify-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Calendar className="w-5 h-5 text-secondary" />
              </div>
              <div className="text-center">
                <p className="text-sm text-base-content/60 mb-1">Created</p>
                <p className="font-semibold ">{createDate}</p>
              </div>
            </div>
          </div>

          {/* Likes Card */}
          <div className="bg-base-200/50 rounded-xl p-4 border border-base-300/50">
            <div className="flex flex-col xl:flex-row items-center justify-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Heart className="w-5 h-5 text-accent" fill="currentColor" />
              </div>
              <div className="text-center">
                <p className="text-sm text-base-content/60 mb-1">Likes</p>
                <p className="font-semibold">{chapter.likes || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {/* Share Button */}
            <div className="relative">
              <button
                onClick={toggleShareDropdown}
                className="btn btn-outline btn-primary gap-2 btn-sm lg:btn-md"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>

              {/* Share Dropdown */}
              {showShareDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-base-100 rounded-xl shadow-lg border border-base-300/50 p-3 min-w-[200px] z-10">
                  <div className="space-y-2">
                    <button
                      onClick={copyURL}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-base-200 transition-colors text-left"
                    >
                      <ClipboardCopy className="w-4 h-4" />
                      <span>Copy URL</span>
                    </button>
                    <SharedButtons title={chapterData.storyTitle} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            {previousChapter && (
              <>
                <Link
                  href={`/chapter/${previousChapter}`}
                  className="btn btn-outline btn-secondary gap-2 btn-sm lg:btn-md"
                  aria-label="Go to previous chapter"
                >
                  <ArrowBigLeft className="w-4 h-4" />
                  Previous
                </Link>
                <Link
                  href={`/chapter/${storyId}`}
                  className="btn btn-outline btn-accent gap-2 btn-sm lg:btn-md"
                  aria-label="Go to first chapter"
                >
                  <Rewind className="w-4 h-4" />
                  First
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-base-100 rounded-2xl border border-base-300/50 p-6 lg:p-8 mb-8">
        <div className="prose prose-lg max-w-none">{paragraphs}</div>
      </div>

      {/* Bottom Toolbar */}
      <div className="flex justify-center">
        <Toolbar />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ChapterInd;
