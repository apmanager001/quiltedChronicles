import React from "react";
import Register from "./comp/register";

export const metadata = {
  title: "Create Account - Start Your Storytelling Journey",
  description:
    "Join Quilted Chronicles today! Create your free account and start writing collaborative stories, connecting with other writers, and exploring endless creative possibilities.",
  keywords: [
    "register",
    "sign up",
    "create account",
    "join community",
    "collaborative writing",
    "free account",
  ],
  openGraph: {
    title: "Create Account - Start Your Storytelling Journey",
    description:
      "Join Quilted Chronicles today! Create your free account and start writing collaborative stories with writers worldwide.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const Page = () => {
  return (
    <div>
      <Register />
    </div>
  );
};

export default Page;
