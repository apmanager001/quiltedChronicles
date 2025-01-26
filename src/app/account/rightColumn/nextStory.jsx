'use client'
import React, { useState, useEffect } from "react";
import validator from 'validator'
import Loading from "@/comps/utility/loading";
import { useParams } from "next/navigation";
import { Heart } from "lucide-react";
import accountStore from "../../store/accountStore";
import Link from "next/link";
import axiosInstance from "../../../comps/utility/axios";

const NextStory = () => {
  const setMiddleColumn = accountStore((state) => state.setMiddleColumn);
  const { id } = useParams();
  const [showMore, setShowMore] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

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

  
  const scrollToTop = () => {
    setMiddleColumn("add")
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <>
    {loading ? (<Loading /> ): (
    <div className="pl-2 pt-4 min-h-96 flex flex-col">
      <p className="text-xl font-bold">Continue the Story!</p>
      <ul className="pt-2  flex-grow">
        {chapters.length === 0 ? (
          <li className="pl-4">No Chapters Yet, be the first to create one</li>
        ) : (
          topFiveChapters.map((chapters, index) => (
            <li
              key={index}
              className="pt-2 flex justify-between items-center mr-10"
            >
              <Link
                href={`/chapter/${chapters.chapterId}`}
                onClick={() => setMiddleColumn("chapter")}
              >
                <button className="btn btn-ghost">
                  {validator.unescape(chapters.chapterTitle || "") ||
                    validator.unescape(chapters.storyTitle || "")}
                </button>
              </Link>
              <div className="flex justify-center items-center gap-2 p-4 badge badge-neutral">
                <Heart color="red" fill="red" />
                {chapters.likes}
              </div>
            </li>
          ))
        )}
        {remainingChapters.length > 0 && (
          <div>
            {showMore &&
              remainingChapters.map((chapter, index) => (
                <div key={index} className="pt-2 flex justify-around mr-10">
                  <Link
                    to={link(chapter)}
                    onClick={() => setMiddleColumn("chapter")}
                  >
                    <p>{name(chapter)}</p>
                  </Link>
                  <div className="flex justify-center items-center gap-2 p-4 badge badge-neutral">
                    <Heart color="red" fill="red" />
                    {chapters.likes}
                  </div>
                </div>
              ))}
            <button onClick={handleShowMore} className="btn mt-3">
              {showMore ? "Less" : "More"}
            </button>
          </div>
        )}
      </ul>
      <div className="lg:hidden flex justify-center">
        <button
          className="btn btn-accent"
          onClick={scrollToTop}
        >
          Add a Chapter
        </button>
      </div>
    </div>
    )}
    </>
  );
};

export default NextStory;
