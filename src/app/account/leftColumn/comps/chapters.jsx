'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import useStore from "../../../store/store";
import accountStore from "../../../store/accountStore";
import { BookHeart } from "lucide-react";
import MoreButton from "./more";

const Chapters = () => {
  const user = useStore.getState().user;
  const setMiddleColumn = accountStore((state) => state.setMiddleColumn);
  const setChapterId = accountStore((state) => state.setChapterId);
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

  const handleChapterSelect = (chapterId) => {
    setMiddleColumn("chapter");
    setChapterId(chapterId);
  };
  return (
    <div>
      {chapters.length === 0
        ? "No chapters Yet"
        : topFiveChapters.map((chapters, index) => (
            <div key={index}>
              {chapters.previousEntry ? (
                <ul className="menu menu-xs justify-start rounded-box gap-2">
                  <li className="text-center">
                    <Link
                      href="#"
                      onClick={() => handleChapterSelect(chapters.chapterId)}
                    >
                      {chapters.entryTitle || chapters.storyTitle}
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="menu menu-xs justify-start rounded-box gap-2">
                  <li className="text-center">
                    <Link
                      href="#"
                      onClick={() => handleChapterSelect(chapters.chapterId)}
                    >
                      {chapters.entryTitle || chapters.storyTitle}
                      <BookHeart />
                    </Link>
                  </li>
                </ul>
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
          <MoreButton showMore={showMore} handleShowMore={handleShowMore} />
        </div>
      )}
    </div>
  );
};

export default Chapters;
