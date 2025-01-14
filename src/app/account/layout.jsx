'use client'
import React, {useEffect} from "react";
import useStore from "../store/store";
import Sidebar from "./leftColumn/sidebar";
import NextStory from "./rightColumn/nextStory";

const AccountPage = ({children}) => {
  const user = useStore((state) => state.user);
  
  return (
    <div className="flex flex-col md:flex-row gap-2 p-4">
      {user ? 
      <div className="hidden md:block flex-2 max-w-60 xl:max-w-96 border-r border-b border-gray-500 hover:border-gray-300 bg-base-300 p-4 rounded-xl">
        <Sidebar />
      </div>: " "}
      <main className="flex-1 border-r border-b border-gray-500 hover:border-gray-300 bg-base-300 p-4 rounded-xl">
        {children}
      </main>
      <div className="flex-2 border-r border-b w-full md:max-w-60 xl:max-w-96 border-gray-500 hover:border-gray-300 p-4 bg-base-300 rounded-xl">
        <NextStory />
      </div>
    </div>
  );
};

export default AccountPage;
