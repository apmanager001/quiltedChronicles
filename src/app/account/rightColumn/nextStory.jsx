'use client'
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
        const continuationChapters = response.data.continuationChapters;

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
    <div className="pl-2 pt-4">
        <p className="text-xl">Pick your next Story!</p>
        <ul className="pt-2 pl-2">
          {chapters.length === 0
            ? "No Chapters Yet"
            : topFiveChapters.map((chapters, index) => (
                <div key={index} className="pt-2">
                  <Link href={`/chapter/${chapters.chapterId}`}>
                    <button className="btn btn-ghost">{chapters.chapterTitle || chapters.storyTitle}</button>
                  </Link>
                </div>
              ))}
          {remainingChapters.length > 0 && (
            <div>
              {showMore &&
                remainingChapters.map((chapter, index) => (
                  <div key={index} className="pt-2">
                    <Link to={link(chapter)}>
                      <p>{name(chapter)}</p>
                    </Link>
                  </div>
                ))}
              <button onClick={handleShowMore} className="btn mt-3">
                {showMore ? "Less" : "More"}
              </button>
            </div>
          )}
        </ul>
    </div>
  );
};

export default NextStory;
