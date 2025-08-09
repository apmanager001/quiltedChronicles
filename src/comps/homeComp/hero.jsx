"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PenTool, BookOpen, ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Collaborative Storytelling Platform
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Quilted Chronicles
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-base-content/90 font-medium">
              Where Stories Come Alive Through
              <span className="text-primary font-bold"> Collaboration</span>
            </p>

            {/* Description */}
            <p className="text-lg text-base-content/80 leading-relaxed max-w-xl">
              Create epic tales together, one chapter at a time. Start a story,
              continue an adventure, or explore infinite narrative possibilities
              in our growing community of creative writers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/createStory"
                className="btn btn-primary btn-lg text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <PenTool className="w-6 h-6" />
                Start Writing
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/search"
                className="btn btn-outline btn-lg text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <BookOpen className="w-6 h-6" />
                Explore Stories
              </Link>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-base-content/70">
                  Collaborative Writing
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span className="text-base-content/70">
                  Branching Narratives
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-base-content/70">Creative Community</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-info rounded-full"></div>
                <span className="text-base-content/70">Multiple Endings</span>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/quilted.webp"
                alt="Quilted Chronicles - Collaborative Storytelling Platform"
                fill
                className="object-cover"
                priority
              />
              {/* Subtle overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating elements for visual interest */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-base-content/30 rounded-full p-1">
          <div className="w-1 h-3 bg-base-content/30 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
