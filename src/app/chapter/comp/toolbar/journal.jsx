import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";


const Journal = ({chapterId}) => {
    const { user } = useContext(UserContext);
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
        const response = await axios.post(`/chapter/${chapterId}/bookmark`);
        setOnHeart(true);
        toast.success("Thank you for adding this Bookmark!");

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.3 },
        });
      } else {
        const response = await axios.delete(`/chapter/${chapterId}/bookmark`);
        setOnHeart(false);
        toast.success("You have removed your bookmark from this chapter");
      }
    };

    // const handleHeart = () => {
    //   setOnHeart(true);
    //   toast.success("Thank you for bookmarking this chapter!");
    // };


  return (
    <div
      className="tooltip tooltip-bottom"
      data-tip="Add chapter to your Bookmarks"
    >
      <button
        className={`btn bg-toolbarColor hover:bg-toolbarHover rounded-full text-xl  ${
          onHeart ? "text-red-600" : "text-slate-300"
        }`}
        onClick={handleJournal}
      >
        <FontAwesomeIcon icon={faBookmark} />
      </button>
    </div>
  );
};

export default Journal;
