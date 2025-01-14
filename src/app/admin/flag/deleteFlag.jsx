'use client'
import React from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../comps/utility/axios";

const DeleteFlag = ({ deleteId, onDeleteFlag }) => {
  const handleDeleteFlag = async () => {
    if (window.confirm("Are you sure you want to delete this flag?")) {
      try {
        const response = await axiosInstance.delete(`/admin/flag/${deleteId}`);
        onDeleteFlag();
        toast.success("Flag removed from chapter");
        // You can add additional logic here, like updating the UI or notifying the user
      } catch (error) {
        toast.error("Error deleting flag:", error);
      }
    }
  };
  return (
    <button className='btn btn-error' onClick={handleDeleteFlag}>
      Delete Flag
    </button>
  );
};

export default DeleteFlag;
