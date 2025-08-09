'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Info } from "lucide-react";
import Expanded from "../../chain/comp/expand";
import useStore from '../../store/store'
import axiosInstance from "../../../comps/utility/axios";
import AccountPage from "../../account/layout"

const CreateStory = () => {
  const user = useStore((state) => state.user);
  const updateUser = useStore((state) => state.updateUser);
  const [authorName, setAuthorName] = useState("");
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    storyTitle: "",
    bodyText: "",
    keywords: "",
  });

  useEffect(() => {
    if (!user) return;
    setLoading(true)
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
          updateUser()
          toast.success("Thank you for starting a story");
          // window.location.href = `/profile/${user.userName}`;
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
      {loading ? 
      <div className="flex flex-col gap-5 items-center w-full p-5">
        <div className="w-full flex justify-between items-center">
          <p className="flex-grow text-center text-xl">Create Your New Story</p>
          <Expanded />
        </div>
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
          <label htmlFor="keys" className="w-24">
            <div className="flex gap-2 tooltip tooltip-right" data-tip="Space between keywords, no commas">
              Keywords
              <div>
                <Info />
              </div>
              
            </div>
          </label>
          <input
            className="input input-bordered w-full text-3xl"
            id="keys"
            name="keywords"
            onChange={(e) => setData({ ...data, keywords: e.target.value })}
            placeholder="Keywords"
            required
          />
          <label htmlFor="story1">
            Your Story 
          </label>
          <textarea
            className="textarea textarea-bordered h-80 text-3xl"
            id="story1"
            name="bodyText"
            onChange={(e) => setData({ ...data, bodyText: e.target.value })}
            placeholder="Type the first chapter in your story..."
            required
          ></textarea>
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </div>:
      <div className="flex justify-center items-center min-h-96">
        <Link href="/login">
          <button className="btn btn-primary">Login</button>
        </Link>
      </div>
      }
    </AccountPage>
  );
};

export default CreateStory;
