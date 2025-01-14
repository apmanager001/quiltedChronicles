'use client'
import React, {useEffect} from "react";
import { usePathname } from "next/navigation";
import useStore from "../store/store";
import Sidebar from "./leftColumn/sidebar";
import NextStory from "./rightColumn/nextStory";
import Chain from "../chapter/comp/chain";
import AddChapter from "../chapter/comp/addChapter";
import TopChapters from "./rightColumn/comp/topChapters";
import TopStories from "./rightColumn/comp/toStories";

const AccountPage = ({children}) => {
  const user = useStore((state) => state.user);
  const pathname = usePathname();
  return (
    <div className="flex flex-col md:flex-row gap-2 p-4 xl:p-24">
      {user ? (
        <div className="hidden md:block flex-2 max-w-60 xl:max-w-96 border-r border-b border-gray-500 hover:border-gray-300 bg-base-300 hover:shadow-xl p-4 rounded-xl">
          <Sidebar />
        </div>
      ) : (
        " "
      )}
      <main className="flex-1 border-r border-b border-gray-500 hover:border-gray-300 bg-base-300 p-4 rounded-xl hover:shadow-xl">
        {children}
      </main>
      <div className="flex-2 min-w-96 flex flex-col gap-2">
        {pathname && pathname.startsWith("/chapter") ? (
          <>
            <div className="flex-1 border-r border-b w-full md:max-w-60 xl:max-w-96 border-gray-500 hover:border-gray-300 p-4 bg-base-300 rounded-xl hover:shadow-xl">
              <NextStory />
            </div>
            <div className="flex-2 border-r border-b w-full md:max-w-60 xl:max-w-96 border-gray-500 hover:border-gray-300 p-4 bg-base-300 rounded-xl hover:shadow-xl">
              <AddChapter />
            </div>
            <div className="flex-2 border-r border-b w-full md:max-w-60 xl:max-w-96 border-gray-500 hover:border-gray-300 p-4 bg-base-300 rounded-xl hover:shadow-xl">
              <Chain />
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 border-r border-b w-full md:max-w-60 xl:max-w-96 border-gray-500 hover:border-gray-300 p-4 bg-base-300 rounded-xl hover:shadow-xl">
              <TopChapters />
            </div>
            <div className="flex-2 border-r border-b w-full md:max-w-60 xl:max-w-96 border-gray-500 hover:border-gray-300 p-4 bg-base-300 rounded-xl hover:shadow-xl">
              <TopStories />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
