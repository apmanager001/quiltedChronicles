"use client";
import React from "react";
import Link from "next/link";
import { PenTool, BookOpen, Users, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA */}
          <div className="mb-16">
            <Sparkles className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Create Your <span className="text-primary">Story</span>?
            </h2>
            <p className="text-lg md:text-xl text-base-content/80 mb-8 max-w-2xl mx-auto">
              Join thousands of writers who are already crafting incredible
              tales together. Your next great adventure is just one chapter
              away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/register"
                className="btn btn-primary btn-lg text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Users className="w-6 h-6" />
                Join the Community
              </Link>

              <Link
                href="/login"
                className="btn btn-outline btn-lg text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-base-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <PenTool className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-3">Start Writing</h3>
              <p className="text-base-content/70 mb-4">
                Begin your own story and watch as other writers bring your world
                to life.
              </p>
              <Link href="/createStory" className="btn btn-primary btn-sm">
                Create Story
              </Link>
            </div>

            <div className="bg-base-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <BookOpen className="w-12 h-12 text-secondary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-3">Continue Reading</h3>
              <p className="text-base-content/70 mb-4">
                Dive into existing stories and add your own unique chapter to
                the tale.
              </p>
              <Link href="/search" className="btn btn-secondary btn-sm">
                Browse Stories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
