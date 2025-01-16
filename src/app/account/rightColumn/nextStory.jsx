'use client'
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Heart } from "lucide-react";
import Link from "next/link";
import axiosInstance from "../../../comps/utility/axios";

const NextStory = () => {
  const { id } = useParams();
  const [showMore, setShowMore] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  const chaptersArray = Array.isArray(chapters) ? chapters : [];
  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await axiosInstance.get(`/chapter/${id}`);
        if (!response.data || !response.data.continuationChapters) {
          setLoading(false);
          return;
        }
        let continuationChapters = response.data.continuationChapters;
        if (!Array.isArray(continuationChapters)) {
          continuationChapters = Object.values(continuationChapters);
        } 
        continuationChapters.sort((a, b) => b.likes - a.likes); 
        setChapters(continuationChapters); 
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchChapter();
  }, [id]);

  const topFiveChapters = chapters.slice(0, 5);
  const remainingChapters = chapters.slice(5);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const link = (chapter) => `/chapter/${chapter.chapterId}`;
  const name = (chapter) => chapter.chapterTitle;
  return (
    <div className="pl-2 pt-4 min-h-96 flex flex-col">
      <p className="text-xl font-bold">Continue the Story!</p>
      <ul className="pt-2 pl-2 flex-grow">
        {chapters.length === 0
          ? "No Chapters Yet"
          : topFiveChapters.map((chapters, index) => (
              <div key={index} className="pt-2 flex justify-around mr-10">
                <Link href={`/chapter/${chapters.chapterId}`}>
                  <button className="btn btn-ghost">
                    {chapters.chapterTitle || chapters.storyTitle}
                  </button>
                </Link>
                <p className="flex items-center gap-2">
                  <Heart color="red" fill="red" />
                  {chapters.likes}
                </p>
              </div>
            ))}
        {remainingChapters.length > 0 && (
          <div>
            {showMore &&
              remainingChapters.map((chapter, index) => (
                <div key={index} className="pt-2 flex justify-around mr-10">
                  <Link to={link(chapter)}>
                    <p>{name(chapter)}</p>
                  </Link>
                  <p className="flex items-center gap-2">
                    <Heart color="red" fill="red" />
                    {chapters.likes}
                  </p>
                </div>
              ))}
            <button onClick={handleShowMore} className="btn mt-3">
              {showMore ? "Less" : "More"}
            </button>
          </div>
        )}
      </ul>
      <div className="lg:hidden flex justify-center">
        <button className="btn btn-accent">Add a Chapter</button>
      </div>
    </div>
  );
};

export default NextStory;
