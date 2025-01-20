'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import useStore from "../../../store/store";
import validator from 'validator'
import accountStore from "../../../store/accountStore";
import { BookHeart, Heart } from "lucide-react";
import MoreButton from "./more";

const Chapters = () => {
  const user = useStore.getState().user;
  const setMiddleColumn = accountStore((state) => state.setMiddleColumn);
  const [showMore, setShowMore] = useState(false);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    if (!user) return;
    setChapters(user.publishedChapters);
  }, [user]);

  const topFiveChapters = chapters.slice(0, 5);
  const remainingChapters = chapters.slice(5);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const link = (entry) => `/entry/${entry.entryId}`;
  const name = (entry) => entry.entryTitle;

  return (
    <div>
      {chapters.length === 0
        ? <span className="text-sm pl-4">No chapters Yet</span>
        : topFiveChapters.map((chapters, index) => (
            <div key={index} className="menu menu-xs justify-start rounded-box">
              {chapters.previousEntry ? (
                  <li>
                    <Link
                      href={`/chapter/${chapters.chapterId}`}
                      onClick={() => setMiddleColumn("chapter")}
                    >
                      {chapters.entryTitle || chapters.storyTitle}
                    </Link>
                    <p className="flex items-center gap-2">
                      <Heart color="red" fill="red" />
                      {chapters.likes}
                    </p>
                  </li>
              ) : (
                  <li>
                    <Link
                      href={`/chapter/${chapters.chapterId}`}
                      onClick={() => setMiddleColumn("chapter")}
                      className="flex justify-between"
                    >
                      {validator.unescape(chapters.chapterTitle || '') || validator.unescape(chapters.storyTitle || '')}
                      <p className="flex items-center gap-2">
                        <Heart color="red" fill="red" />
                        {chapters.likes}
                      </p>
                    </Link>
                  </li>
                // </ul>
              )}
            </div>
          ))}
      {remainingChapters.length > 0 && (
        <div>
          {showMore &&
            remainingChapters.map((entry, index) => (
              <div key={index}>
                <ul className="menu menu-xs justify-start rounded-box gap-2">
                  {entry.previousEntry ? (
                    <li className="text-center">
                      <Link href={link(entry)}>{name(entry)}</Link>
                    </li>
                  ) : (
                    <li className="text-center">
                      <Link href={link(entry)}>
                        {name(entry)}
                        <BookHeart />
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          <div className="w-full flex justify-center">
            <MoreButton showMore={showMore} handleShowMore={handleShowMore} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chapters;
