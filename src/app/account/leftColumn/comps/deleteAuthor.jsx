'use client'
import React from "react";
import axiosInstance from "../../../../comps/utility/axios";
import { UserMinus } from "lucide-react";
import { toast } from "react-hot-toast";

const DeleteAuthor = ({ id, onDeleteAuthor }) => {
  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/user/${id}/follow`);
      onDeleteAuthor();
      toast.success("Author Unfollowed");
      // You can add additional logic here, like updating the UI or notifying the user
    } catch (error) {
      console.log("Error deleting message:", error);
    }
  };
  return (
    <button className="btn btn-xs hover:btn-sm btn-error" onClick={handleDelete}>
      <UserMinus color='white' size={18} strokeWidth={2}/>
    </button>
  );
};

export default DeleteAuthor;