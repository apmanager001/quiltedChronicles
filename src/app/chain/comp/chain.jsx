'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import validator from 'validator'
import { useParams } from "next/navigation";
import axiosInstance from "../../../comps/utility/axios";
import AccountPage from "../../account/layout";
import ExpandStore from "../../store/expandStore";
import ShareButtons from "../../chapter/comp/shareButtons"
import { Share2, Expand, Minimize } from "lucide-react";
import Loading from '../../../comps/utility/loading'

const Chain = () => {
  const setExpand = ExpandStore((state) => state.setExpand);
  const expand = ExpandStore((state) => state.expand);
  const { id } = useParams();
  const [chain, setChain] = useState([]);
  const [storyTitle, setStoryTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/chain/${id}`);
        setChain(response.data);
        setStoryTitle(response.data[0].storyTitle);
        setLoading(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const processText = (text) => {
    return text
      .split("\n")
      .map((paragraph, index) => (
        <p key={index}>{validator.unescape(paragraph)}</p>
      ));
  };
  

  return (
    <AccountPage>
      {loading ? (
        <>
          {chain.length > 0 && (
            <>
              <title>{validator.unescape(chain[0].storyTitle)}</title>
              <meta
                name="description"
                content={validator.unescape(chain[0].bodyText).slice(0, 150)}
              />
              <meta name="keywords" content={chain[0].keywords.join(", ")} />
            </>
          )}
          <div className="mx-4">
            <div className="flex items-center justify-between">
              <h1 className="flex-grow text-center font-bold">Full Story Chain</h1>
              <div
                onClick={setExpand}
                className="bg-gray-700 hover:bg-gray-400 rounded-full p-2 font-extrabold"
              >
                {expand ? (
                  <Minimize strokeWidth={3} />
                ) : (
                  <Expand strokeWidth={3} />
                )}
              </div>
            </div>
            <h2 className="text-center py-5">
              {validator.unescape(storyTitle)}
            </h2>
            <div className="flex justify-center lg:justify-end  items-center gap-4 w-full mb-4">
              <Share2 size={32} />
              <ShareButtons title={storyTitle} />
            </div>
            {chain.map((chapter, index) => (
              <div
                key={index}
                className="flex gap-2 items-center w-full mb-5 p-2"
              >
                <div className="lg:w-1/3 hidden md:block pr-5 text-center">
                  <Link
                    href={`/chapter/${chapter.chapterId}`}
                    onClick={() => setMiddleColumn("chapter")}
                  >
                    <h3 className="hover:text-neutral text-sm">
                      {validator.unescape(chapter.chapterTitle || "") ||
                        validator.unescape(chapter.storyTitle || "")}
                    </h3>
                  </Link>
                  <Link href={`/profile/${chapter.authorName}`}>
                    <p className="hover:text-neutral">{chapter.authorName}</p>
                  </Link>
                  <p className="text-xs">
                    {new Date(chapter.createDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="lg:w-2/3">{processText(chapter.bodyText)}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </AccountPage>
  );
};

export default Chain;
