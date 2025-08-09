'use client'
import React, {useId} from 'react'
import Link from 'next/link';
import axiosInstance from '@/comps/utility/axios';
import toast from 'react-hot-toast';
import { Library, Bookmark, UserRoundPen, Pen, Settings, Lock, MessageSquareMore, Search, User, LogOut } from 'lucide-react';
import useStore from '../../store/store';
import FollowedAuthors from './comps/followedAuthors';
import Journal from './comps/journal';
import Chapters from './comps/chapters';
import Loading from '@/comps/utility/loading';

const Sidebar = ({ closeDrawer }) => {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);

  const id = useId()
  if (!user) {
    return (
      // <Loading />
      <Link href='/login' className='flex h-[500px] justify-center items-center'>
        <div className='btn btn-accent'>
          Login
        </div>
      </Link>
    );
  }

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout");
      logout()
      window.location.href = "/login";
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-start overflow-y-auto">
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
        <li className="pl-2">
          <Link
            href="#"
            className="hover:bg-red-600 hover:text-white"
            onClick={handleLogout}
            data-name="logout"
            aria-label="This link will log you out of your account. "
          >
            <LogOut />
            Logout
          </Link>
        </li>
        {user.admin && (
          <li className="pl-2">
            <Link 
              href="/admin"
              className='hover:bg-yellow-300 hover:text-black hover:font-bold'
            >
              <Lock />
              Admin
            </Link>
          </li>
        )}
      </ul>

      <div className="collapse collapse-arrow ">
        <label htmlFor={`authors-${id}`} className="sr-only">
          Authors
        </label>
        <input type="radio" id={`authors-${id}`} name="accordion" />
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
        <label htmlFor={`chapters-${id}`} className="sr-only">
          Chapters
        </label>
        <input type="radio" id={`chapters-${id}`} name="accordion" />
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
        <label htmlFor={`journal-${id}`} className="sr-only">
          Journal
        </label>
        <input type="radio" id={`journal-${id}`} name="accordion" />
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
};

export default Sidebar