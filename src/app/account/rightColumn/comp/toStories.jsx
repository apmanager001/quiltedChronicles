"use client";
import React, { useState, useEffect } from "react";
import accountStore from "@/app/store/accountStore";
import axiosInstance from "../../../../comps/utility/axios";
import Loading from "@/comps/utility/loading";
import validator from "validator";
import Link from "next/link";
import { Heart, User, BookOpen, Calendar, Sparkles } from "lucide-react";

const TopStories = () => {
  const setMiddleColumn = accountStore((state) => state.setMiddleColumn);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  const dateNoTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await axiosInstance.get(`/chapter`);
        if (!response.data) {
          return;
        }
        const filteredChapters = response.data.filter(
          (chapter) => chapter.chapterTitle === null
        );
        const sortedChapters = filteredChapters.sort(
          (a, b) => b.likes - a.likes
        );
        const topChapters = sortedChapters.slice(0, 3);
        setChapters(topChapters);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChapter();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-base-300">
        <BookOpen className="w-5 h-5 text-secondary" />
        <h3 className="text-lg font-bold text-base-content">Top Stories</h3>
        <div className="ml-auto">
          <Sparkles className="w-4 h-4 text-accent" />
        </div>
      </div>

      {/* Stories List */}
      <div className="space-y-4">
        {chapters.map((chapter, index) => (
          <div key={index} className="group">
            <div className="p-4 rounded-xl bg-base-200/50 hover:bg-base-200 transition-all duration-200 border border-transparent hover:border-base-300">
              {/* Story Title & Likes */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <Link
                  href={`/chapter/${chapter.chapterId}`}
                  onClick={() => setMiddleColumn("chapter")}
                  className="flex-1 group-hover:text-secondary transition-colors"
                >
                  <h4 className="font-semibold text-base leading-tight line-clamp-2">
                    {validator.unescape(chapter.storyTitle || "")}
                  </h4>
                </Link>

                {/* Likes Badge */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium min-w-fit">
                  <Heart className="w-3.5 h-3.5" />
                  <span>{chapter.likes || 0}</span>
                </div>
              </div>

              {/* Author & Date */}
              <div className="flex items-center justify-between text-sm">
                <Link
                  href={`/profile/${chapter.authorName}`}
                  className="flex items-center gap-2 text-base-content/70 hover:text-secondary transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium truncate max-w-24">
                    {chapter.authorName}
                  </span>
                </Link>

                <div className="flex items-center gap-1.5 text-base-content/60">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{dateNoTime(chapter.createDate)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="pt-2 text-right">
        <Link
          href="/search"
          className="text-sm text-secondary hover:text-secondary-focus transition-colors font-medium"
        >
          View more stories →
        </Link>
      </div>
    </div>
  );
};

export default TopStories;
