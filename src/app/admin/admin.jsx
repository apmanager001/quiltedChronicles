'use client'
import React, {useState} from 'react'
import Expanded from '../chain/comp/expand';
import Link from 'next/link';
import Flag from './flag/flag';
import Messages from './messages/messages';
import Stats from './stats/stats';
import AccountPage from '../account/layout';

const Admin = () => {
    const [visibleComponent, setVisibleComponent] = useState("Flag");
    const [activeTab, setActiveTab] = useState("Flag");

    const handleContentChange = (component) => {
      setVisibleComponent(component);
      setActiveTab(component);
    };


  return (
    <AccountPage>
      <div className="w-full min-h-96">
        <div className='flex justify-between items-center w-full gap-4'>
          <div role="tablist" className="tabs tabs-boxed flex-grow ">
            <Link
              href="#"
              role="tab"
              className={`tab ${activeTab === "Flag" ? "tab-active" : ""}`}
              onClick={() => handleContentChange("Flag")}
            >
              Flag
            </Link>
            <Link
              href="#"
              role="tab"
              className={`tab ${activeTab === "Messages" ? "tab-active" : ""}`}
              onClick={() => handleContentChange("Messages")}
            >
              Messages
            </Link>
            <Link
              href="#"
              role="tab"
              className={`tab ${activeTab === "Stats" ? "tab-active" : ""}`}
              onClick={() => handleContentChange("Stats")}
            >
              Stats
            </Link>
          </div>
          <Expanded />
        </div>
        <div>
          {visibleComponent === "Flag" && <Flag />}
          {visibleComponent === "Messages" && <Messages />}
          {visibleComponent === "Stats" && <Stats />}
        </div>
      </div>
    </AccountPage>
  );
}

export default Admin