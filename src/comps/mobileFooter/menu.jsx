'use client'
import React, {useState} from 'react'
import { Menu } from 'lucide-react';
import Sidebar from '@/app/account/leftColumn/sidebar';

const Menus = () => {
  return (
    <div className="drawer drawer-end z-50 w-14">
      <input
        id="menuDrawer"
        type="checkbox"
        className="drawer-toggle"
        // onChange={() => setIsDrawerOpen(!isDrawerOpen)}
      />
      <label className="drawer-content" htmlFor="menuDrawer">
        <Menu size={24} />
      </label>
      <div className="drawer-side">
        <label
          htmlFor="menuDrawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul
          className="menu bg-base-200 text-base-content min-h-full w-72 p-4"
          aria-label="close sidebar"
        >
          <Sidebar />
        </ul>
      </div>
    </div>
  );
}

export default Menus