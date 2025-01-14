import React, { useState, useEffect } from "react";
import ContentLoader from "react-content-loader";
import Like from "./likes";
import Flag from "./flag";
import Journal from "./journal";

const Toolbar = ({chapterId}) => {
  
  return (
    <div className="flex justify-end items-center">
      <div className="flex gap-3 justify-center items-center w-auto p-2 rounded-lg">
        {/* <ContentLoader
          animate={true}
          speed={2}
          width="100%"
          height="100%"
          viewBox="0 0 600 800"
        >
          <circle cx="400" cy="50" r="25" />
          <circle cx="460" cy="50" r="25" />
          <circle cx="520" cy="50" r="25" />
        </ContentLoader> */}
        <Like chapterId={chapterId} />
        <Journal chapterId={chapterId} />
        <Flag chapterId={chapterId} />
      </div>
    </div>
  );
};

export default Toolbar;
