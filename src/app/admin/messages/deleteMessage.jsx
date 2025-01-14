'use client'
import React from 'react'
import {toast} from 'react-hot-toast'
import axiosInstance from '../../../comps/utility/axios';

const DeleteMessage = ({ deleteId, onDeleteMessage }) => {
    
  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/admin/message/${deleteId}`);
      onDeleteMessage()
      toast.success("Message Deleted")
      // You can add additional logic here, like updating the UI or notifying the user
    } catch (error) {
      toast.error("Error deleting message:", error);
      
    }
  };
  return <button className='btn btn-error' onClick={handleDelete}>Delete</button>;
};

export default DeleteMessage