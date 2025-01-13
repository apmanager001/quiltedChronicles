import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axiosInstance from "../../../comps/utility/axios";

const Chain = () => {
  const { id } = useParams();
  const [chain, setChain] = useState([]);
  const [storyTitle, setStoryTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/chain/${id}`);
        setChain(response.data);
        setStoryTitle(response.data[0].storyTitle);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
  const processText = (text) => {
    return text
      .split("\n")
      .map((paragraph, index) => <p key={index}>{paragraph}</p>);
  };

  return (
    <div className="mx-12">
      <h1 className="text-center py-5">{storyTitle}</h1>
      {chain.map((chapter, index) => (
        <div
          key={index}
          className="flex items-center w-full mb-5 p-2 border border-slate-600 rounded-xl"
        >
          <div className="flex-1 pr-5 text-center">
            <Link href={`/chapter/${chapter.chapterId}`}>
              <h3 className="hover:text-gray-600 text-sm">
                {chapter.chapterTitle || chapter.storyTitle}
              </h3>
            </Link>
            <Link href={`/profile/${chapter.authorName}`}>
              <p className="hover:text-gray-600">{chapter.authorName}</p>
            </Link>
            <p className="text-xs">{new Date(chapter.createDate).toLocaleDateString()}</p>
          </div>
          <div className="flex-2">{processText(chapter.bodyText)}</div>
        </div>
      ))}
    </div>
  );
};

export default Chain;
