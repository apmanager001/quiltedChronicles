"use client";
import React from "react";
import Link from "next/link";
import { Home, Search, BookOpen, User, ArrowLeft, Compass } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary opacity-20 select-none">
            404
          </h1>
        </div>

        {/* Main Message */}
        <div className="mb-12 max-w-2xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-base-content mb-6">
            Page Not Found
          </h2>
          <p className="text-xl text-base-content/70 leading-relaxed">
            Oops! It looks like this story chapter got lost in the narrative.
            The page you're looking for doesn't exist in our collaborative
            universe.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/"
            className="btn btn-primary btn-lg gap-3 hover:btn-primary-focus transition-all duration-200"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline btn-lg gap-3 hover:btn-outline-focus transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Quick Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          <Link
            href="/search"
            className="group p-6 bg-base-100 rounded-2xl border border-base-300/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-200">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-base-content mb-2 group-hover:text-primary transition-colors duration-200">
                Discover Stories
              </h3>
              <p className="text-sm text-base-content/60">
                Explore our collection of collaborative tales
              </p>
            </div>
          </Link>

          <Link
            href="/createStory"
            className="group p-6 bg-base-100 rounded-2xl border border-base-300/50 hover:border-secondary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors duration-200">
                <BookOpen className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-base-content mb-2 group-hover:text-secondary transition-colors duration-200">
                Start Writing
              </h3>
              <p className="text-sm text-base-content/60">
                Begin your own collaborative story
              </p>
            </div>
          </Link>

          <Link
            href="/howitworks"
            className="group p-6 bg-base-100 rounded-2xl border border-base-300/50 hover:border-accent/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-200">
                <Compass className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-base-content mb-2 group-hover:text-accent transition-colors duration-200">
                How It Works
              </h3>
              <p className="text-sm text-base-content/60">
                Learn about collaborative storytelling
              </p>
            </div>
          </Link>

          <Link
            href="/login"
            className="group p-6 bg-base-100 rounded-2xl border border-base-300/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-200">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-base-content mb-2 group-hover:text-primary transition-colors duration-200">
                Join Community
              </h3>
              <p className="text-sm text-base-content/60">
                Connect with fellow storytellers
              </p>
            </div>
          </Link>
        </div>

        {/* Helpful Tips */}
        <div className="bg-base-100/80 backdrop-blur-sm rounded-2xl border border-base-300/50 p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-base-content mb-6 text-center">
            Need Help Finding Something?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div>
              <h4 className="font-semibold text-primary mb-3">Check the URL</h4>
              <p className="text-base-content/70 text-sm">
                Make sure the web address is spelled correctly and doesn't
                contain typos.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-secondary mb-3">Use Search</h4>
              <p className="text-base-content/70 text-sm">
                Try searching for the content you're looking for using our
                search feature.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-accent mb-3">
                Browse Categories
              </h4>
              <p className="text-base-content/70 text-sm">
                Explore our story categories and discover new collaborative
                tales.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-3">
                Contact Support
              </h4>
              <p className="text-base-content/70 text-sm">
                If you believe this is an error, reach out to our support team.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center pb-8">
        <p className="text-base-content/50 text-sm">
          Lost in the narrative? Every great story has unexpected twists and
          turns.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
