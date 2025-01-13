"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import useStore from "../../store/store";
import { User } from "lucide-react";
import AccountPage from "../../account/layout";
import LockandUnlock from "./lock";
import axiosInstance from "../../../comps/utility/axios";
import { useParams } from "next/navigation";
// import FollowAuthor from "../entrypage/followAuthor";
// import Dropdown from "./dropdown";

const Profile = () => {
  const user = useStore.getState().user;
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("bio");
  const [check, setCheck] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [bio, setBio] = useState("No Bio has been setup yet");
  const [entries, setEntries] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
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
        const response = await axiosInstance.get(`/user`, {
          params: { regex: id },
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("Unable to get Author Information");
        }

        setUserInfo(response.data[0]);
        setEntries(response.data[0].publishedChapters);
        setBio(response.data[0].bio || "No Bio has been setup yet");
        setLoading(false);
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
    <div className="flex flex-col w-full px-5 ">
      <div className="flex flex-col justify-center w-full py-4 md:py-20 min-h-full md:min-h-5/6 md:flex-row">
        <div className="flex flex-col rounded h-full w-full  p-7">
          <div className="w-full flex flex-col md:flex-row items-center justify-center border-b-2 p-2 gap-6">
            <div>
              <User size={48} />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col justify-center items-start min-w-1/3 ">
                <div className="flex flex-row justify-center items-center">
                  <p className="text-3xl">{userInfo.userName}</p>
                  {/* <FollowAuthor userId={userInfo.userId} /> */}
                </div>
                {userInfo.email ? (
                  <p>{`You can reach me at : ${userInfo.email}`}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="flex flex-col justify-center items-end min-w-1/3">
                {admin ? <LockandUnlock userId={userInfo.userId} /> : ""}
              </div>
            </div>
          </div>
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
              className={`tab ${activeTab === "chapters" ? "tab-active" : ""}`}
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
                {entries.length === 0
                  ? "No Entries Yet"
                  : entries.map((chapter, index) => (
                      <div key={index}>
                        <ul className="menu menu-s rounded-box">
                          <li>
                            <Link href={`/chapter/${chapter.chapterId}`}>
                              {chapter.chapterTitle || chapter.storyTitle}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </AccountPage>
  );
};

export default Profile;
