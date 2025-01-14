"use client";
import React, { useState, useEffect, useContext } from "react";
import useStore from "../../store/store";
import Link from "next/link";
import { Share2 } from "lucide-react";
import { useParams } from "next/navigation";
import { Heart } from "lucide-react";
// import FollowAuthor from "./followAuthor";
import SharedButtons from "./shareButtons";
import axiosInstance from "../../../comps/utility/axios";
import Toolbar from "./toolbar/toolbar";

const ChapterInd = () => {
  const user = useStore((state) => state.user);
  const { id } = useParams();
  const [chapter, setChapter] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  const [chapterData, setChapterData] = useState({
    authorName: "",
    body: "",
    chapterTitle: null,
    storyTitle: "",
    previousChapter: null,
    storyId: "",
    chapterId: "",
    createDate: "",
    continuationChapters: "",
  });

  useEffect(() => {
    const fetchChapter= async () => {
      try {
        const response = await axiosInstance.get(`/chapter/${id}`);
        const {
          authorName,
          bodyText: body,
          chapterTitle,
          storyTitle,
          previousChapter,
          storyId,
          _id,
          createDate,
          continuationChapters,
        } = response.data;

        setChapter(response.data);
        const dateWithoutTime = new Date(createDate).toLocaleDateString();
        setChapterData({
          authorName,
          body,
          chapterTitle,
          storyTitle,
          previousChapter,
          storyId,
          chapterId: _id,
          createDate: dateWithoutTime,
          continuationChapters,
        });
        setLoading(false);
        // onAuthorChange(authorName);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChapter();
  }, []);
  const {
    authorName,
    body,
    chapterTitle,
    storyTitle,
    previousChapter,
    storyId,
    chapterId,
    createDate,
    continuationChapters,
  } = chapterData;

  const paragraphs = body
    .split("\n")
    .map((paragraph, index) => <p key={index}>{paragraph}</p>);
  return (
    <>
      <div className="flex flex-col p-5 md:p-0 md:pb-5 min-h-96 md:h-full ">
        <div className="pl-2">
          <div className="flex flex-col items-start">
            <div className="w-full flex justify-between items-center pt-4 pr-4 gap-2">
              <p className="flex items-center gap-2">
                <Heart color="red" fill="red" />
                {chapter.likes}
              </p>
              <div className="flex items-center gap-2">
              <Share2 />
              <SharedButtons title={chapterData.storyTitle} />
              </div>
            </div>
            <div className="flex items-center py-2">
              <div>By:</div>
              <div className="text-red-500 pl-1">
                <Link href="#" onClick={() => handleAuthorSelect(authorName)}>
                  {authorName}
                </Link>
              </div>
              <div>
                {user && user.userName === authorName
                  ? ""
                  : // <FollowAuthor userId={entry.authorId} />
                    ""}
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
            {chapterTitle && (
              <div className="flex items-center">
                <div>This Chapter Title:</div>
                <div className="text-red-500 pl-1">{chapterTitle}</div>
              </div>
            )}
          </div>
        </div>
        <div className="break-words text-wrap font-message text-2xl px-4 py-4 border-t-2 border-slate-600">
          {paragraphs}
        </div>
        <div className="flex items-center justify-around text-red-500 mt-auto">
          {previousChapter && (
            <p>
              <Link href={`/chapter/${previousChapter}`}>Previous Entry</Link>
            </p>
          )}
          <Toolbar />
          {previousChapter && (
            <Link href={`/chapter/${storyId}`}>Jump to first story</Link>
          )}
        </div>
      </div>
      <div></div>
    </>
  );
};

export default ChapterInd;
