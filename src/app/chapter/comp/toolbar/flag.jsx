import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";


const Flag = ({ chapterId }) => {
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
      const response = await axios.post(`/chapter/${chapterId}/flag`, {
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
      data-tip="Is this Post inappropriate?"
    >
      <button
        className={`btn bg-toolbarColor hover:bg-toolbarHover rounded-full h-4 text-xl ${
          onFlag ? "text-red-600" : "text-slate-300"
        }`}
        onClick={() => handleFlag("")}
      >
        <FontAwesomeIcon icon={faFlag} />
      </button>
      {dropdownVisible && (
        <div className="flex flex-col absolute top-full right-0 shadow-xl z-50 mt-2">
          <button
            className={`btn ${onFlag ? "text-red-600" : "text-slate-300"}`}
            onClick={() => handleFlag("spam")}
          >
            <div>Spam</div>
          </button>
          <button
            className={`btn ${onFlag ? "text-red-600" : "text-slate-300"}`}
            onClick={() => handleFlag("inappropriate")}
          >
            <div>Inappropriate</div>
          </button>
          <button
            className={`btn ${onFlag ? "text-red-600" : "text-slate-300"}`}
            onClick={() => handleFlag("offensive")}
          >
            <div>Offensive</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Flag;
