'use client'
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Loading from "../../../comps/utility/loading"
// import DarkMode from "../../context/darkmode/DarkMode";
import useStore from "../../store/store";
import axiosInstance from "../../../comps/utility/axios";
import AccountPage from "../../account/layout";
import ThemeSelector from "../../store/theme";
import FontSelector from "../../store/font";

const Settings = () => {
  const user = useStore((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [emailPublic, setEmailPublic] = useState(true);
  const [bio, setBio] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        setEmail(settings.email);
        setIsVerified(settings.emailVerified);
      })
      .catch((error) => {
        console.error("There was an error getting user settings", error);
      });
  }, [user]);

  const handleTextAreaButtonClick = () => {
    const settingsData = {
      publishEmail: emailPublic,
      email,
      darkMode,
      bio,
    };

    axiosInstance
      .put("/profile", settingsData)
      .then((response) => {
        toast.success("Settings updated successfully");
      })
      .catch((error) => {
        console.error("There was an error updating the settings", error);
      });
  };

  // const handleThemeToggle = (isDarkMode) => {
  //   setDarkMode(isDarkMode);
  // };

  const handleEmailChange = (e) => setEmail(e.target.value);

  const verified = () => {
    return <div className="badge badge-success gap-2 font-bold">Verified</div>;
  };

  const notVerified = () => {
    return <div className="badge badge-error md:p-4 text-center gap-2 font-bold">Not Verified</div>;
  };

  const handleVerifyEmail = () => {
    axiosInstance
      .post(`/verify`)
      .then((response) => {
        toast.success(
          "An email has been sent to your email address, click the link in the email to verify your email"
        );
      })
      .catch((error) => {
        console.error("There was an error verifying the email", error);
      });
  };
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Your New Passwords do not match");
      return;
    }
    axiosInstance
      .post("/changepassword", {
        password: oldPassword,
        newPassword: newPassword,
      })
      .then((response) => {
        toast.success("Password changed successfully");
        // Clear the password fields or take any other action
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        console.error("There was an error changing the password", error);
        toast.error("Failed to change password");
      });
  };

  return (
    <AccountPage>
      <div className="flex flex-col items-center h-screen-minus-65 w-full">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="p-10">Your Settings</div>
            <div className="flex flex-col gap-5 w-full">
              <div className="flex h-24 w-full items-center justify-center">
                <div className="flex flex-col w-1/3">
                  Set Your Color Scheme:
                </div>
                <div className="flex flex-col justify-center items-center w-2/3">
                  <ThemeSelector />
                </div>
              </div>
              <div className="flex w-full items-center justify-center h-32">
                <div className="flex flex-col w-1/3">Your Story Font:</div>
                <div className="flex flex-col justify-center items-center w-2/3">
                  <FontSelector />
                </div>
              </div>
              <div className="flex min-h-20 w-full items-center justify-center">
                <div className="flex flex-col w-1/3">
                  Set Your Email Privacy:
                </div>
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
                  <label htmlFor="public">Public</label>
                  <input
                    type="radio"
                    value="notPublic"
                    name="publicEmail"
                    id="notPublic"
                    checked={emailPublic === false}
                    onChange={handleRadioChange}
                    className="radio "
                  />
                  <label htmlFor="notPublic">Not Public</label>
                </div>
              </div>
              <div className="flex  w-full items-center justify-center">
                <div className="flex flex-col justify-start xl:items-start items-center xl:flex-row w-1/3 gap-2">
                  <div className="flex flex-col lg:flex-row gap-1 items-center">
                    Your Email:{isVerified ? verified() : notVerified()}
                  </div>
                  <div>
                    {isVerified ? (
                      ""
                    ) : (
                      <button
                        className="btn btn-active btn-accent"
                        id="confirmEmail"
                        name="confirmEmail"
                        onClick={handleVerifyEmail}
                      >
                        Verify This email
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2 w-2/3">
                  <input
                    className="input input-bordered w-60"
                    onChange={handleEmailChange}
                    name="email"
                    type="email"
                    value={email}
                    autoComplete="false"
                  />
                </div>
              </div>
              <div className="flex min-h-20 w-full items-center justify-center">
                <div className="flex items-center w-1/3 ">
                  Change Password:
                </div>
                <div className="flex justify-center items-center  w-2/3">
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      document.getElementById("my_modal_2").showModal()
                    }
                  >
                    Change Password
                  </button>
                </div>
              </div>
              <div className="flex flex-row h-40 w-full items-center justify-center">
                <div className="flex flex-col w-1/3">Your Bio:</div>
                <div className="flex flex-col items-center w-2/3">
                  <textarea
                    value={bio}
                    id="textarea"
                    onChange={handleTextAreaChange}
                    className="textarea textarea-bordered h-52 w-full resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={handleTextAreaButtonClick}
                  className="btn btn-primary mt-8"
                >
                  Submit
                </button>
              </div>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box w-full">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg text-center pb-4">
                    Change Password
                  </h3>
                  <div className="flex flex-col w-full justify-center items-center gap-2">
                    <input
                      type="password"
                      name="oldPassword"
                      className="input input-bordered w-80"
                      placeholder="Old Password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <input
                      type="password"
                      className="input input-bordered w-80"
                      name="newPassword"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                      type="password"
                      className="input input-bordered w-80"
                      name="confirmPassword"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <input
                      onClick={handleChangePassword}
                      className="btn btn-accent "
                      defaultValue="Submit"
                    />
                  </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          </>
        )}
      </div>
    </AccountPage>
  );
};

export default Settings;
