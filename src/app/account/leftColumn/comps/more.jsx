'use client'
import React from "react";

const MoreButton = ({ showMore, handleShowMore }) => {
  return (
    <button onClick={handleShowMore} className="btn">
      {showMore ? "Less" : "More"}
    </button>
  );
};
export default MoreButton;
