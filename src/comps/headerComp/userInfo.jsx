'use client'
import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import {User, LogOut, Menu, PanelLeftOpen} from "lucide-react";
import useStore from '../../app/store/store'
import toast from 'react-hot-toast';
import Drawer from './drawer'
import axiosInstance from '../utility/axios';

const UserInfo = () => {
  const user = useStore((state) => state.user);
  const validateSession = useStore((state) => state.validateSession);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout");
      window.location.href = "/login";
    } catch (error) {
      toast.error(error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
    useEffect(() => {
      validateSession();
    }, [validateSession]);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  return (
    <div className="relative">
      {user ? (
        <div className="flex items-center gap-4 mr-4">
          <button onClick={toggleDropdown} className="lg:hidden">
            <Menu size={32} />
          </button>
          {isDropdownOpen && (
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
          )}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={`/profile/${user.userName}`}
              data-name="profile"
              aria-label="This link will take you to your profile"
            >
              <User size={32} />
            </Link>
            <Link
              href="#"
              onClick={handleLogout}
              data-name="logout"
              aria-label="This link will log you out of your account. "
            >
              <LogOut size={24} />
            </Link>
          </div>
        </div>
      ) : (
        <Link href="/login" className="mr-2 btn btn-ghost" aria-label='This link will take you to login page'>
          Sign In
        </Link>
      )}
    </div>
  );
}

export default UserInfo;