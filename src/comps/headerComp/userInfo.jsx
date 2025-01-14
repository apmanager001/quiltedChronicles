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
  return (
    <div className="relative">
      {user ? (
        <div className="flex items-center gap-4 mr-4">
          <button onClick={toggleDropdown} className="md:hidden">
            <Menu size={32} />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-10 right-0 mt-2 w-48 bg-base-200 border-x-2 border-b-2 border-gray-400 text-white p-4 rounded-b-xl shadow-md">
              <Link
                href={`/profile/${user.userName}`}
                onClick={toggleDropdown}
                className="flex items-center gap-2 my-2"
              >
                <User size={24} /> Profile
              </Link>
              <div className="drawer z-50">
                <input
                  id="my-drawer"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content flex gap-2">
                  <PanelLeftOpen />
                  <label htmlFor="my-drawer">Account Drawer</label>
                </div>
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <Drawer />
                </div>
              </div>
              <Link
                href="#"
                onClick={handleLogout}
                className="flex items-center gap-2 my-2"
              >
                <LogOut size={24} /> Logout
              </Link>
            </div>
          )}
          {/* Standard menu for larger screens */}
          <div className="hidden md:flex items-center gap-4">
            <Link href={`/profile/${user.userName}`}>
              <User size={32} />
            </Link>
            <Link href="#" onClick={handleLogout}>
              <LogOut size={24} />
            </Link>
          </div>
        </div>
      ) : (
        <Link href="/login">Sign In</Link>
      )}
    </div>
  );
}

export default UserInfo;