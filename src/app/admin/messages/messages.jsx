'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "../../../comps/utility/axios";
import DeleteMessage from "./deleteMessage";
import ReadMessage from "./readMessage";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/admin/message")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the messages!", error);
      });
  }, [deleteMessage]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options).replace(",", "");
  };
  const toggleDeleteMessage =()=> {
    setDeleteMessage((prevState) => !prevState);
  }
  return (
    <div className="flex flex-row justify-center flex-wrap w-full h-screen-minus-100 overflow-y-auto gap-5">
      {messages.map((message, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 p-2 m-2 bg-base-200 w-72 min-h-64 border border-slate-600 rounded-lg shadow-xl"
        >
          {message.verified ? (
            <Link href={`/profile/${message.name}`}>
              {message.name}
            </Link>
          ) : (
            <p>{message.name}</p>
          )}

          <p>
            <strong>Email:</strong> {message.email}
          </p>
          <p>{message.messageText}</p>
          <div className="flex flex-row mt-auto">
            <div className="flex flex-col items-center justify-center text-center gap-3">
              <p>{message.verified ? "User is Verified" : "Not Verified"}</p>
              <p>
                {message.createDate
                  ? formatDate(message.createDate)
                  : "No Date Available"}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <DeleteMessage
                deleteId={message._id}
                onDeleteMessage={toggleDeleteMessage}
              />
              <ReadMessage readId={message._id} initialReadState={message.read} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
