'use client'
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import useStore from "../../../store/store";
import MoreButton from "./more";
import DeleteAuthor from "./deleteAuthor";

const FollowedAuthors = () => {
    const user = useStore((state) => state.user);
   
    const [showMore, setShowMore] = useState(false);
    const [followedAuthors, setFollowedAuthors] = useState([]);

  useEffect(() => {
    if (!user) return;
    setFollowedAuthors([...user.followedAuthors]);
  }, [user]);

  const topFiveAuthors = followedAuthors.slice(0, 5);
  const remainingAuthors = followedAuthors.slice(5);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const link = (author) => `/profile/${author.userName}`;
  const name = (author) => author.userName;

  const toggleDeleteAuthor = (authorId) => {
    const updatedAuthors = followedAuthors.filter(
      (author) => author.userId !== authorId
    );
    const updatedUser = { ...user, followedAuthors: updatedAuthors };
    setUser(updatedUser);
  };

  return (
    <div>
      {followedAuthors.length === 0
        ? "No followed Authors yet"
        : topFiveAuthors.map((author, index) => (
            <div key={index}>
              <ul className=" menu menu-xs rounded-box  gap-2">
                <li className="flex flex-row justify-between items-center">
                  <Link
                    href={`/profile/${author.userName}`}
                    className="btn btn-ghost btn-sm text-md"
                  >
                    {author.userName}
                  </Link>
                  <DeleteAuthor
                    id={author.userId}
                    onDeleteAuthor={() => toggleDeleteAuthor(author.userId)}
                  />
                </li>
              </ul>
            </div>
          ))}
      {remainingAuthors.length > 0 && (
        <div>
          {showMore &&
            remainingAuthors.map((author, index) => (
              <div key={index} className="flex flex-row ">
                <ul className="menu menu-xs rounded-box  gap-2">
                  <li className="flex flex-row justify-between items-center">
                    <Link href={link(author)}>{name(author)}</Link>
                    <DeleteAuthor
                      id={author.userId}
                      onDeleteAuthor={() => toggleDeleteAuthor(author.userId)}
                    />
                  </li>
                </ul>
              </div>
            ))}
          <MoreButton showMore={showMore} handleShowMore={handleShowMore} />
        </div>
      )}
    </div>
  );
};

export default FollowedAuthors;