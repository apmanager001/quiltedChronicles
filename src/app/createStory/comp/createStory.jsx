'use client'
import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
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
    <div className="flex flex-col gap-5 items-center w-full h-screen-minus-65 p-5">
      <p className="text-center text-xl">Create Your New Story</p>
      <form
        onSubmit={handleAddStory}
        className="flex flex-col w-full md:w-2/4 gap-2 justify-center"
      >
        <input
          className="input input-bordered w-full text-3xl"
          name="storyTitle"
          onChange={(e) => setData({ ...data, storyTitle: e.target.value })}
          placeholder="Story Title"
          required
        />
        <input
          className="input input-bordered w-full text-3xl"
          name="keywords"
          onChange={(e) => setData({ ...data, keywords: e.target.value })}
          placeholder="Keywords"
          required
        />
        <textarea
          className="textarea textarea-bordered h-80 text-2xl"
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
