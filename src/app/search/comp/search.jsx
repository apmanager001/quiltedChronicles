'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import accountStore from "../../store/accountStore";
import axiosInstance from "../../../comps/utility/axios";
import AccountPage from "../../account/layout";
import { Heart } from "lucide-react";
import Expanded from "../../chain/comp/expand";

const Search = () => {
  const setMiddleColumn = accountStore((state) => state.setMiddleColumn);
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

  const sortedCards = cards.sort((a, b) => b.likes - a.likes);
  return (
    <AccountPage>
      <div className="flex flex-col w-full items-center p-4 min-h-[500px]">
        <div className="w-full flex gap-4 justify-between items-center">
          <label htmlFor="search" className="hidden"></label>
          <input
            type="text"
            placeholder="Search..."
            id="search"
            name="search"
            className="flex-grow input input-bordered "
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Expanded />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 my-4">
          <div className="flex gap-2">
            <select
              className="select select-bordered"
              value={filter}
              name="type"
              onChange={handleFilterChange}
            >
              <option value="chapters">Chapters</option>
              <option value="users">Users</option>
            </select>
            <select
              className="select select-bordered"
              value={sort}
              name="sort"
              onChange={handleSortChange}
              disabled={selectedChapter != "chapters"}
            >
              <option value="">Sort By</option>
              <option value="new">Newest</option>
              <option value="old">Oldest</option>
              <option value="likes">Most Likes</option>
            </select>
          </div>
          <div
            className="tooltip tooltip-bottom flex flex-row jusify-center items-center"
            data-tip="Checked will only show chapters that are the beginning of a story"
          >
            <input
              type="checkbox"
              className="checkbox"
              id="stories"
              name="stories"
              checked={stories}
              onChange={handleCheckboxChange}
              disabled={selectedChapter != "chapters"}
            />
            <label htmlFor="stories" name="stories" className="ml-2">
              Beginning Chapters
            </label>
          </div>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-4">
          {filter === "users"
            ? cards.map((card, index) => (
                <div key={index} className="card bg-base-100 shadow-xl p-4">
                  <Link
                    href={`/profile/${card.userName}`}
                  >
                    <h2 className="card-title truncate">{card.userName}</h2>
                    <p>Email: {card.email || "Not Available"}</p>
                    <p>
                      Number of Chapters Written:{" "}
                      {card.publishedChapters?.length ?? 0}
                    </p>
                  </Link>
                </div>
              ))
            : sortedCards.map((card, index) => (
                <div
                  key={index}
                  className="card bg-base-100 w-72 h-20 shadow-xl p-4"
                >
                  <Link
                    href={`/chapter/${card.chapterId}`}
                    onClick={() => setMiddleColumn("chapter")}
                  >
                    <h2 className="card-title truncate">
                      {card.chapterTitle || card.storyTitle}
                    </h2>
                    <p className="truncate flex justify-between">
                      Author: {card.authorName}
                      <span className="flex gap-2">
                        <Heart fill="red" color="red" /> {card.likes}
                      </span>
                    </p>
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </AccountPage>
  );
};

export default Search;
