"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import useStore from "../../store/store";
import Link from "next/link";
import { Share2 } from "lucide-react";
import { useParams } from "next/navigation";
import { Heart, ArrowBigLeft, Rewind } from "lucide-react";
import FollowAuthor from "../../profile/comp/followAuthor";
import SharedButtons from "./shareButtons";
import axiosInstance from "../../../comps/utility/axios";
import Toolbar from "./toolbar/toolbar";
import Loading from '../../../comps/utility/loading'
import MetaData from "./metadata";


const ChapterInd = () => {
  const user = useStore((state) => state.user);
  const { id } = useParams();
  const [chapter, setChapter] = useState("Loading...");
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
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

  
  return loading ? (
    <>
      {/* <Head>
        <title>{chapterTitle || storyTitle}</title>
        <meta name="description" content={body.slice(0, 150)} />
        <meta name="keywords" content={chapter.keywords.join(", ")} />
        <meta property="og:title" content={chapterTitle || storyTitle} />
        <meta property="og:description" content={body.slice(0, 150)} />
        <meta property="og:type" content="chapter" />
        <meta property="og:url" content={`/chapter/${id}`} />
      </Head> */}
      <MetaData
        description={body.slice(0, 150)}
        title={chapterTitle || storyTitle}
        keywords={chapter.keywords.join(", ")}
      />

      <div className="flex flex-col p-0 lg:pb-5 lg:h-full ">
        <div className="pl-2">
          <div className="flex flex-col items-start">
            <div className="w-full flex justify-between items-center pt-4 pr-4 gap-2">
              <div className="flex justify-center items-center gap-2 p-4 badge badge-neutral">
                <Heart color="red" fill="red" />
                {chapter.likes}
              </div>
              <div className="flex items-center gap-2">
                <Share2 />
                <SharedButtons title={chapterData.storyTitle} />
              </div>
            </div>
            <div className="flex items-center py-2 gap-2">
              <div className="text-sm">By:</div>
              <div className="font-bold text-red-500 pl-1">
                <Link
                  href={`/profile/${authorName}`}
                  onClick={() => handleAuthorSelect(authorName)}
                >
                  {authorName}
                </Link>
              </div>
              <div className="ml-2">
                {user && user.userName === authorName ? (
                  ""
                ) : (
                  <FollowAuthor userId={chapter.authorId} />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center py-2 gap-2">
            <div className="text-sm">Created on:</div>
            <div className="font-bold">{createDate}</div>
          </div>
          <div className="flex items-center py-2">
            <div className="flex items-center gap-2">
              <div className="text-sm">Main Story Title: </div>
              <div className="font-bold">{storyTitle}</div>
            </div>
          </div>
          <div className="flex items-center py-2">
            {chapterTitle && (
              <div className="flex items-center gap-2">
                <div className="text-sm">This Chapter Title:</div>
                <div className="font-bold">{chapterTitle}</div>
              </div>
            )}
          </div>
        </div>
        <div className="break-words text-wrap font-message text-2xl px-0 lg:px-4 py-4 border-t-2 border-slate-600">
          {paragraphs}
        </div>
        <div
          className={`flex items-center ${
            previousChapter ? "justify-around" : "justify-center"
          }  mt-auto`}
        >
          <div className="flex text-red-500">
            {previousChapter && (
              <div
                className="tooltip tooltip-right tooltip-accent"
                data-tip="Previous Chapter"
              >
                <Link href={`/chapter/${previousChapter}`}>
                  <ArrowBigLeft size={40} fill="red" />
                </Link>
              </div>
            )}
            {previousChapter && (
              <div
                className="tooltip tooltip-right tooltip-accent mr-10"
                data-tip="Jump to First Story"
              >
                <Link href={`/chapter/${storyId}`}>
                  <Rewind size={40} fill="red" />
                </Link>
              </div>
            )}
          </div>
          <Toolbar />
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ChapterInd;
