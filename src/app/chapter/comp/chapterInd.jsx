"use client";
import React, { useState, useEffect, useContext } from "react";
import useStore from "../../store/store";
import AccountPage from "../../account/layout";
import Link from "next/link";
import { Share2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
// import FollowAuthor from "./followAuthor";
import SharedButtons from "./shareButtons";
import axiosInstance from "../../../comps/utility/axios";

const ChapterInd = () => {
  const user = useStore((state) => state.user);
  const { id } = useParams();
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

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await axiosInstance.get(`/chapter/${id}`);
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

  const handleAuthorSelect = (authorName) => {
    setMiddleColumn("profile");
    setAuthorName(authorName);
  };

  return (
    <AccountPage>
    <div className="flex flex-col p-5 md:p-0 md:pb-5 min-h-96 md:h-full border-b-2 border-slate-600 md:border-0">
      <div className="pl-2">
        <div className="flex flex-col items-start">
          <div className="w-full flex justify-end items-center pt-4 pr-4 gap-2">
            <Share2 />
            <SharedButtons title={entryData.storyTitle} />
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
            <Link href={`/chapter/${previousEntry}`}>Previous Entry</Link>
          </p>
        )}

        {previousEntry && (
          <Link href={`/chapter/${storyId}`}>Jump to first story</Link>
        )}
      </div>
    </div>
    <div>
      
    </div>
    </AccountPage>
  );
};

export default ChapterInd;
