"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../comps/utility/axios";
import Link from "next/link";
import { Heart, User } from "lucide-react";

const TopStories = () => {
  const [chapters, setChapters] = useState([]);

  const dateNoTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
console.log(chapters)
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
        const sortedChapters = filteredChapters.sort((a, b) => b.likes - a.likes);
        const topChapters = sortedChapters.slice(0, 3);
        setChapters(topChapters);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChapter();
  }, []);
  return (
    <div className="flex flex-col gap-4 mx-4">
      <h3 className="text-center">Top First Chapters in a Story</h3>
      {chapters.map((chapter, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Link href={`/chapter/${chapter.chapterId}`}>
              <h2>{chapter.chapterTitle || chapter.storyTitle}</h2>
            </Link>
            <p className="flex gap-2">
              <Heart color="red" fill="red" />
              {chapter.likes}
            </p>
          </div>
          <div className="flex justify-between">
            <Link
              href={`/profile/${chapter.authorName}`}
              className="flex gap-2"
            >
              <User />
              <span className="font-medium text-sm  text-left truncate">
                {chapter.authorName}
              </span>
            </Link>
            <span className="text-sm">{dateNoTime(chapter.createDate)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopStories;
