"use client";
import React from "react";
import { usePathname } from "next/navigation";
import useStore from "../store/store";
import ExpandStore from "../store/expandStore";
import Sidebar from "./leftColumn/sidebar";
import NextStory from "./rightColumn/nextStory";
import TopChapters from "./rightColumn/comp/topChapters";
import TopStories from "./rightColumn/comp/toStories";
import Buttons from "./rightColumn/comp/chainButton";

const AccountPage = ({ children }) => {
  const expand = ExpandStore((state) => state.expand);
  const user = useStore((state) => state.user);
  const pathname = usePathname();

  // Cleaner styling classes
  const sidebarClass = `hidden lg:block w-64 xl:w-72 bg-base-100 rounded-2xl shadow-lg border border-base-300/50 overflow-hidden transition-all duration-300 ${
    expand ? "hidden" : ""
  }`;

  const mainContentClass =
    "flex-1 bg-base-100 rounded-2xl shadow-lg border border-base-300/50 overflow-hidden";

  const rightPanelClass = `w-full lg:w-80 xl:w-96 flex flex-col gap-4 transition-all duration-300 ${
    expand ? "hidden" : ""
  }`;

  const panelCardClass =
    "bg-base-100 rounded-2xl shadow-lg border border-base-300/50 overflow-hidden";

  const isChapterOrChain =
    pathname &&
    (pathname.startsWith("/chapter") || pathname.startsWith("/chain"));

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/50 to-base-300/30 p-4 lg:p-6 xl:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 xl:gap-8">
          {/* Left Sidebar */}
          {user && (
            <aside className={sidebarClass}>
              <div className="p-6">
                <Sidebar />
              </div>
            </aside>
          )}

          {/* Mobile Action Buttons */}
          {isChapterOrChain && (
            <div className="lg:hidden flex justify-center p-4 bg-base-100 rounded-2xl shadow-lg border border-base-300/50">
              <Buttons />
            </div>
          )}

          {/* Main Content Area */}
          <main className={mainContentClass}>
            <div className="p-6 lg:p-8">{children}</div>
          </main>

          {/* Right Panel */}
          <aside className={rightPanelClass}>
            {isChapterOrChain ? (
              <>
                {/* Action Buttons - Desktop */}
                <div className={`hidden lg:block ${panelCardClass}`}>
                  <div className="p-6">
                    <div className="flex gap-3 justify-center">
                      <Buttons />
                    </div>
                  </div>
                </div>

                {/* Next Story */}
                <div className={panelCardClass}>
                  <div className="p-6">
                    <NextStory />
                  </div>
                </div>

                {/* Top Chapters */}
                <div className={panelCardClass}>
                  <div className="p-6">
                    <TopChapters />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Top Chapters */}
                <div className={panelCardClass}>
                  <div className="p-6">
                    <TopChapters />
                  </div>
                </div>

                {/* Top Stories */}
                <div className={panelCardClass}>
                  <div className="p-6">
                    <TopStories />
                  </div>
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
