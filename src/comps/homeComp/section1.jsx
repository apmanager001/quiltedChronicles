"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "../utility/axios";
import Loading from "../utility/loading";
import Link from "next/link";
import { User } from "lucide-react";
import Image from "next/image";

const Section = () => {
  const [topChapters, setTopChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  const dateNoTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const fetchTopChapters = async () => {
      try {
        const response = await axiosInstance.get(`/chapter`);
        if (!response.data) {
          return;
        }

        const data = response.data;
        if (Array.isArray(data)) {
          // Sort chapters by likes in descending order
          const sortedChapters = data.sort((a, b) => b.likes - a.likes);

          // Get top 3 chapters
          const topThreeChapters = sortedChapters.slice(0, 3);

          setTopChapters(topThreeChapters);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopChapters();
  }, []);

  return (
    <>
    {loading ? ( 
      <Loading /> 
    ) : (
    <div className="w-full h-full my-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-8 text-2xl">Top Adventures</h1>
        <div className="flex flex-col xl:flex-row flex-wrap gap-5 justify-center items-center w-full m-2 mb-20">
          {topChapters.map((chapter, index) => (
            <div
              key={chapter.chapterId}
              className="flex flex-col bg-base-200 rounded-box w-80 md:max-w-96 hover:shadow-xl"
            >
              <div className="rounded-t-box w-full h-72">
                <Image
                  src={`/icon${index+1}.jpeg`}
                  alt="Cover"
                  width={350}
                  height={200}
                  className="w-full h-72 object-cover border-0 rounded-t-box"
                />
              </div>
              <div className="flex flex-col gap-6 p-6">
                <h3 className="text-secondary font-medium truncate">
                  {Array.isArray(chapter.keywords)
                    ? chapter.keywords.join(" ")
                    : chapter.keywords}
                </h3>
                <Link
                  className="link link-hover text-xl font-bold truncate"
                  href={`/chapter/${chapter.chapterId}`}
                >
                  {chapter.chapterTitle || chapter.storyTitle}
                </Link>
                <span className="line-clamp-3">{chapter.bodyText || ""}</span>
                <div className="flex gap-2 justify-between items-center">
                  <Link
                    className="btn btn-ghost truncate"
                    href={`/profile/${chapter.authorName}`}
                  >
                    <User />
                    <span className="font-medium text-sm text-left truncate">
                      {chapter.authorName}
                    </span>
                  </Link>

                  <span className="text-sm">
                    {dateNoTime(chapter.createDate)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}</>
  );
};

export default Section;
