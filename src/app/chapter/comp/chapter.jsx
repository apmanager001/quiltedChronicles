"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import useStore from "../../store/store";
import accountStore from "../../store/accountStore";
import ChapterInd from "./chapterInd";
import AccountPage from "../../account/layout";
import AddChapter from "./addChapter";
import Chain from "./chain";

const Chapter = ({ onTitleChange }) => {
  const user = useStore((state) => state.user);
  const middleColumn = accountStore((state) => state.middleColumn);
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
      <div className="flex flex-row justify-center lg:min-h-full w-full gap-5 ">
        <div className="flex flex-col w-full">
          <div className="flex-2 flex justify-center items-center w-full">
            {middleColumn === "chapter" && (
              <div>
                <ChapterInd onTitleChange={onTitleChange} />
              </div>
            )}
            {middleColumn === "add" &&
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
            {middleColumn === "chain" && (
              <div>
                <Chain />
              </div>
            )}
          </div>
        </div>
      </div>
    </AccountPage>
  );
};

export default Chapter;
