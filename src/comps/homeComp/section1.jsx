'use client'
import React, { useState, useEffect } from "react";
import axiosInstance from "../utility/axios";
import Link from "next/link"
import {User} from 'lucide-react'
import Image from "next/image";


const Section = () => {
  const [chapter, setChapter] = useState("");
  const [chapter1, setChapter1] = useState("");
  const [chapter2, setChapter2] = useState("");
  const [chapter3, setChapter3] = useState("");
  const [loading, setLoading] = useState(true);

  const dateNoTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await axiosInstance.get(`/chapter`);
        if (!response.data) {
          return;
        }

        const data = response.data;
        if (typeof data === "object") {
          const keys = Object.keys(data);

          // Fetch first random chapter
          const randomKey1 = keys[Math.floor(Math.random() * keys.length)];
          let randomChapter1 = data[randomKey1];
          if (!Array.isArray(randomChapter1)) {
            randomChapter1 = [randomChapter1];
          }
          setChapter1(randomChapter1[0]);

          // Fetch second random chapter
          let randomKey2 = randomKey1;
          while (randomKey2 === randomKey1) {
            randomKey2 = keys[Math.floor(Math.random() * keys.length)];
          }
          let randomChapter2 = data[randomKey2];
          if (!Array.isArray(randomChapter2)) {
            randomChapter2 = [randomChapter2]; // Convert to array if not already
          }
          setChapter2(randomChapter2[0]);

          // Fetch third random chapter
          let randomKey3 = randomKey1;
          while (randomKey3 === randomKey1 || randomKey3 === randomKey2) {
            randomKey3 = keys[Math.floor(Math.random() * keys.length)];
          }
          let randomChapter3 = data[randomKey3];
          if (!Array.isArray(randomChapter3)) {
            randomChapter3 = [randomChapter3]; // Convert to array if not already
          }
          setChapter3(randomChapter3[0]);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchChapter();
  }, [chapter]);

  return (
    <div className="w-full h-full my-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-8 text-2xl">Top Adventures</h1>
        <div className="flex flex-col xl:flex-row flex-wrap gap-5 justify-center items-center w-full m-2 mb-20">
          <div className="flex flex-col bg-base-200 rounded-box w-80 md:max-w-96 hover:shadow-xl">
            <div className="rounded-t-box w-full h-72">
              <Image
                src="/icon1.jpeg"
                alt="Cover"
                width={350}
                height={200}
                className="w-full h-72 object-cover border-0 rounded-t-box"
              />
            </div>
            <div className="flex flex-col gap-6 p-6 ">
              <h3 className="text-secondary font-medium truncate">
                {Array.isArray(chapter1.keywords)
                  ? chapter1.keywords.join(" ")
                  : chapter1.keywords}
              </h3>
              <Link
                className="link link-hover text-xl font-bold truncate"
                href={`/chapter/${chapter1.chapterId}`}
              >
                {chapter1.chapterTitle || chapter1.storyTitle}
              </Link>
              <span className="line-clamp-3">{chapter1.bodyText || ""}</span>
              <div className="flex gap-2 justify-between items-center">
                <Link
                  className="btn btn-ghost truncate"
                  href={`/profile/${chapter2.authorName}`}
                >
                  <User />
                  <span className="font-medium text-sm  text-left truncate">
                    {chapter1.authorName}
                  </span>
                </Link>

                <span className="text-sm">
                  {dateNoTime(chapter1.createDate)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-base-200 rounded-box w-80 md:max-w-96 hover:shadow-xl">
            <div className="rounded-t-box w-full h-72">
              <Image
                src="/photo2.jpg"
                alt="Cover"
                width={350}
                height={200}
                className="w-full h-72 object-cover border-0 rounded-t-box"
              />
            </div>
            <div className="flex flex-col gap-6 p-6 ">
              <h3 className="text-secondary font-medium truncate">
                {Array.isArray(chapter2.keywords)
                  ? chapter2.keywords.join(" ")
                  : chapter2.keywords}
              </h3>
              <Link
                className="link link-hover text-xl font-bold truncate"
                href={`/chapter/${chapter2.chapterId}`}
              >
                {chapter2.chapterTitle || chapter2.storyTitle}
              </Link>
              <span className="line-clamp-3">{chapter2.bodyText || ""}</span>
              <div className="flex gap-2 justify-between items-center">
                <Link
                  className="btn btn-ghost"
                  href={`/profile/${chapter2.authorName}`}
                >
                  <User />
                  <span className="font-medium text-sm  text-left truncate">
                    {chapter2.authorName}
                  </span>
                </Link>

                <span className="text-sm">
                  {dateNoTime(chapter2.createDate)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-base-200 rounded-box w-80 md:max-w-96 hover:shadow-xl">
            <div className="rounded-t-box w-full h-72">
              <Image
                src="/bghp1.jpeg"
                alt="Cover"
                width={350}
                height={200}
                className="w-full h-72 object-cover border-0 rounded-t-box"
              />
            </div>
            <div className="flex flex-col gap-6 p-6 ">
              <h3 className="text-secondary font-medium truncate">
                {Array.isArray(chapter3.keywords)
                  ? chapter3.keywords.join(" ")
                  : chapter3.keywords}
              </h3>
              <Link
                className="link link-hover text-xl font-bold truncate"
                href={`/chapter/${chapter3.chapterId}`}
              >
                {chapter3.chapterTitle || chapter1.storyTitle}
              </Link>
              <span className="line-clamp-3">{chapter3.bodyText || ""}</span>
              <div className="flex gap-2 justify-between items-center w-full">
                <Link
                  className="btn btn-ghost"
                  href={`/profile/${chapter2.authorName}`}
                >
                  <User />
                  <span className="font-medium text-sm  text-left truncate">
                    {chapter3.authorName}
                  </span>
                </Link>

                <span className="text-sm">
                  {dateNoTime(chapter3.createDate)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
