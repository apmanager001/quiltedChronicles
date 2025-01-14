'use client'
import React from 'react'
import Link from 'next/link';
import { Library, Bookmark, UserRoundPen, Pen, Settings, Lock, MessageSquareMore, Search, User } from 'lucide-react';
import useStore from '../../store/store';
import FollowedAuthors from './comps/followedAuthors';
import Journal from './comps/journal';
import Chapters from './comps/chapters';

const Sidebar = () => {
  const user = useStore((state) => state.user);
  if (!user) { 
    return (
      <div className='h-full w-full flex justify-center items-center'>
        <span className="text-center loading loading-spinner loading-lg text-accent"></span>
      </div>
   )}

  return (
    <div className="flex flex-col justify-start overflow-y-auto ">
      <ul className="menu rounded-box">
        <li className="text-xl">
          <Link href={`/profile/${user.userName}`}>
            <User />
            {user.userName}
          </Link>
        </li>
        <li className="pl-2">
          <Link href="/createStory">
            <Pen />
            Create a Story
          </Link>
        </li>
        <li className="pl-2">
          <Link href="/settings">
            <Settings />
            Settings
          </Link>
        </li>
        <li className="pl-2">
          <Link href="/contact">
            <MessageSquareMore />
            Contact
          </Link>
        </li>
        <li className="pl-2">
          <Link href="/search">
            <Search />
            Search
          </Link>
        </li>
        {user.admin && (
          <li className="pl-2">
            <Link href="/admin">
              <Lock />
              Admin
            </Link>
          </li>
        )}
      </ul>

      <div className="collapse collapse-arrow ">
        <input type="radio" name="accordion" />
        <div className="collapse-title text-l font-medium">
          <div className="flex gap-2">
            <UserRoundPen />
            Your Authors
          </div>
        </div>
        <div className="collapse-content w-full">
          <FollowedAuthors />
        </div>
      </div>

      <div className="collapse collapse-arrow ">
        <input type="radio" name="accordion" />
        <div className="collapse-title text-l font-medium">
          <div className="flex gap-2">
            <Library />
            Your Chapters
          </div>
        </div>
        <div className="collapse-content">
          <Chapters />
        </div>
      </div>

      <div className="collapse collapse-arrow ">
        <input type="radio" name="accordion" />
        <div className="collapse-title text-l font-medium">
          <div className="flex gap-2">
            <Bookmark />
            Your Bookmarks
          </div>
        </div>
        <div className="collapse-content">
          <Journal />
        </div>
      </div>
    </div>
  );
}

export default Sidebar