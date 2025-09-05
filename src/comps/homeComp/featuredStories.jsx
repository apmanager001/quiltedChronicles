"use client";
import React, { useState, useEffect } from "react";
import validator from "validator";
import axiosInstance from "../utility/axios";
import Loading from "../utility/loading";
import Link from "next/link";
import { User, Heart, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";

const FeaturedStories = () => {
  const [topChapters, setTopChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  const dateNoTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const fetchTopChapters = async () => {
      try {
        const response = await axiosInstance.get(`/chapter`);
        if (!response.data) {
          return;
        }

        const data = response.data;
        if (Array.isArray(data)) {
          // Sort chapters by likes in descending order
          const sortedChapters = data.sort((a, b) => b.likes - a.likes);
          // Get top 6 chapters for featured section
          const topChapters = sortedChapters.slice(0, 6);
          setTopChapters(topChapters);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTopChapters();
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Loading />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="text-primary">Stories</span>
          </h2>
          <p className="text-lg md:text-xl text-base-content/80 max-w-3xl mx-auto">
            Discover the most loved stories from our community. These tales have
            captured readers' hearts and imaginations.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {topChapters.map((chapter, index) => (
            <div
              key={chapter.chapterId}
              className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={`/hero/hero${(index % 7)+1}.webp`}
                  alt={chapter.chapterTitle || chapter.storyTitle}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="card-body p-6">
                {/* Keywords/Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {(Array.isArray(chapter.keywords)
                    ? chapter.keywords.slice(0, 2)
                    : [chapter.keywords]
                  ).map((keyword, idx) => (
                    <span key={idx} className="badge badge-primary badge-sm">
                      {keyword}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="card-title text-lg mb-3 line-clamp-2">
                  <Link
                    href={`/chapter/${chapter.chapterId}`}
                    className="link link-hover"
                  >
                    {chapter.chapterTitle || chapter.storyTitle}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-base-content/70 line-clamp-3 mb-4">
                  {validator.unescape(chapter.bodyText) || "No preview available..."}
                </p>

                {/* Stats and Meta */}
                <div className="flex items-center justify-between text-sm">
                  <Link
                    href={`/profile/${chapter.authorName}`}
                    className="flex items-center gap-2 text-base-content/60 hover:text-primary transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="truncate">{chapter.authorName}</span>
                  </Link>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>{chapter.likes || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{dateNoTime(chapter.createDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link href="/search" className="btn btn-primary btn-lg">
            Explore All Stories
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStories;
