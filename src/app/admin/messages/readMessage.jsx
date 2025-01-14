'use client'
import React, { useState } from "react";
import {toast} from 'react-hot-toast'
import axiosInstance from "../../../comps/utility/axios";

const ReadMessage = ({ readId, initialReadState }) => {
  const [isChecked, setIsChecked] = useState(initialReadState);

  const handleCheckboxChange = async (event) => {
    const newReadState = event.target.checked;
    setIsChecked(newReadState);

    try {
      await axiosInstance.put(`/admin/message/${readId}`, { read: newReadState });
      toast.success("Message marked as read or unread");
    } catch (error) {
      console.error("Error updating read status:", error);
    }
  };

  return (
    <div className='flex flex-row w-full justify-center items-center'>
        Mark as read
        <input
            className="checkbox ml-2"
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
        />
        
    </div>
  );
};

export default ReadMessage;
