'use client'
import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import {User, Search} from "lucide-react";
import useStore from '../../app/store/store'
import toast from 'react-hot-toast';
import Drawer from './drawer'
import axiosInstance from '../utility/axios';

const UserInfo = () => {
  const user = useStore((state) => state.user);
  const validateSession = useStore((state) => state.validateSession);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
    useEffect(() => {
      validateSession();
    }, []);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  return (
    <div className="relative">
      {user ? (
        <div className="flex items-center gap-4 mr-4">
          {/* <button onClick={toggleDropdown} className="lg:hidden">
            <Menu size={32} />
          </button> */}
          {/* {isDropdownOpen && (
            <div className="absolute top-10 right-0 mt-2 w-48 bg-base-200 border-x-2 border-b-2 border-gray-400  p-4 rounded-b-xl shadow-md z-50">
              <Link
                href={`/profile/${user.userName}`}
                onClick={() => {
                  toggleDropdown();
                }}
                className="flex items-center gap-2 my-2"
                data-name="profile"
                aria-label="This link will take you to your profile"
              >
                <User size={24} /> Profile
              </Link>
              <div className="drawer z-50 ">
                <input
                  id="my-drawer"
                  type="checkbox"
                  className="drawer-toggle"
                  onChange={() => setIsDrawerOpen(!isDrawerOpen)}
                />
                <div className="drawer-content flex gap-2 cursor-pointer">
                  <PanelLeftOpen />
                  <label htmlFor="my-drawer">Dashboard</label>
                </div>
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <Drawer closeDrawer={closeDrawer} />
                </div>
              </div>
              <Link
                href="#"
                onClick={handleLogout}
                className="flex items-center gap-2 my-2"
                data-name="logout"
              >
                <LogOut size={24} /> Logout
              </Link>
            </div>
          )} */}
          <div className="flex items-center gap-4">
            <Link
              href={`/profile/${user.userName}`}
              data-name="profile"
              aria-label="This link will take you to your profile"
            >
              <User size={32} />
            </Link>
           
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center gap-4 mr-2 '>
        <Link href="/search" className="btn btn-ghost hidden lg:flex" aria-label='This link will take you to login page'>
          <Search />
        </Link>
        <Link href="/login" className="btn btn-ghost" aria-label='This link will take you to login page'>
          Sign In
        </Link>
        </div>
      )}
    </div>
  );
}

export default UserInfo;