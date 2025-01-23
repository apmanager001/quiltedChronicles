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
    <div className="tooltip tooltip-left" data-tip='Delete this author'>
      <button className="btn btn-xs hover:btn-sm bg-red-500 hover:bg-red-500" onClick={handleDelete}>
        <UserMinus color='white' fill='white' size={16} strokeWidth={2}/>
      </button>
    </div>
  );
};

export default DeleteAuthor;