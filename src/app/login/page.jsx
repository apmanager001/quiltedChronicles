import React from "react";
import Login from "./comp/login";

export const metadata = {
  title: "Login - Join Quilted Chronicles",
  description:
    "Sign in to your Quilted Chronicles account and continue your collaborative storytelling journey. Access your stories, continue reading, and write new chapters.",
  keywords: [
    "login",
    "sign in",
    "account access",
    "user authentication",
    "storytelling platform",
  ],
  openGraph: {
    title: "Login - Join Quilted Chronicles",
    description:
      "Sign in to your Quilted Chronicles account and continue your collaborative storytelling journey.",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const Page = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default Page;
