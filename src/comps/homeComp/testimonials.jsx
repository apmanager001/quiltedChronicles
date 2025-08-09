"use client";
import React from "react";
import { Quote, Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "Quilted Chronicles has revolutionized how I think about storytelling. The collaborative nature brings out creativity I never knew I had!",
      author: "Sarah M.",
      role: "Fantasy Writer",
      rating: 5,
    },
    {
      quote:
        "I love how my stories can branch into completely unexpected directions. It's like watching your imagination come alive through other writers.",
      author: "Marcus T.",
      role: "Sci-Fi Enthusiast",
      rating: 5,
    },
    {
      quote:
        "The community here is incredible. Every chapter I write gets thoughtful continuations that surprise and delight me.",
      author: "Elena R.",
      role: "Romance Author",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-base-200/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            What Writers Are <span className="text-primary">Saying</span>
          </h2>
          <p className="text-lg md:text-xl text-base-content/80 max-w-3xl mx-auto">
            Join thousands of satisfied writers who have discovered the joy of
            collaborative storytelling.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-base-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/30 absolute top-6 right-6" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-base-content/80 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-base-content/10 pt-4">
                <div className="font-bold text-base-content">
                  {testimonial.author}
                </div>
                <div className="text-sm text-base-content/60">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-base-content/70">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">98%</div>
              <div className="text-base-content/70">User Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">1M+</div>
              <div className="text-base-content/70">Words Written</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-info mb-2">24/7</div>
              <div className="text-base-content/70">Creative Community</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
