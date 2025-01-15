'use client'
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Info } from "lucide-react";
import useStore from '../../store/store'
import axiosInstance from "../../../comps/utility/axios";
import AccountPage from "../../account/layout"

const CreateStory = () => {
  const user = useStore((state) => state.user);
  const [authorName, setAuthorName] = useState("");
  const [data, setData] = useState({
    storyTitle: "",
    bodyText: "",
    keywords: "",
  });

  useEffect(() => {
    if (!user) return;
    setAuthorName(user.userName);
  }, [user]);

  const handleAddStory = async (e) => {
    e.preventDefault();
    const { storyTitle, bodyText, keywords } = data;
    try {
      if (authorName) {
        if (user.locked) {
          toast.error("Your account is locked. Please contact support");
          return;
        }
        const keywordsArray = keywords.split(" ").filter(Boolean);
        const { data } = await axiosInstance.post("/chapter", {
          storyTitle,
          bodyText,
          keywords: keywordsArray,
        });
        if (data.error) {
          toast.error(data.error);
        } else {
          setData({});
          toast.success("Thank you for starting a story");
          window.location.href = `/profile/${user.userName}`;
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
    <AccountPage>
      <div className="flex flex-col gap-5 items-center w-full p-5">
        <p className="text-center text-xl">Create Your New Story</p>
        <form
          onSubmit={handleAddStory}
          className="flex flex-col w-full gap-2 justify-center"
        >
          <label htmlFor="title">Title</label>
          <input
            className="input input-bordered w-full text-3xl"
            id="title"
            name="storyTitle"
            onChange={(e) => setData({ ...data, storyTitle: e.target.value })}
            placeholder="Story Title"
            required
          />
          <label htmlFor="keywords">
            <div className="flex gap-2 tooltip tooltip-right w-28" data-tip="Add a space between keywords, no commas">
              Keywords
              <Info />
            </div>
            </label>
          <input
            className="input input-bordered w-full text-3xl"
            id="keywords"
            name="keywords"
            onChange={(e) => setData({ ...data, keywords: e.target.value })}
            placeholder="Keywords"
            required
          />
          <label htmlFor="bodyText">
            Your Story 
          </label>
          <textarea
            className="textarea textarea-bordered h-80 text-3xl"
            id="bodyText"
            name="bodyText"
            onChange={(e) => setData({ ...data, bodyText: e.target.value })}
            placeholder="Type the first chapter in your story..."
            required
          ></textarea>
          <input type="submit" className="btn btn-accent" value="Submit" />
        </form>
      </div>
    </AccountPage>
  );
};

export default CreateStory;
