import React, { useState, useEffect, useContext } from "react";
import useStore from "../../../store/store";
import { Bookmark } from "lucide-react";
import axiosInstance from "../../../../comps/utility/axios";
import toast from "react-hot-toast";



const Journal = ({chapterId}) => {
    const user = useStore((state) => state.user);
    const [onHeart, setOnHeart] = useState(false);

    useEffect(() => {
      const fetchChapter = async () => {
        try {
          // Check if the chapterId is in user.likedChapters
          const journal = user.bookmarkedChapters.some(
            (journal) => journal.chapterId === chapterId
          );
          setOnHeart(journal);
        } catch (error) {
          console.error("Failed to fetch chapter status:", error);
        }
      };

      if (user && chapterId) {
        fetchChapter();
      }
    }, [user, chapterId]);

    const handleJournal = async () => {
      if (onHeart === false) {
        const response = await axiosInstance.post(`/chapter/${chapterId}/bookmark`);
        setOnHeart(true);
        toast.success("Thank you for adding this Bookmark!");

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.3 },
        });
      } else {
        const response = await axiosInstance.delete(`/chapter/${chapterId}/bookmark`);
        setOnHeart(false);
        toast.success("You have removed your bookmark from this chapter");
      }
    };


  return (
    <div
      className="tooltip tooltip-bottom"
      data-tip="Add chapter to your Bookmarks"
    >
      <button
        className={`btn hover:bg-toolbarHover rounded-full text-xl`}
        onClick={handleJournal}
      >
        <Bookmark
          fill={onHeart ? `#CC5500` : "none"}
          color={onHeart ? `#CC5500` : "currentColor"}
        />
      </button>
    </div>
  );
};

export default Journal;
