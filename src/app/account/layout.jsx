'use client'
import React from "react";
import { usePathname } from "next/navigation";
import useStore from "../store/store";
import Sidebar from "./leftColumn/sidebar";
import NextStory from "./rightColumn/nextStory";
import TopChapters from "./rightColumn/comp/topChapters";
import TopStories from "./rightColumn/comp/toStories";

const AccountPage = ({children}) => {
  const user = useStore((state) => state.user);
  const pathname = usePathname();

  const transition =
    "border-r border-b border-gray-500 hover:border-secondary bg-base-300 hover:shadow-xl rounded-xl transition-transform transform hover:scale-105 shadow-lg";
  const universalDiv =
    "border-r border-b border-gray-500 hover:border-secondary bg-base-300 hover:shadow-xl rounded-xl";
  return (
    <div className="flex flex-col lg:flex-row gap-4 p-6 xl:p-24 bg-gradient-to-b from-base-200 via-base-100 to-gray-100">
      {" "}
      {user ? (
        <div
          className={`hidden lg:block flex-2 max-w-60 xl:max-w-72 p-4 ${transition}`}
        >
          <Sidebar />
        </div>
      ) : (
        " "
      )}
      <main className={`flex-1 p-4 ${universalDiv}`}>{children}</main>
      <div className="flex-2 md:max-w-96 flex flex-col gap-2 ">
        {pathname && pathname.startsWith("/chapter") ? (
          <>
            <div
              className={`h-24 flex justify-center items-center w-full md:max-w-60 xl:max-w-96 p-4 ${universalDiv}`}
            >
              <div className="flex gap-2">
                <div>
                  <button className="btn btn-accent">Add a Chapter</button>
                </div>
                <div>
                  <button className="btn btn-accent">View Full Chain</button>
                </div>
              </div>
            </div>
            <div
              className={`flex-2 w-full md:max-w-60 xl:max-w-96 p-4 ${universalDiv}`}
            >
              <NextStory />
            </div>
            <div
              className={`flex-1 w-full md:max-w-60 xl:max-w-96 p-4 ${universalDiv}`}
            >
              <TopChapters />
            </div>
          </>
        ) : (
          <>
            <div className={`flex-1 w-full  xl:max-w-96 p-4 ${universalDiv}`}>
              <TopChapters />
            </div>
            <div className={`flex-1 w-full  xl:max-w-96 p-4 ${universalDiv}`}>
              <TopStories />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
