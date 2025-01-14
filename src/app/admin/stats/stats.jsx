'use client'
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../comps/utility/axios";

const Stats = () => {
  const [stats, setStats] = useState([]);

    useEffect(() => {
      axiosInstance
        .get("/stats")
        .then((response) => {
          setStats(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching stats!", error);
        });
    }, []);

  return (
    <div className="stats shadow w-full h-full flex justify-center my-10 ">
      <div className="stat place-items-center">
        <div className="stat-title">Stories</div>
        <div className="stat-value">{stats.stories}</div>
        <div className="stat-desc">first chapter in the full story</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">Users</div>
        <div className="stat-value text-secondary">{stats.users}</div>
        <div className="stat-desc text-secondary">↗︎ goal 1,000</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">Chapters</div>
        <div className="stat-value">{stats.chapters}</div>
        <div className="stat-desc">↗︎ total chapters ever posted</div>
      </div>
    </div>
  );};

export default Stats;
