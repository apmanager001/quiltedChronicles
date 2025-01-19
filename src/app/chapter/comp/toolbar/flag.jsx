import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../../../comps/utility/axios";
import { Flag } from "lucide-react";
import toast from "react-hot-toast";


const Flagged = ({ chapterId }) => {
  const [onFlag, setOnFlag] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [reason, setReason] = useState("");

  const handleFlag = async (selectedReason) => {
    if (onFlag) {
      toast.success(
        "You have already Flagged this chapter, we are looking into it. Thank you!"
      );
      return;
    }

    if (!selectedReason) {
      setDropdownVisible(!dropdownVisible);
      return;
    }

    try {
      const response = await axiosInstance.post(`/chapter/${chapterId}/flag`, {
        reason: selectedReason,
      });
      setOnFlag(true);
      toast.success(
        "Thank you for helping make our community safer! We are looking into this chapter."
      );
    } catch (error) {
      toast.error(
        "There was an error flagging this chapter. Please try again later."
      );
    } finally {
      setDropdownVisible(false);
    }
  };
  return (
    <div
      className="tooltip tooltip-bottom relative flex gap-5"
      data-tip="Flag as Inappropriate"
    >
      <button
        className={`btn btn-ghost hover:bg-toolbarHover rounded-full h-4 text-xl ${
          onFlag ? "text-red-600" : "currentValue"
        }`}
        onClick={() => handleFlag("")}
        aria-label={onFlag ? "Flagged Chapter" : "Unflagged Chapter"}
      >
        <Flag />
      </button>
      {dropdownVisible && (
        <div className="flex flex-col absolute top-full right-0 shadow-xl z-50 mt-2">
          <button
            className={`btn ${onFlag ? "text-red-600" : ""}`}
            onClick={() => handleFlag("spam")}
            aria-label={onFlag ? "Flagged Chapter" : "Unflagged Chapter"}
          >
            <div>Spam</div>
          </button>
          <button
            className={`btn ${onFlag ? "text-red-600" : ""}`}
            onClick={() => handleFlag("inappropriate")}
            aria-label={onFlag ? "Flagged Chapter" : "Unflagged Chapter"}
          >
            <div>Inappropriate</div>
          </button>
          <button
            className={`btn ${onFlag ? "text-red-600" : ""}`}
            onClick={() => handleFlag("offensive")}
            aria-label={onFlag ? "Flagged Chapter" : "Unflagged Chapter"}
          >
            <div>Offensive</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Flagged;
