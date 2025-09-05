'use client'
import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../../comps/utility/axios";
import useStore from "../../store/store";
import { toast } from "react-hot-toast";

const FollowAuthor = ({ userId }) => {
  const user = useStore.getState().user;
  const updateUser = useStore((state) => state.updateUser);
  const [removeButton, setRemoveButton] = useState(false)

  const handleFollow = async () => {
    try {
      const response = await axiosInstance.post(
        `/user/${userId}/follow`,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        setRemoveButton(true);
        updateUser()
        toast.success("Successfully followed the user!");
      } else {
        toast.error("Failed to follow the user.");
      }
    } catch (error) {
      toast.error(
        `Error: ${error.response ? error.response.data.message : error.message}`
      );
    }
  };
  return (
    <>      
      {user && !removeButton && userId != user.userId &&
      user.followedAuthors &&
      !user.followedAuthors.some((author) => author.userId === userId) ? (
        <input
          type="submit"
          className='btn btn-xs btn-accent'
          value="Follow this Author"
          onClick={handleFollow}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default FollowAuthor;
