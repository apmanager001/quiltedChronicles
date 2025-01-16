import React, { useState, useEffect, useContext } from "react";
import useStore from "../../../store/store";
import axiosInstance from "../../../../comps/utility/axios";
import toast from "react-hot-toast";
import { ThumbsUp } from "lucide-react";

import confetti from "canvas-confetti";

const Like = ({chapterId}) => {
    const user = useStore((state) => state.user);
    const [onLike, setOnlike] = useState(false);
    const [userChapter, setUserChapter] = useState(true);

    useEffect(() => {
      const fetchChapter = async () => {
        try {
          const liked = user.likedChapters.some(
            (chapter) => chapter.chapterId === chapterId
          );
          const userPublished = user.publishedChapters.some(
            (chapter) => chapter.chapterId === chapterId
          );
          setOnlike(liked)
          setUserChapter(userPublished)
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
       if(userChapter){
        toast.error("Unfortunately, you can't Like your own chapter");
      }else {
        await axiosInstance.post(`/chapter/${chapterId}/like`);
        setOnlike(true);
        toast.success("Thank you for liking this chapter!");
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.3 },
        });
      }
    } else {
        await axiosInstance.delete(`/chapter/${chapterId}/like`);
        setOnlike(false)
        toast.success("You have removed your like from this chapter");       
    }
    
  };
  
  return (
    <div className="tooltip tooltip-bottom" data-tip="Like this post">
      <button
        className="btn btn-ghost rounded-full text-xl"
        onClick={handleLike}
      >
        <ThumbsUp
          fill={onLike ? "#83f28f" : "none"}
          color={onLike ? "#83f28f" : "currentColor"}
        />
      </button>
    </div>
  );
};

export default Like;
