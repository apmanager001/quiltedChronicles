import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import validator from 'validator'
import useStore from "../../../store/store";
import accountStore from "../../../store/accountStore";
import MoreButton from "./more";

const Journal = () => {
  const user = useStore((state) => state.user);
  const setMiddleColumn = accountStore((state) => state.setMiddleColumn);
  const setChapterId = accountStore((state) => state.setChapterId);

  const [showMore, setShowMore] = useState(false);
  const [journal, setJournal] = useState([]);
    if (!user) {
    return (
        <span className="text-center loading loading-spinner loading-lg text-accent"></span>
    );
    }
  useEffect(() => {
    if (!user) return;
    setJournal(user.bookmarkedChapters || []);
  }, [user]);

  const topFiveChapters = journal.slice(0, 5);
  const remainingChapters = journal.slice(5);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const link = (journal) => `/chapter/${journal.chapterId}`;
  const name = (journal) => journal.chapterTitle || journal.storyTitle;

  return (
    <div>
      {journal.length === 0 ? (
        <span className="text-sm pl-4">No Bookmarks Yet</span>
      ) : (
        topFiveChapters.map((chapters, index) => (
          <div
            key={index}
            className="menu menu-xs justify-start rounded-box"
          >
              <li>
                <Link
                  href={`/chapter/${chapters.chapterId}`}
                  onClick={() => setMiddleColumn("chapter")}
                >
                  {validator.unescape(chapters.chapterTitle || "") ||
                    validator.unescape(chapters.storyTitle || "")}
                </Link>
              </li>
          </div>
        ))
      )}
      {remainingChapters.length > 0 && (
        <div>
          {showMore &&
            remainingChapters.map((journal, index) => (
              <div key={index} className="">
                <ul className="menu menu-xs justify-start rounded-box gap-2">
                  <li>
                    <Link
                      href={link(journal)}
                      onClick={() => setMiddleColumn("chapter")}
                    >
                      {name(journal)}
                    </Link>
                  </li>
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

export default Journal;
