'use client'
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import accountStore from "../../store/accountStore";
import axiosInstance from "../../../comps/utility/axios";
import AccountPage from "../../account/layout";

const Search = () => {
  const searchBoxRef = useRef(null);
  const setMiddleColumn = accountStore((state) => state.setMiddleColumn);
  const setAuthorName = accountStore((state) => state.setAuthorName);
  const setChapterId = accountStore((state) => state.setChapterId);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("chapters");
  const [sort, setSort] = useState("");
  const [cards, setCards] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("chapters");
  const [sortOrder, setSortOrder] = useState("o:D");
  const [stories, setStories] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedChapter(e.target.value);
    setFilter(e.target.value);
  };
  const handleCheckboxChange = (e) => {
    setStories(e.target.checked);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value === "new") {
      setSortOrder("o:D");
    } else if (value === "old") {
      setSortOrder("o:d");
    } else if (value === "likes") {
      setSortOrder("o:L");
    }
    setSort(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm && filter === "users") {
        try {
          const response1 = await axiosInstance.get("/user", {
            params: { regex: searchTerm, i: true },
            headers: { "Content-Type": "application/json" },
          });
          setCards(response1.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else if (searchTerm && filter === "chapters") {
        const addedSortSearch = searchTerm + " " + sortOrder;
        const storiesOnly = stories;
        try {
          const response2 = await axiosInstance.get("/chapter", {
            params: { search: addedSortSearch, storiesOnly: storiesOnly },
            headers: { "Content-Type": "application/json" },
          });
          setCards(response2.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setCards([]);
      }
    };
    fetchData();
  }, [searchTerm, filter, sort, sortOrder, stories]);

  const handleChapterSelect = (chapterId) => {
    setMiddleColumn("chapter");
    setChapterId(chapterId);
  };
  const handleAuthorSelect = (authorName) => {
    setMiddleColumn("profile");
    setAuthorName(authorName);
  };
  return (
    <AccountPage>
    <div className="flex flex-col w-full items-center p-4">
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full mb-4"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex flex-row gap-4 mb-4">
        <select
          className="select select-bordered"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="chapters">Chapters</option>
          <option value="users">Users</option>
        </select>
        <select
          className="select select-bordered"
          value={sort}
          onChange={handleSortChange}
          disabled={selectedChapter != "chapters"}
        >
          <option value="">Sort By</option>
          <option value="new">Newest</option>
          <option value="old">Oldest</option>
          <option value="likes">Most Likes</option>
        </select>
        <div
          className="tooltip tooltip-bottom flex flex-row jusify-center items-center gap-4"
          data-tip="Checked will only show chapters that are the beginning of a story"
        >
          <input
            type="checkbox"
            className="checkbox"
            name="stories"
            checked={stories}
            onChange={handleCheckboxChange}
            disabled={selectedChapter != "chapters"}
          />
          <label name="stories">Beginning Chapters</label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {filter === "users"
          ? cards.map((card, index) => (
              <div key={index} className="card bg-base-100 shadow-xl p-4">
                <Link
                  href="#"
                  onClick={() => handleAuthorSelect(card.userName)}
                >
                  <h2 className="card-title truncate">{card.userName}</h2>
                  <p>Email: {card.email || "not available"}</p>
                  <p>
                    Number of Chapters Written:{" "}
                    {card.publishedChapters?.length ?? 0}
                  </p>
                </Link>
              </div>
            ))
          : cards.map((card, index) => (
              <div
                key={index}
                className="card bg-base-100 w-72 h-24 shadow-xl p-4"
              >
                <Link
                  href="#"
                  onClick={() => handleChapterSelect(card.chapterId)}
                >
                  <h2 className="card-title truncate">
                    {card.chapterTitle || card.storyTitle}
                  </h2>
                  <p className="truncate">Author: {card.authorName}</p>
                  <p>Likes: {card.likes}</p>
                </Link>
              </div>
            ))}
      </div>
    </div>
    </AccountPage>
  );
};

export default Search;
