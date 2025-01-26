"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Expanded from "../../chain/comp/expand";
import validator from 'validator'
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
  const [tooltip, setTooltip] = useState("")
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
        if(!id){
          return null
        }
        const response = await axiosInstance.get(`/user`, {
          params: { regex: id },
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("Unable to get Author Information");
        }
        const user = response.data[0]
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
          <div className="flex flex-col md:flex-row w-full min-h-[600px] ">
            <div className="w-full md:w-1/3 flex flex-col justify-center md:justify-start">
              <div className="w-full flex flex-col items-center my-10">
                <div className="indicator text-center">
                  <span className="indicator-item  p-4">
                    {admin ? <LockandUnlock userId={userInfo.userId} /> : ""}
                  </span>
                  <span className="">
                    <User size={60} />
                  </span>
                </div>
                <div className="flex flex-col justify-center items-start  ">
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="text-3xl">{userInfo.userName}</p>
                    <FollowAuthor userId={userInfo.userId} />
                    <div
                      className="badge badge-primary tooltip tooltip-bottom"
                      data-tip={tooltip}
                    >
                      {title}
                    </div>
                    <div className="text-center">
                      <a href={`mailto:${userInfo.email}`}>
                        {userInfo.email || ""}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div>
                <ul className="menu menu-md rounded-box">
                  <li>
                    <a>md item 1</a>
                  </li>
                  <li>
                    <a>md item 2</a>
                  </li>
                </ul>
              </div> */}
            </div>
            <div className="flex flex-col justify-around w-full md:w-2/3 break-words">
              <div className="min-h-40">
                <h2 className="text-xl font-bold">Bio</h2>
                <div className="pl-7">
                  <p className="max-w-96">{bio}</p>
                </div>
              </div>
              <div className="min-h-40">
                <h2 className="text-xl font-bold">Chapters</h2>
                <div className="pl-7">
                  {chapters.length === 0 ? (
                    <span>No Chapters Yet</span>
                  ) : (
                    chapters.map((chapter, index) => (
                      <div key={index}>
                        <ul className="menu menu-s rounded-box max-w-96">
                          <li>
                            <Link
                              href={`/chapter/${chapter.chapterId}`}
                              onClick={() => setMiddleColumn("chapter")}
                            >
                              {validator.unescape(chapter.chapterTitle || "") ||
                                validator.unescape(chapter.storyTitle || "")}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </AccountPage>
  );
};

export default Profile;
