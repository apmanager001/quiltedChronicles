"use client";
import React, { useState, useEffect } from "react";
import accountStore from "@/app/store/accountStore";
import axiosInstance from "../../../../comps/utility/axios";
import Loading from "@/comps/utility/loading";
import validator from 'validator'
import Link from "next/link";
import { Heart, User } from "lucide-react";

const TopStories = () => {
  const setMiddleColumn = accountStore((state) => state.setMiddleColumn);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] =useState(true)

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
        const sortedChapters = filteredChapters.sort((a, b) => b.likes - a.likes);
        const topChapters = sortedChapters.slice(0, 3);
        setChapters(topChapters);
        setLoading(false)
      } catch (error) {
        console.error(error);
      }
    };
    fetchChapter();
  }, []);
  
  return (
    <>
    {loading ? (<Loading />) : (
    <div className="flex flex-col gap-4 mx-4">
      <h3 className="text-center font-bold">Top First Chapter in a Story</h3>
      {chapters.map((chapter, index) => (
        <div key={index} className="flex flex-col gap-2 ">
          <div className="flex justify-between items-center">
            <Link
              href={`/chapter/${chapter.chapterId}`}
              onClick={() => setMiddleColumn("chapter")}
            >
              <h2 className="btn btn-ghost btn-sm">
                {validator.unescape(chapter.chapterTitle || "") || validator.unescape(chapter.storyTitle || "")}
              </h2>
            </Link>
            <div className="flex justify-center items-center gap-2 p-4 badge badge-neutral">
              <Heart color="red" fill="red" />
              {chapter.likes}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Link
              href={`/profile/${chapter.authorName}`}
              className="flex gap-2 btn btn-ghost btn-sm"
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
  )}
  </>
  );
};

export default TopStories;
