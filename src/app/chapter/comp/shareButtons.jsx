'use client'
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SocialIcon } from "react-social-icons";

const SharedButtons = ({ title }) => {
  const { id } = useParams();

  const link = encodeURI(window.location.href);
  const msg = encodeURIComponent("Check out this story on Quilted Chronicles!");
  const shareTitle = encodeURIComponent(title);
  return (
    <div className="flex gap-4 text-2xl p-2 bg-white rounded-xl">
      <div className="tooltip tooltip-bottom" data-tip="Share to Threads">
        <SocialIcon
          network="threads"
          style={{ height: 35, width: 35 }}
          url={`https://threads.net/intent/post?text=${msg}${link}`}
          target="_blank"
        />
      </div>
      <div className="tooltip tooltip-bottom" data-tip="Share to Facebook">
        <SocialIcon
          network="facebook"
          style={{ height: 35, width: 35 }}
          url={`https://www.facebook.com/share.php?u=${link}`}
          target="_blank"
        />
      </div>
      <div className="tooltip tooltip-bottom" data-tip="Share to Reddit">
        <SocialIcon
          network="reddit"
          style={{ height: 35, width: 35 }}
          url={`http://www.reddit.com/submit?url=${link}&title=${title}&text=${msg}`}
          target="_blank"
        />
      </div>
      <div className="tooltip tooltip-bottom" data-tip="Share to X">
        <SocialIcon
          network="x"
          style={{ height: 35, width: 35 }}
          url={`https://twitter.com/share?&text=${msg}&url=${link}`}
          target="_blank"
        />
      </div>
    </div>
  );
};

export default SharedButtons;
