'use client'
import React, { useState, useEffect } from "react";
import useStore from "../store/store";
import Sidebar from "./leftColumn/sidebar";
import Settings from "./middleColumn/settings/comp/settings";
import Profile from "./middleColumn/profile/comp/profile";
import Contact from "./middleColumn/contact/comp/contact";
import Search from "./middleColumn/search/comp/search";
import accountStore from "../store/accountStore";
import Chapter from "./middleColumn/chapter/chapter";

const AccountPage = () => {
  const user = useStore.getState().user;
  const middleColumn = accountStore((state) => state.middleColumn); 
  const rightColumn = accountStore((state) => state.rightColumn);
  const validateSession = useStore((state) => state.validateSession)

  
  // useEffect(() => { 
  //   if (user) { 
  //     setSelectedAuthor(user.userName)
  //   }
  // },[user])
  

  useEffect(() => {
    validateSession();
  }, [validateSession]);
  
  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-2 min-h-screen bg-base-100 p-4 md:p-2 xl:p-32">
      <div className="hidden lg:block w-2/12 border-r border-b border-gray-500 hover:border-gray-300 bg-base-300  p-4  rounded-xl">
        <Sidebar />
      </div>
      <div className=" lg:w-8/12 border-r border-b border-gray-500 hover:border-gray-300 bg-base-300  p-4  rounded-xl">
        {middleColumn === "profile" ? (
          <div>
            <Profile />
          </div>
        ) : middleColumn === "settings" ? (
          <div>
            <Settings />
          </div>
        ) : middleColumn === "contact" ? (
          <div>
            <Contact />
          </div>
        ) : middleColumn === "admin" ? (
          <div>
            {/* <Contact /> */}
          </div>
        ) : middleColumn === "chapter" ? (
          <div>
            <Chapter />
          </div>
        ) : middleColumn === "search" ? (
          <div>
            <Search />
          </div>
        ) : (
          <div>
            <Profile />
          </div>
        )}
      </div>
      <div className="lg:w-2/12 border-r border-b border-gray-500 hover:border-gray-300 p-4 bg-base-300 rounded-xl">
        {rightColumn === "details1" ? (
          <p>Details for Option 1</p>
        ) : rightColumn === "details2" ? (
          <p>Details for Option 2</p>
        ) : (
          <p>Default Details</p>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
