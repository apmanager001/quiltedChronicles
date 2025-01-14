import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Like from "./likes";
import Flagged from "./flag";
import Journal from "./journal";

const Toolbar = ({chapterId}) => {
  const { id } = useParams();
  return (
    <div className="flex flex-col gap-4 justify-end items-center">
      <div className="flex gap-3 justify-center items-center w-auto p-2 rounded-lg">
        <Like chapterId={id} />
        <Journal chapterId={id} />
        <Flagged chapterId={id} />
      </div>
    
    </div>
  );
};

export default Toolbar;
