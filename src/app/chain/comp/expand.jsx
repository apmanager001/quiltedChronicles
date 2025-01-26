'use client'
import React from 'react'
import ExpandStore from '../../store/expandStore';
import {Expand, Minimize } from "lucide-react";

const Expanded = () => {
    const setExpand = ExpandStore((state) => state.setExpand);
    const expand = ExpandStore((state) => state.expand);
  return (
    <div
        onClick={setExpand}
        className="hidden lg:block bg-gray-700 hover:bg-gray-400 rounded-full p-2 font-extrabold cursor-pointer"
    >
        {expand ? <Minimize strokeWidth={3} /> : <Expand strokeWidth={3} />}
    </div>
  );
}

export default Expanded