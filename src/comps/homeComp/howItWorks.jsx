"use client";
import React from "react";
import { PenTool, Users, Repeat, BookOpen } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <PenTool className="w-12 h-12" />,
      title: "Start or Continue",
      description:
        "Begin a new story or pick up where someone else left off. Every chapter opens new possibilities.",
      color: "text-primary",
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Collaborate",
      description:
        "Writers from around the world contribute chapters, creating unique branching narratives.",
      color: "text-secondary",
    },
    {
      icon: <Repeat className="w-12 h-12" />,
      title: "Branch & Explore",
      description:
        "Stories can split into multiple paths, allowing readers to explore different outcomes.",
      color: "text-accent",
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Read & Enjoy",
      description:
        "Discover completed story chains and experience the magic of collaborative creativity.",
      color: "text-info",
    },
  ];

  return (
    <section className="py-20 bg-base-200/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-lg md:text-xl text-base-content/80 max-w-3xl mx-auto">
            Collaborative storytelling has never been easier. Join our community
            and be part of creating amazing tales together.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              {/* Icon Circle */}
              <div
                className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-base-100 shadow-lg mb-6 group-hover:shadow-xl transition-all duration-300 ${step.color}`}
              >
                {step.icon}
              </div>

              {/* Step Number */}
              <div className="text-sm font-bold text-base-content/60 mb-2">
                STEP {index + 1}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-4 text-base-content">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-base-content/70 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a href="/howitworks" className="btn btn-outline btn-lg">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
