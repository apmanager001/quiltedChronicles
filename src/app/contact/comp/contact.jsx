'use client'
import React, { useState, useContext, useEffect } from "react";
import axiosInstance from "../../../comps/utility/axios";
import useStore from "../../store/store";
import { toast } from "react-hot-toast";
import AccountPage from "../../account/layout";
import Expanded from "../../chain/comp/expand";

const Contact = () => {
  const user = useStore((state) => state.user);
  const [username, setUsername] = useState("Provide Your Name");
  const [email, setEmail] = useState("Provide Your Email");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    messageText: "",
  });
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!user);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setIsUserLoggedIn(checked);
      if (!checked) {
        setUsername("Anonymous");
        setEmail("Anonymous@Example.com");
        setFormData((prevData) => ({
          ...prevData,
          name: "Anonymous",
          email: "Anonymous@Example.com",
        }));
      } else {
        setUsername(user.userName || "Provide Your Name");
        setEmail(user.email || "Provide Your Email");
        setFormData((prevData) => ({
          ...prevData,
          name: user.userName || "Provide Your Name",
          email: user.email || "Provide Your Email",
        }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalFormData = {
      name: user ? formData.name || username : "Anonymous",
      email: user ? formData.email || email : "Anonymous@Example.com",
      messageText: formData.messageText,
    };

    try {
      const response = await axiosInstance.post("/message", finalFormData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        toast.success("Thank You for sending us a Message!");
      } else {
        toast.error("Failed to submit the form.");
      }
    } catch (error) {
      toast.error(
        `Error: ${error.response ? error.response.data.message : error.message}`
      );
    }
  };

  useEffect(() => {
    if (user) {
      setUsername(user.userName);
      setEmail(user.email);
      setIsUserLoggedIn(true);
    } else {
      setUsername("Provide Your Name");
      setEmail("Provide Your Email");
      setIsUserLoggedIn(false);
    }
  }, [user]);
  return (
    <AccountPage>
      <div className="flex flex-col gap-5 items-center w-full h-screen-minus-65 ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full gap-2 justify-center"
        >
          <div className="flex justify-between items-center w-full mb-10">
            <p className="flex-grow text-xl text-center ">Contact Us</p>
            <Expanded />
          </div>

          <label htmlFor="name" className="text-left w-full">
            Name:
          </label>
          <input
            type="text"
            className="input input-bordered w-full text-2xl"
            id="name"
            name="name"
            placeholder={username}
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
          />

          <label htmlFor="email" className="text-left w-full">
            Email:
          </label>
          <input
            type="email"
            className="input input-bordered w-full text-2xl"
            id="email"
            name="email"
            placeholder={email}
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
          />

          <label htmlFor="messageText" className="text-left w-full">
            Message:
          </label>
          <textarea
            className="textarea textarea-bordered h-72 text-2xl w-full"
            id="messageText"
            name="messageText"
            placeholder="Message"
            value={formData.messageText}
            onChange={handleChange}
            required
          ></textarea>

          <div className="flex flex-row justify-center text-xl my-2">
            <input
              type="checkbox"
              className="checkbox mr-2"
              id="userLoggedIn"
              checked={isUserLoggedIn}
              onChange={handleChange}
            />

            <label
              htmlFor="userLoggedIn"
              className="tooltip"
              data-tip="If you are logged in and this box is checked it will use your
            username and email. Uncheck to remain anonymous."
            >
              {user ? `${user.userName} is logged in` : "User is not logged in"}
            </label>
            <div></div>
          </div>
          <button type="submit" className="btn w-full btn-primary">
            Send
          </button>
        </form>
      </div>
    </AccountPage>
  );
};

export default Contact;
