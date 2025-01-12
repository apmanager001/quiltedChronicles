'use client'
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
// import DarkMode from "../../context/darkmode/DarkMode";
import useStore from "../../../../store/store";
import axiosInstance from "../../../../../comps/utility/axios";

const Settings = () => {
  const user = useStore((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [emailPublic, setEmailPublic] = useState(true);
  const [bio, setBio] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const handleRadioChange = (e) => {
    const value = e.target.value === "public";
    setEmailPublic(value);
  };

  const handleTextAreaChange = (e) => setBio(e.target.value);

  useEffect(() => {
    if (!user) return;
    axiosInstance
      .get(`/profile`)
      .then((response) => {
        const settings = response.data;
        setEmailPublic(settings.publishEmail);
        setDarkMode(settings.darkMode);
        setBio(settings.bio);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error getting user settings", error);
      });
  }, [user]);

  const handleTextAreaButtonClick = () => {
    const settingsData = {
      publishEmail: emailPublic,
      darkMode,
      bio,
    };

    axios
      .put("/profile", settingsData)
      .then((response) => {
        toast.success("Settings updated successfully");
      })
      .catch((error) => {
        console.error("There was an error updating the settings", error);
      });
  };

  const handleThemeToggle = (isDarkMode) => {
    setDarkMode(isDarkMode);
  };

  return (
    <div className="flex flex-col items-center h-screen-minus-65 w-full">
      {loading ? (
        <div className="min-h-1/2 flex justify-center items-center">
          Loading...
        </div>
      ) : (
        <>
          <div className="p-10">Your Settings</div>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex h-10 w-full items-center justify-center">
              <div className="flex flex-col w-1/3">Set Your Color Scheme:</div>
              <div className="flex flex-col items-center w-2/3">
                {/* <DarkMode
                  darkMode={darkMode}
                  onToggleTheme={handleThemeToggle}
                /> */}
              </div>
            </div>
            <div className="flex h-40 w-full items-center justify-center">
              <div className="flex flex-col w-1/3">Set Your Email Privacy:</div>
              <div className="flex justify-center items-center gap-2 w-2/3">
                <input
                  type="radio"
                  value="public"
                  name="publicEmail"
                  id="public"
                  checked={emailPublic === true}
                  onChange={handleRadioChange}
                  className="radio"
                />
                <label htmlFor="public" className="pb-2">
                  Set my Email Public
                </label>
                <input
                  type="radio"
                  value="notPublic"
                  name="publicEmail"
                  id="notPublic"
                  checked={emailPublic === false}
                  onChange={handleRadioChange}
                  className="radio "
                />
                <label htmlFor="notPublic">Set my Email Not Public</label>
              </div>
            </div>
            <div className="flex flex-row h-40 w-full items-center justify-center">
              <div className="flex flex-col w-1/3">Your Bio:</div>
              <div className="flex flex-col items-center w-2/3">
                <textarea
                  value={bio}
                  onChange={handleTextAreaChange}
                  className="textarea textarea-bordered h-52 w-full resize-none"
                />
              </div>
            </div>
            <button
              onClick={handleTextAreaButtonClick}
              className="btn btn-primary mt-8"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;
