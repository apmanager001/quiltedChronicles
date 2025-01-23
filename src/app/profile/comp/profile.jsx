"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
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

        setUserInfo(response.data[0]);
        setChapters(response.data[0].publishedChapters);
        setBio(validator.unescape(response.data[0].bio) || "No Bio has been setup yet");
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
          <div className="flex flex-col w-full min-h-[600px] ">
            <div className="flex flex-col justify-center w-full py-4 md:py-20  md:flex-row">
              <div className="flex flex-col rounded h-full w-full  p-7">
                <div className="w-full flex flex-col md:flex-row items-center justify-center p-2 gap-6">
                  <div>
                    <User size={48} />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col justify-center items-start  ">
                      <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
                        <p className="text-3xl">{userInfo.userName}</p>
                        <FollowAuthor userId={userInfo.userId} />
                      </div>
                      {userInfo.email ? (
                        <p>{`You can reach me at : ${userInfo.email}`}</p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="flex flex-col justify-center items-end ">
                      {admin ? <LockandUnlock userId={userInfo.userId} /> : ""}
                    </div>
                  </div>
                </div>
                <div className="divider"></div>
                <div role="tablist" className="tabs tabs-bordered p-4">
                  <a
                    role="tab"
                    className={`tab ${activeTab === "bio" ? "tab-active" : ""}`}
                    onClick={() => handleContentChange("bio")}
                  >
                    Bio
                  </a>

                  <a
                    role="tab"
                    className={`tab ${
                      activeTab === "chapters" ? "tab-active" : ""
                    }`}
                    onClick={() => handleContentChange("chapters")}
                  >
                    Chapters
                  </a>
                </div>
                <div className="flex flex-col w-full break-words">
                  {activeContent === "bio" ? (
                    <div className="pl-7 pt-7">
                      <p>{bio}</p>
                    </div>
                  ) : (
                    <div className="pl-7">
                      {chapters.length === 0 ? (
                        <span>No Chapters Yet</span>
                      ) : (
                        chapters.map((chapter, index) => (
                          <div key={index}>
                            <ul className="menu menu-s rounded-box">
                              <li>
                                <Link
                                  href={`/chapter/${chapter.chapterId}`}
                                  onClick={() => setMiddleColumn("chapter")}
                                >
                                  {validator.unescape(
                                    chapter.chapterTitle || ""
                                  ) ||
                                    validator.unescape(
                                      chapter.storyTitle || ""
                                    )}
                                </Link>
                              </li>
                            </ul>
                          </div>
                        ))
                      )}
                    </div>
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
