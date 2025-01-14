import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/userContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

import confetti from "canvas-confetti";

const Like = ({chapterId}) => {
    const { user } = useContext(UserContext);
    const [onLike, setOnlike] = useState(false);

    useEffect(() => {
      const fetchChapter = async () => {
        try {
          // Check if the chapterId is in user.likedChapters
          const liked = user.likedChapters.some(
            (chapter) => chapter.chapterId === chapterId
          );
          setOnlike(liked);
        } catch (error) {
          console.error("Failed to fetch chapter status:", error);
        }
      };

      if (user && chapterId) {
        fetchChapter();
      }
    }, [user, chapterId]);

  const handleLike = async () => {
    if(onLike === false) {
        const response = await axios.post(`/chapter/${chapterId}/like`);
        setOnlike(true);
        toast.success("Thank you for liking this chapter!");

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.3 },
        });

    } else {
        const response = await axios.delete(`/chapter/${chapterId}/like`);
        setOnlike(false)
        toast.success("You have removed your like from this chapter");
    }
    
  };

  return (
    <div className="tooltip tooltip-bottom" data-tip="Like this post">
      <button
        className={`btn bg-toolbarColor hover:bg-toolbarHover rounded-full text-xl ${
          onLike ? "text-green-400" : "text-slate-300"
        }`}
        onClick={handleLike}
      >
        <FontAwesomeIcon icon={faThumbsUp} />
      </button>
    </div>
  );
};

export default Like;
