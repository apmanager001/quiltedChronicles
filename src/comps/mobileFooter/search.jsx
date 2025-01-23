"use client";
import React, { useState } from "react";
import Link from "next/link";
import axiosInstance from "../utility/axios";
import { Search } from "lucide-react";
import { useRouter } from "next/router";

const SearchDrawer = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearchChange = async (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    // Simulate search results, replace with your actual search logic
    if (searchQuery.length > 0) {
       try {
            const response1 = await axiosInstance.get("/user", {
              params: { regex: query, i: true },
              headers: { "Content-Type": "application/json" },
            });
            const response2 = await axiosInstance.get('/chapter', {
              params: { search: query, storiesOnly:true, i: true },
              headers: { "Content-Type": "application/json" },
            });
            const limitedResults = [...response1.data.slice(0, 5), ...response2.data.slice(0, 5)];
            setResults(limitedResults);
            
           } catch (error) {
             console.error("Error fetching data:", error);
           }
         } else {
           setResults([]);
          
         }
  };
  const handleLink = () => {
    setResults([]);
    setIsOpen(false)
    setQuery("");
  };

  const handleSearchButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <button onClick={handleSearchButtonClick}>
        <Search size={24} />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 transform"
          onClick={handleOverlayClick}
        >
          <div
            className="fixed top-0 w-full bg-base-100 p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              className="w-full p-3 border border-gray-600 rounded-md mb-4"
              placeholder="Search..."
            />
            {results.length > 0 && <p className="text-gray-400">Users</p>}
            {results.map(
              (result, index) =>
                result.userName && (
                  <div key={index} className="p-1 pl-2 cursor-pointer">
                    <Link
                      href={`/profile/${result.userName}`}
                      onClick={handleLink}
                    >
                      {result.userName}
                    </Link>
                  </div>
                )
            )}
            {results.length > 0 && <p className="text-gray-400">Chapters</p>}
            {results.map(
              (result, index) =>
                result.chapterId && (
                  <div key={index} className="p-1 pl-2 cursor-pointer">
                    <Link
                      href={`/chapter/${result.chapterId}`}
                      onClick={handleLink}
                    >
                      {result.storyTitle}
                    </Link>
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDrawer;
