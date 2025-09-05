"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Expanded from "../../chain/comp/expand";
import validator from "validator";
import useStore from "../../store/store";
import accountStore from "../../store/accountStore";
import Head from "next/head";
import { User } from "lucide-react";
import AccountPage from "../../account/layout";
import LockandUnlock from "./lock";
import axiosInstance from "../../../comps/utility/axios";
import { useParams } from "next/navigation";
import Loading from "../../../comps/utility/loading";
import FollowAuthor from "./followAuthor";

const Profile = () => {
  const user = useStore.getState().user;
  const setMiddleColumn = accountStore((state) => state.setMiddleColumn);
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("bio");
  const [title, setTitle] = useState("");
  const [tooltip, setTooltip] = useState("");
  const [check, setCheck] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [bio, setBio] = useState("No Bio has been setup yet");
  const [chapters, setChapters] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeContent, setActiveContent] = useState("bio");

  const handleContentChange = (tab) => {
    setActiveTab(tab);
    setActiveContent(tab);
  };
  useEffect(() => {
    if (user) {
      setCheck(user.userName);
      setAdmin(user.admin);
    } else {
      <span className="text-center loading loading-spinner loading-lg text-accent"></span>;
    }
  }, [user]);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        if (!id) {
          return null;
        }
        const response = await axiosInstance.get(`/user`, {
          params: { regex: id },
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("Unable to get Author Information");
        }
        const user = response.data[0];
        setUserInfo(user);
        if (user.publishedChapters.length < 5) {
          setTitle("Novice Author");
          setTooltip("Novice Author: Less than 5 chapters written");
        } else if (user.publishedChapters.length < 10) {
          setTitle("Aspiring Writer");
          setTooltip("Aspiring Writer: 5-9 chapters written");
        } else if (user.publishedChapters.length < 20) {
          setTitle("Emerging Storyteller");
          setTooltip("Emerging Storyteller: 10-19 chapters written");
        } else if (user.publishedChapters.length < 35) {
          setTitle("Dedicated Scribe");
          setTooltip("Dedicated Scribe: 20-34 chapters written");
        } else if (user.publishedChapters.length < 50) {
          setTitle("Talented Wordsmith");
          setTooltip("Talented Wordsmith: 35-49 chapters written");
        } else if (user.publishedChapters.length < 70) {
          setTitle("Skilled Narrator");
          setTooltip("Skilled Narrator: 50-69 chapters written");
        } else if (user.publishedChapters.length < 90) {
          setTitle("Prolific Author");
          setTooltip("Prolific Author: 70-89 chapters written");
        } else if (user.publishedChapters.length < 120) {
          setTitle("Accomplished Word Weaver");
          setTooltip("Accomplished Word Weaver: 90-119 chapters written");
        } else if (user.publishedChapters.length < 150) {
          setTitle("Master Storyteller");
          setTooltip("Master Storyteller: 120-149 chapters written");
        } else {
          setTitle("Literary Virtuoso");
          setTooltip("Literary Virtuoso: 150+ chapters written");
        }

        setChapters(user.publishedChapters);
        setBio(validator.unescape(user.bio) || "No Bio has been setup yet");
        setLoading(true);
      } catch (err) {
        console.error("Error:", err.message);
      }
    };

    handleSearch();
  }, [id]);

  if (!userInfo) {
    return (
      <div>
        We could not find a user by this name,<br></br> please go back and
        select another user
      </div>
    );
  }

  return (
    <AccountPage>
      {loading ? (
        <>
          <Head>
            <title>{id}</title>
            <meta name="description" content="User profile" />
            <meta property="og:title" content={id} />
            <meta property="og:description" content="User profile" />
            <meta property="og:type" content="profile" />
            <meta property="og:url" content={`/profile/${id}`} />
          </Head>
          <div className="w-full flex justify-end items-center">
            <Expanded />
          </div>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Profile Header - Spans Full Width */}
            <div className="bg-base-100 rounded-xl shadow-lg p-6 mb-6">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                {/* Profile Avatar with Admin Controls */}
                <div className="relative flex-shrink-0">
                  <div className="indicator">
                    {admin && (
                      <span className="indicator-item indicator-top indicator-end p-2">
                        <LockandUnlock userId={userInfo.userId} />
                      </span>
                    )}
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      <User size={40} className="text-primary" />
                    </div>
                  </div>
                </div>

                {/* User Info - Center Content */}
                <div className="flex-1 text-center lg:text-left space-y-3 min-w-0">
                  <h1 className="text-3xl font-bold text-base-content truncate">
                    {userInfo.userName}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
                    <FollowAuthor userId={userInfo.userId} />

                    <div
                      className="badge badge-primary badge-lg tooltip tooltip-bottom whitespace-normal"
                      data-tip={tooltip}
                    >
                      {title}
                    </div>
                  </div>

                  {userInfo.email && (
                    <div>
                      <a
                        href={`mailto:${userInfo.email}`}
                        className="text-base-content/70 hover:text-primary transition-colors break-all"
                      >
                        {userInfo.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content Area - Full Width */}
            <div className="space-y-6">
              {/* Bio Section */}
              <div className="bg-base-100 rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded"></div>
                  Bio
                </h2>
                <div className="prose prose-sm max-w-none">
                  <p className="text-base-content/80 leading-relaxed whitespace-pre-wrap">
                    {bio}
                  </p>
                </div>
              </div>

              {/* Chapters Section */}
              <div className="bg-base-100 rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded"></div>
                  Published Chapters
                  <span className="badge badge-primary badge-sm">
                    {chapters.length}
                  </span>
                </h2>

                {chapters.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-base-content/50 text-lg mb-2">📝</div>
                    <p className="text-base-content/60">
                      No chapters published yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {chapters.map((chapter, index) => (
                      <div
                        key={index}
                        className="group hover:bg-base-200 rounded-lg transition-colors"
                      >
                        <Link
                          href={`/chapter/${chapter.chapterId}`}
                          onClick={() => setMiddleColumn("chapter")}
                          className="block p-3 rounded-lg hover:shadow-sm transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-base-content font-medium truncate group-hover:text-primary transition-colors">
                                {validator.unescape(
                                  chapter.chapterTitle || ""
                                ) ||
                                  validator.unescape(chapter.storyTitle || "")}
                              </p>
                              {chapter.chapterTitle && chapter.storyTitle && (
                                <p className="text-sm text-base-content/60 truncate">
                                  from {validator.unescape(chapter.storyTitle)}
                                </p>
                              )}
                            </div>
                            <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <svg
                                className="w-4 h-4 text-base-content/40"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* </div> */}
        </>
      ) : (
        <Loading />
      )}
    </AccountPage>
  );
};

export default Profile;
