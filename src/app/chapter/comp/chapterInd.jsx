"use client";
import React, { useState, useEffect } from "react";
import useStore from "../../store/store";
import validator from 'validator'
import Link from "next/link";
import { Share2 } from "lucide-react";
import { useParams } from "next/navigation";
import { Heart, ArrowBigLeft, Rewind, ClipboardCopy } from "lucide-react";
import Expanded from '../../chain/comp/expand'
import FollowAuthor from "../../profile/comp/followAuthor";
import SharedButtons from "./shareButtons";
import axiosInstance from "../../../comps/utility/axios";
import Toolbar from "./toolbar/toolbar";
import Loading from '../../../comps/utility/loading'
import toast from "react-hot-toast";

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
    const fetchChapter = async () => {
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
      .map((paragraph, index) => (
        <p key={index}>{validator.unescape(paragraph)}</p>
      ));

  function copyURL() {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("URL Copied!");
      })
      .catch((err) => {
        toast.error("Failed to copy the URL");
      });
  }
  
  return loading ? (
    <>
      <title>{chapter.chapterTitle || chapter.storyTitle}</title>
      <meta name="description" content={body.slice(0, 50)} />
      <meta name="keywords" content={chapter.keywords.join(", ")} />
      <div className="flex flex-col p-0 lg:pb-5 lg:h-full ">
        <div className="pl-2">
          <div className="flex flex-col items-start">
            <div className="w-full flex items-center justify-end"><Expanded /></div>
            <div className="w-full flex justify-between items-center pt-4 pr-4 gap-2">
              <div className="flex justify-center items-center gap-2 p-4 badge badge-neutral">
                <Heart color="red" fill="red" />
                {chapter.likes}
              </div>
              <div className="flex items-center gap-2">
                <Share2 />
              <div
                className="tooltip tooltip-bottom rounded-full h-[35px] w-[35px] hover:bg-base-100 flex justify-center items-center cursor-pointer"
                data-tip="Click to Copy URL"
                onClick={copyURL}
              >
                <ClipboardCopy />
              </div>
                <SharedButtons title={chapterData.storyTitle} />
              </div>
            </div>
            <div className="flex items-center py-2 gap-2">
              <div className="text-sm">By:</div>
              <div className="font-bold text-red-500 pl-1">
                <Link href={`/profile/${authorName}`}>{authorName}</Link>
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
              <div className="font-bold">{validator.unescape(storyTitle)}</div>
            </div>
          </div>
          <div className="flex items-center py-2">
            {chapterTitle && (
              <div className="flex items-center gap-2">
                <div className="text-sm">This Chapter Title:</div>
                <div className="font-bold">
                  {validator.unescape(chapterTitle)}
                </div>
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
                <Link
                  href={`/chapter/${previousChapter}`}
                  data-name="lastChapter"
                  aria-label="This link will take you to the last chapter in the story"
                >
                  <ArrowBigLeft size={40} fill="red" />
                </Link>
              </div>
            )}
            {previousChapter && (
              <div
                className="tooltip tooltip-right tooltip-accent mr-10"
                data-tip="Jump to First Story"
              >
                <Link
                  href={`/chapter/${storyId}`}
                  data-name="firstChapter"
                  aria-label="This link will take you to the first chapter in the story"
                >
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
