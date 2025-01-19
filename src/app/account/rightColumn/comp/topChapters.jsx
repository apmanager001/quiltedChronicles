'use client'
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../comps/utility/axios";
import Link from "next/link";
import { Heart, User } from "lucide-react";

const TopChapters = () => {
     const [chapters, setChapters] = useState([]);

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
           const sortedChapters = response.data.sort(
             (a, b) => b.likes - a.likes
           );
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
      <h3 className="text-center font-bold">Top of all Chapters</h3>
      {chapters.map((chapter, index) => (
        <div key={index} className="flex flex-col gap-2 ">
          <div className="flex justify-between items-center gap-2">
            <Link
              href={`/chapter/${chapter.chapterId}`}
              onClick={() => setMiddleColumn("chapter")}
            >
              <h2 className="btn btn-ghost btn-sm  text-left">
                {chapter.chapterTitle || chapter.storyTitle}
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
              className="flex justify-center items-center gap-2 btn btn-ghost btn-sm"
            >
              <User />
              <span className="font-medium text-sm text-left truncate">
                {chapter.authorName}
              </span>
            </Link>
            <span className="text-sm">{dateNoTime(chapter.createDate)}</span>
          </div>
          {/* <div className="divider"></div> */}
        </div>
      ))}
    </div>
  );
}

export default TopChapters