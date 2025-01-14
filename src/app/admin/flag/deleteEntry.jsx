'use client'
import React from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../comps/utility/axios";

const DeleteChapter = ({deleteId, deleteChapterId, onDeleteFlag}) => {
  const handleDeleteChapter = async () => {
    if (window.confirm("Are you sure you want to delete this Chapter?")) {
      try {
        const response = await axiosInstance.delete(`/admin/chapter/${deleteChapterId}`);
        onDeleteFlag();
        toast.success("Chapter Deleted");
        // You can add additional logic here, like updating the UI or notifying the user
      } catch (error) {
        toast.error("Error deleting chapter:", error);
      }
    }
  };
  return (
    <button className='btn btn-error' onClick={handleDeleteChapter}>
      Delete Chapter
    </button>
  );
};

export default DeleteChapter;
