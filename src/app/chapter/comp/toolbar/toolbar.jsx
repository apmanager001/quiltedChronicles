import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import useStore from "../../../store/store";
import Like from "./likes";
import Flagged from "./flag";
import Journal from "./journal";

const Toolbar = ({chapterId}) => {
  const user = useStore((state) => state.user);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  return (
    <div className="flex">
      <div className="flex gap-3 justify-center items-center w-auto p-2 rounded-lg">
        {!user? "":
        <>
        <Like chapterId={id} />
        <Journal chapterId={id} />
        </>
        }
        <Flagged chapterId={id} />
      
      </div>
    
    </div>
  );
};

export default Toolbar;
