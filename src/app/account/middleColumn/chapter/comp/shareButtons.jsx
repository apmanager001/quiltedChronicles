'use client'
import React from "react";
import Link from "next/link";
import { Facebook } from "lucide-react";
// import { Link, useParams } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faSquareFacebook,
//   faSquareThreads,
//   faSquareReddit,
//   faSquareXTwitter,
// } from "@fortawesome/free-brands-svg-icons";

const SharedButtons = ({ title }) => {
//   const { id } = useParams();

  const link = encodeURI(window.location.href);
  const msg = encodeURIComponent("Check out this story on Quilted Chronicles!");
  const shareTitle = encodeURIComponent(title);
  return (
    <div className="flex gap-4 text-2xl p-2 bg-white rounded-xl">
      <Link
        href={`https://threads.net/intent/post?text=${msg}${link}`}
        target="_blank"
      >
        <div className="tooltip tooltip-bottom" data-tip="Share to Threads">
          {/* <FontAwesomeIcon
            icon={faSquareThreads}
            className="cursor-pointer text-black border-0 "
          /> */}
        </div>
      </Link>
      <Link
        href={`https://www.facebook.com/share.php?u=${link}`}
        target="_blank"
      >
        <div className="tooltip tooltip-bottom" data-tip="Share to Facebook">
          {/* <FontAwesomeIcon
            icon={faSquareFacebook}
            className="cursor-pointer text-facebook"
          /> */}
          <Facebook color="#316FF6" fill="#316FF6" />
        </div>
      </Link>
      <Link
        href={`http://www.reddit.com/submit?url=${link}&title=${title}&text=${msg}`}
        target="_blank"
      >
        <div className="tooltip tooltip-bottom" data-tip="Share to Reddit">
          {/* <FontAwesomeIcon
            icon={faSquareReddit}
            className="cursor-pointer text-reddit"
          /> */}
        </div>
      </Link>
      <Link
        href={`https://twitter.com/share?&text=${msg}&url=${link}`}
        target="_blank"
      >
        <div className="tooltip tooltip-bottom" data-tip="Share to X">
          {/* <FontAwesomeIcon
            icon={faSquareXTwitter}
            className="cursor-pointer text-black"
          /> */}
        </div>
      </Link>
    </div>
  );
};

export default SharedButtons;
