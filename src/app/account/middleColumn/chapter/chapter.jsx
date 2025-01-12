'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import useStore from "../../../store/store";
import accountStore from "../../../store/accountStore";
// import Toolbar from "./toolbar/toolbar";
import ChapterInd from "./comp/chapterInd";
// import NextStory from "./nextStory";
// import AddStory from "./addstory";
// import Chain from "./chain";

const Chapter = () => {
  const user = useStore((state) => state.user);
  const setChapterId = accountStore((state) => state.setChapterId);
  const [author, setAuthor] = useState("");
  const [activeTab, setActiveTab] = useState("Chapter");
  const [usersEntry, setUsersEntry] = useState(false);
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
      const usersEntry = user.userName === author;
      setUsersEntry(usersEntry);
    }
  }, [user, author]);

  return (
    <div className="flex flex-row justify-center min-h-screen md:min-h-full w-full gap-5 p-5">
      <div className="flex flex-col">
        <div
          role="tablist"
          className="tabs tabs-bordered flex flex-col md:flex-row  justify-between items-center p-3"
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

          {/* {usersEntry || !user ? (
            <div className="w-20"></div>
          ) : (
            <Toolbar entryId={id} />
          )} */}
        </div>
        <div className="flex-2 h-custom w-full">
          {visibleComponent === "Chapter" && (
            <div className="flex overflow-y-auto  min-h-full">
                <ChapterInd />
            </div>
          )}
          {/* {visibleComponent === "Next Story" && <NextStory />} */}
          {visibleComponent === "Create Story" &&
            (user ? (
              //   <AddStory />
              " "
            ) : (
              <Link href={`/login`}>
                <input
                  type="submit"
                  className="btn btn-accent"
                  value="Login to Start"
                />
              </Link>
            ))}
          {visibleComponent === "Story Chain" && <div>{/* <Chain /> */}</div>}
        </div>
      </div>
    </div>
  );
};

export default Chapter;
