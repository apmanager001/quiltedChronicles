"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import useStore from "../../store/store";
import { useParams } from "next/navigation";
// import Toolbar from "./toolbar/toolbar";
import ChapterInd from "./chapterInd";
import AccountPage from "../../account/layout";
import AddChapter from "./addChapter";
import Chain from "./chain";

const Chapter = () => {
  const user = useStore((state) => state.user);
  
  const [author, setAuthor] = useState("");
  const [activeTab, setActiveTab] = useState("Chapter");
  const [usersChapter, setUsersChapter] = useState(false);
  const [visibleComponent, setVisibleComponent] = useState("Chapter");

  const handleContentChange = (component) => {
    setVisibleComponent(component);
    setActiveTab(component);
  };
  const handleAuthorChange = (newAuthor) => {
    setAuthor(newAuthor);
  };

  useEffect(() => {
    if (user && author) {
      const usersChapter = user.userName === author;
      setUsersChapter(usersChapter);
    }
  }, [user, author]);

  return (
    <AccountPage>
    <div className="flex flex-row justify-center min-h-screen md:min-h-full w-full gap-5 p-5">
      <div className="flex flex-col w-full">
        <div
          role="tablist"
          className="tabs tabs-bordered flex flex-row justify-between items-center p-3"
        >
          <Link
            href="#"
            role="tab"
            className={`tab ${activeTab === "Chapter" ? "tab-active" : ""}`}
            onClick={() => handleContentChange("Chapter")}
          >
            Chapter
          </Link>

          <Link
            href="#"
            role="tab"
            className={`tab ${
              activeTab === "Create Story" ? "tab-active" : ""
            }`}
            onClick={() => handleContentChange("Create Story")}
          >
            Add Chapter
          </Link>

          <Link
            href="#"
            role="tab"
            className={`tab ${activeTab === "Story Chain" ? "tab-active" : ""}`}
            onClick={() => handleContentChange("Story Chain")}
          >
            Story Chain
          </Link>
        </div>
        <div className="flex-2 flex justify-center items-center w-full">
          {visibleComponent === "Chapter" && (
            <div>
              <ChapterInd />
            </div>
          )}
          {visibleComponent === "Create Story" &&
            (user ? (
                    <AddChapter />
            ) : (
              <Link href={`/login`}>
                <input
                  type="submit"
                  className="btn btn-accent "
                  value="Login to Start"
                />
              </Link>
            ))}
          {visibleComponent === "Story Chain" && <div><Chain /></div>}
        </div>
      </div>
    </div>
    </AccountPage>
  );
};

export default Chapter;
