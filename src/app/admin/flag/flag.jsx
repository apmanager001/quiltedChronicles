'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "../../../comps/utility/axios";
import DeleteFlag from "./deleteFlag";
import DeleteChapter from "./deleteEntry";


const Flag = () => {
  const [flag, setFlag] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);

     useEffect(() => {
       axiosInstance
         .get("/admin/flag")
         .then((response) => {
           setFlag(response.data);
         })
         .catch((error) => {
           console.error("There was an error fetching the flags!", error);
         });
     }, [deleteFlag]);

     const formatDate = (dateString) => {
       const options = {
         year: "numeric",
         month: "2-digit",
         day: "2-digit",
         hour: "2-digit",
         minute: "2-digit",
       };
       const date = new Date(dateString);
       return date.toLocaleDateString("en-US", options).replace(",", "");
     };
     const toggleDeleteFlag = () => {
       setDeleteFlag((prevState) => !prevState);
     };
  return (
    <div className="flex flex-col md:flex-row md:justify-center items-center md:items-start flex-wrap h-screen-minus-65 gap-5 p-2">
      {flag.map((flag, index) => (
        <div
          key={index}
          className=" flex flex-col pb-2 bg-base-200 w-72 h-64 border border-slate-600 rounded-lg shadow-xl"
        >
          <div className="flex flex-row p-2">
            <div className="flex-1 flex w-1/2">Who Flagged:</div>
            <div className="flex-2 flex justify-center items-center text-center">
              {flag.user?.userName ?  (
              <Link href={`/profile/${flag.user.userName}`}>
                {flag.user.userName}
              </Link>
              ):('Anonymous')}
            </div>
          </div>
          <div className="flex flex-row p-2">
            <div className="flex-1 flex ">Chapter Title:</div>
            <div className="flex-2 flex justify-center items-center text-center">
              <Link href={`/chapter/${flag.chapter.id}`}>
                {flag.chapter.chapterTitle || flag.chapter.storyTitle}
              </Link>
            </div>
          </div>
          <div className="flex flex-row p-2">
            <div className="flex-1 flex text-left">Reason:</div>
            <div className="flex-2 flex justify-center items-center text-center">
              {flag.reason}
            </div>
          </div>
          <div className="flex flex-row p-2">
            <div className="flex-1 flex ">Date:</div>
            <div className="flex-2 flex justify-center items-center ">
              {flag.createDate
                ? formatDate(flag.createDate)
                : "No Date Available"}
            </div>
          </div>
          <div className="flex flex-row justify-center gap-2 mt-auto">
            <DeleteFlag deleteId={flag._id} onDeleteFlag={toggleDeleteFlag} />
            <DeleteChapter
              deleteChapterId={flag.chapter.id}
              deleteId={flag._id}
              onDeleteFlag={toggleDeleteFlag}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Flag;
