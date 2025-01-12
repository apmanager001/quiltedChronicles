'use client'
import React from 'react'
import Link from 'next/link';
import {User, LogOut} from "lucide-react";
import useStore from '../../app/store/store'
import toast from 'react-hot-toast';
import axiosInstance from '../utility/axios';

const UserInfo = () => {
    const user = useStore((state) => state.user);

    const handleLogout = async () => {
      try {
        await axiosInstance.post("/logout");
        window.location.href = "/login";
      } catch (error) {
        toast.error(error);
      }
    };

  return (
    <div>
      {user ? (
        <div className='flex items-center gap-4 mr-4'>
            <Link href='/account'>
                <User size={32} />
            </Link>
            <Link href='#' onClick={handleLogout}>
                <LogOut size={24} />
            </Link>
          
        </div>
      ) : (
        <Link href='/login'>
          Sign In
        </Link>
      )}
    </div>
  );}

export default UserInfo