'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import validator from 'validator'
import { useParams } from "next/navigation";
import axiosInstance from "../../../comps/utility/axios";
import AccountPage from "../../account/layout";
import Expanded from "./expand";
import ShareButtons from "../../chapter/comp/shareButtons"
import { Share2, ClipboardCopy } from "lucide-react";
import Loading from '../../../comps/utility/loading'
import toast from "react-hot-toast";

const Chain = () => {
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
  
function copyURL() {
  const url = window.location.href;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      toast.success("URL Copied!");
    })
    .catch((err) => {
      toast.error("Failed to copy the URL");
    });
}
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
              <h1 className="flex-grow text-center font-bold">
                Full Story Chain
              </h1>
              <Expanded />
            </div>
            <h2 className="text-center py-5">
              {validator.unescape(storyTitle)}
            </h2>
            <div className="flex justify-center lg:justify-end  items-center gap-4 w-full mb-4">
              <Share2 />
              <div
                className="tooltip tooltip-bottom rounded-full h-[35px] w-[35px] hover:bg-base-100 flex justify-center items-center cursor-pointer"
                data-tip="Click to Copy URL"
                onClick={copyURL}
              >
                <ClipboardCopy />
              </div>
              <ShareButtons title={storyTitle} />
            </div>
            {chain.map((chapter, index) => (
              <div
                key={index}
                className="flex gap-2 items-center w-full mb-5 p-2"
              >
                <div className="lg:w-24 hidden md:block pr-5 text-center">
                  <Link
                    href={`/chapter/${chapter.chapterId}`}
                    onClick={() => setMiddleColumn("chapter")}
                  >
                    <h3 className="hover:underline text-sm">
                      {validator.unescape(chapter.chapterTitle || "") ||
                        validator.unescape(chapter.storyTitle || "")}
                    </h3>
                  </Link>
                  <Link href={`/profile/${chapter.authorName}`}>
                    <p className="hover:underline">{chapter.authorName}</p>
                  </Link>
                  <p className="text-xs">
                    {new Date(chapter.createDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="lg:w-full">{processText(chapter.bodyText)}</div>
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
