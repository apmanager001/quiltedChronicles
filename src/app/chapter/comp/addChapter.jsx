'use client'
import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../../comps/utility/axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { Info } from "lucide-react";
import useStore from "../../store/store";


const AddChapter = () => {
  const user = useStore((state) => state.user);
  const { id } = useParams();
  const [authorName, setAuthorName] = useState("");
  const [data, setData] = useState({
    chapterTitle: "",
    body: "",
    keywords: "",
  });

  useEffect(() => {
    if (!user) return;
    setAuthorName(user.userName);
  }, [user]);

  const handleAddChapter = async (e) => {
    e.preventDefault();
    const { chapterTitle, body, keywords } = data;
    try {
      if (authorName) {
        if (user.locked) {
          toast.error("Your account is locked. Please contact support");
          return;
        }
        const keywordsArray = keywords.split(" ").filter(Boolean);
        const { data } = await axiosInstance.post(`/chapter/${id}`, {
          chapterTitle,
          bodyText: body,
          keywords: keywordsArray,
        });
        console.log(data);
        if (data.error) {
          toast.error(data.error);
        } else {
          setData({});
          toast.success("Thank you for starting a chapter");
          window.location.href = `/chapter/${id}`;
        }
      } else {
        toast.error("Please log in to send this story");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  return (
    <div className="flex flex-col gap-5 items-center w-full h-screen-minus-65 mt-4">
      <form
        className="flex flex-col items-center w-full gap-2 justify-center"
        onSubmit={handleAddChapter}
      >
        <div
          className="tooltip flex gap-2"
          data-tip="Add to this Chapters next steps."
        >
          Create your next part of this story...
          <Info />
        </div>

        <input
          placeholder="Your Title"
          className="input input-bordered text-2xl w-full"
          name="chapterTitle"
          onChange={(e) => setData({ ...data, chapterTitle: e.target.value })}
          required
        />
        <input
          className="input input-bordered text-2xl w-full"
          name="keywords"
          onChange={(e) => setData({ ...data, keywords: e.target.value })}
          placeholder="Keywords"
          required
        />
        <textarea
          placeholder="Create your adventure here..."
          name="body"
          className="textarea textarea-bordered w-full h-80 text-md"
          onChange={(e) => setData({ ...data, body: e.target.value })}
          required
        />
        <input type="submit" className="btn btn-accent w-full" value="Submit" />
      </form>
    </div>
  );
};

export default AddChapter;
