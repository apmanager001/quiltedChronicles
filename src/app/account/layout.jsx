'use client'
import React from "react";
import { usePathname } from "next/navigation";
import useStore from "../store/store";
import Sidebar from "./leftColumn/sidebar";
import NextStory from "./rightColumn/nextStory";
import TopChapters from "./rightColumn/comp/topChapters";
import TopStories from "./rightColumn/comp/toStories";
import Buttons from "./rightColumn/comp/chainButton";


const AccountPage = ({children}) => {
  const user = useStore((state) => state.user);
  const pathname = usePathname();

  const transition =
    "lg:border-r lg:border-b border-gray-500 hover:border-neutral bg-base-300 hover:shadow-xl lg:rounded-xl transition-transform transform hover:scale-105 lg:shadow-lg";
  const universalDiv =
    "lg:border-r lg:border-b border-gray-500 hover:border-neutral bg-base-300 hover:shadow-xl lg:rounded-xl";
  return (
    <div className="flex flex-col lg:flex-row lg:gap-4 lg:p-6 xl:p-12 bg-gradient-to-b from-base-100 via-base-100 to-neutral">
      {user ? (
        <div
          className={`hidden lg:block flex-2 max-w-60 xl:max-w-72 p-4 ${transition}`}
        >
          <Sidebar />
        </div>
      ) : (
        " "
      )}
      {pathname && pathname.startsWith("/chapter") ? (
      <div className="lg:hidden flex justify-center gap-2 p-4 bg-base-300 rounded-xl ">
        <Buttons />
      </div>
       ) : ("")}
      <main className={`flex-1 p-4 ${universalDiv}`}>{children}</main>
      <div className="flex-2 w-full lg:max-w-96 flex flex-col lg:gap-2 ">
        {pathname && pathname.startsWith("/chapter") ? (
          <>
            <div
              className={`hidden lg:flex justify-center items-center w-full xl:max-w-96 p-4 ${universalDiv}`}
            >
              <div className="flex gap-2">
                  <Buttons />
              </div>
            </div>
            <div
              className={`flex-2 w-full xl:max-w-96 p-4 ${universalDiv}`}
            >
              <NextStory />
            </div>
            <div
              className={`flex-1 w-full xl:max-w-96 p-4 ${universalDiv}`}
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
