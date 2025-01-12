'use client'
import React, { useState, useEffect, useContext } from "react";
import useStore from "../../../../store/store";
import accountStore from "../../../../store/accountStore";
import Link from "next/link";
import { Share2 } from "lucide-react";

// import FollowAuthor from "./followAuthor";
import SharedButtons from "./shareButtons";
import axiosInstance from "../../../../../comps/utility/axios";

const ChapterInd = ({ onAuthorChange }) => {
    const user = useStore((state) => state.user);
    const chapterId = accountStore((state) => state.chapterId);
    const [entry, setEntry] = useState("Loading...");
    const [loading, setLoading] = useState(true);

  const [entryData, setEntryData] = useState({
    authorName: "",
    body: "",
    entryTitle: null,
    storyTitle: "",
    previousEntry: null,
    storyId: "",
    entryId: "",
    createDate: "",
    continuationEntries: "",
  });
// console.log(setChapterId)
  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await axiosInstance.get(`/chapter/${chapterId}`);
        const {
          authorName,
          bodyText: body,
          entryTitle,
          storyTitle,
          previousEntry,
          storyId,
          _id,
          createDate,
          continuationEntries,
        } = response.data;

        setEntry(response.data);
        const dateWithoutTime = new Date(createDate).toLocaleDateString();
        setEntryData({
          authorName,
          body,
          entryTitle,
          storyTitle,
          previousEntry,
          storyId,
          entryId: _id,
          createDate: dateWithoutTime,
          continuationEntries,
        });
        setLoading(false);
        // onAuthorChange(authorName);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEntry();
  }, []);
  const {
    authorName,
    body,
    entryTitle,
    storyTitle,
    previousEntry,
    storyId,
    entryId,
    createDate,
    continuationEntries,
  } = entryData;

  const paragraphs = body
    .split("\n")
    .map((paragraph, index) => <p key={index}>{paragraph}</p>);

  return (
    <div className="flex flex-col p-5 md:p-0 md:pb-5 min-h-96 md:h-full border-b-2 border-slate-600 md:border-0">
      {loading ? (
        // <ContentLoader
        //   animate={true}
        //   speed={2}
        //   width="100%"
        //   height="100%"
        //   viewBox="0 0 600 800"
        // >
        //   {/* Author */}
        //   <rect x="10" y="20" rx="3" ry="3" width="60" height="7" />
        //   <rect x="80" y="20" rx="3" ry="3" width="100" height="7" />

        //   {/* Date */}
        //   <rect x="40" y="35" rx="3" ry="3" width="60" height="7" />
        //   <rect x="110" y="35" rx="3" ry="3" width="100" height="7" />

        //   {/* Main Story */}
        //   <rect x="80" y="50" rx="3" ry="3" width="60" height="7" />
        //   <rect x="150" y="50" rx="3" ry="3" width="150" height="7" />

        //   {/* Entry Title */}
        //   <rect x="80" y="65" rx="3" ry="3" width="60" height="7" />
        //   <rect x="150" y="65" rx="3" ry="3" width="150" height="7" />

        //   {/* Horizontal line */}
        //   <rect x="10" y="80" rx="0" ry="0" width="100%" height="1" />

        //   {/* Paragraph */}
        //   <rect x="150" y="90" rx="3" ry="3" width="400" height="7" />
        //   <rect x="150" y="105" rx="3" ry="3" width="400" height="7" />
        //   <rect x="150" y="120" rx="3" ry="3" width="400" height="7" />
        //   <rect x="150" y="135" rx="3" ry="3" width="400" height="7" />
        //   <rect x="150" y="150" rx="3" ry="3" width="400" height="7" />

        //   <rect x="150" y="165" rx="3" ry="3" width="400" height="7" />

        //   <rect x="150" y="180" rx="3" ry="3" width="400" height="7" />

        //   <rect x="150" y="195" rx="3" ry="3" width="400" height="7" />

        //   <rect x="150" y="210" rx="3" ry="3" width="400" height="7" />
        //   <rect x="150" y="225" rx="3" ry="3" width="400" height="7" />

        //   {/* Footer */}
        //   <rect x="150" y="270" rx="3" ry="3" width="100" height="7" />
        //   <rect x="400" y="270" rx="3" ry="3" width="100" height="7" />
        // </ContentLoader>
        ""
      ) : (
        <>
          <div className="pl-2">
            <div className="flex flex-col items-start">
              <div className="w-full flex justify-end items-center pt-4 pr-4">
                {/* <FontAwesomeIcon
                  icon={faShareNodes}
                  className="pr-4 text-2xl text-gray-600"
                /> */}
                <Share2 />
                <SharedButtons title={entryData.storyTitle} />
              </div>
              <div className="flex items-center py-2">
                <div>By:</div>
                <div className="text-red-500 pl-1">
                  <Link href={`/profile/${authorName}`}>{authorName}</Link>
                </div>
                <div>
                  {user && user.userName === authorName ? (
                    ""
                  ) : (
                    // <FollowAuthor userId={entry.authorId} />
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center py-2">
              <div>Created on:</div>
              <div className="text-red-500 pl-1">{createDate}</div>
            </div>
            <div className="flex items-center py-2">
              <div className="flex items-center">
                <div>Main Story Title: </div>
                <div className="text-red-500 pl-1">{storyTitle}</div>
              </div>
            </div>
            <div className="flex items-center py-2">
              {entryTitle && (
                <div className="flex items-center">
                  <div>This Entry Title:</div>
                  <div className="text-red-500 pl-1">{entryTitle}</div>
                </div>
              )}
            </div>
          </div>
          <div className="break-words text-wrap font-message text-2xl px-4 py-4 border-t-2 border-slate-600">
            {paragraphs}
          </div>
          <div className="flex items-center justify-around text-red-500 mt-auto">
            {previousEntry && (
              <p>
                <Link href={`/entry/${previousEntry}`}>Previous Entry</Link>
              </p>
            )}

            {previousEntry && (
              <Link href={`/entry/${storyId}`}>Jump to first story</Link>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ChapterInd;
