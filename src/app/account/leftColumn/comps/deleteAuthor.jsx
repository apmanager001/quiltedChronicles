'use client'
import React from "react";
import axiosInstance from "../../../../comps/utility/axios";
import { UserMinus } from "lucide-react";
import { toast } from "react-hot-toast";

const DeleteAuthor = ({ id, onDeleteAuthor }) => {
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/user/${id}/follow`);
      onDeleteAuthor();
      toast.success("Author Unfollowed");
    } catch (error) {
      console.log("Error deleting message:", error);
    }
  };
  return (
    <button className="btn btn-xs hover:btn-sm bg-red-500 hover:bg-red-500" onClick={handleDelete}>
      <div className="tooltip tooltip-left" data-tip='Delete this author'>
        <UserMinus color='white' fill='white' size={16} strokeWidth={2}/>
      </div>
    </button>
  );
};

export default DeleteAuthor;