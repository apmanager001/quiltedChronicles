'use client'
import React from 'react'
import Link from 'next/link';
import useStore from '../../store/store';
import accountStore from '../../store/accountStore';
import FollowedAuthors from './comps/followedAuthors';
import Journal from './comps/journal';
import Chapters from './comps/chapters';

const Sidebar = () => {
  const user = useStore((state) => state.user);
  const setAuthorName = accountStore((state) => state.setAuthorName);
  const setMiddleColumn = accountStore((state) => state.setMiddleColumn);
  const setChapterId = accountStore((state) => state.setChapterId)
  if (!user) { 
    return (
      <div className='h-full w-full flex justify-center items-center'>
        <span className="text-center loading loading-spinner loading-lg text-accent"></span>
      </div>
   )}

  const handleAuthorSelect = () => {
    // When an author is clicked, set their name in the zustand store
    setMiddleColumn("profile")
    setAuthorName(user.userName);
  };
  const handleChapterSelect = () => {
    setMiddleColumn("chapter")
    setChapterId()
  }

  return (
    <div className="flex flex-col justify-start overflow-y-auto ">
      <ul className="menu rounded-box">
        <li className="text-xl">
          <Link href={`/profile/${user.userName}`}>{user.userName}</Link>
        </li>
        <li className="pl-2">
          <Link href="/createStory">Create a Story</Link>
        </li>
        <li className="pl-2">
          <Link href="/settings">Settings</Link>
        </li>
        <li className="pl-2">
          <Link href="/contact">Contact</Link>
        </li>
        <li className="pl-2">
          <Link href="/search">Search</Link>
        </li>
        {user.admin && (
          <li className="pl-2">
            <Link href="/admin">Admin</Link>
          </li>
        )}
      </ul>

      <div className="collapse collapse-arrow ">
        <input type="radio" name="accordion" defaultChecked />
        <div className="collapse-title text-l font-medium">Your Authors</div>
        <div className="collapse-content w-full">
          <FollowedAuthors />
        </div>
      </div>

      <div className="collapse collapse-arrow ">
        <input type="radio" name="accordion" />
        <div className="collapse-title text-l font-medium">Your Chapters</div>
        <div className="collapse-content">
          <Chapters />
        </div>
      </div>

      <div className="collapse collapse-arrow ">
        <input type="radio" name="accordion" />
        <div className="collapse-title text-l font-medium">Your Bookmarks</div>
        <div className="collapse-content">
          <Journal />
        </div>
      </div>
    </div>
  );
}

export default Sidebar