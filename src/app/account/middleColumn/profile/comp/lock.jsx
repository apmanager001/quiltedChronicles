'use client'
import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../../../../comps/utility/axios";
import useStore from "../../../../store/store";
import { Lock, LockOpen } from "lucide-react";
import { toast } from "react-hot-toast";

const LockandUnlock = ({ userId }) => {
    const user = useStore((state) => state.user);
    const [lock, setLock] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user.admin === true) {
        try {
          const response = await axiosInstance.get(`/admin/user/${userId}`);
          setLock(response.data.locked);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []);

  const handleLock = async () => {
    if (lock === false) {
      const response = await axiosInstance.post(`/admin/user/${userId}/lock`);
      setLock(true);
      toast.success("This user is Locked");
    } else {
      const response = await axiosInstance.delete(`/admin/user/${userId}/lock`);
      setLock(false);
      toast.success("This user is unlocked");
    }
  };

  return (
    <div className="cursor-pointer">
      {lock ? (
        <Lock onClick={handleLock}/>
      ) : (
        <LockOpen onClick={handleLock}/>
      )}
    </div>
  );
};

export default LockandUnlock;
