"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import Image from "next/image"; // Using Next.js Image for optimization

interface Testimonial {
  name: string;
  location: string;
  avatar: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Shubho Ahmed",
    location: "Dhaka, Bangladesh",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    quote: "TravelBuddy helped me find amazing companions for my first solo trip. I made friends for life and discovered hidden gems I never would have found alone.",
    rating: 5,
  },
  {
    name: "Marufa Khan",
    location: "Chittagong, Bangladesh",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    quote: "The safety features gave me total peace of mind. Joining group trips has never been this easy or rewarding. A game changer for female travelers!",
    rating: 5,
  },
  {
    name: "Alex Johnson",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    quote: "From initial planning to the final journey, everything was seamless. The community is incredibly welcoming and diverse. Highly recommend TravelBuddy!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-background transition-colors duration-500">
      {/* Subtle Background Gradients - Adjusted for Mode Visibility */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 dark:bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container relative mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-sm font-semibold tracking-overline text-primary uppercase mb-3">
            Community Feedback
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
            Trusted by global travelers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Real stories from our community of explorers who have found more than just destinations—they've found friendship.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <Card 
              key={index} 
              className="relative border-none bg-white/50 dark:bg-white/[0.03] backdrop-blur-md shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <CardContent className="p-8 flex flex-col h-full">
                {/* Decorative Quote Mark */}
                <Quote className="absolute top-6 right-8 w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />

                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="flex-1 mb-8">
                  <p className="text-foreground/80 dark:text-foreground/90 text-lg italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </blockquote>

                {/* Author Section */}
                <div className="flex items-center gap-4 border-t border-black/5 dark:border-white/10 pt-6">
                  <div className="relative">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-background shadow-md"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-background" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm tracking-tight">{t.name}</h4>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {t.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dynamic Social Proof */}
        <div className="mt-20 flex flex-col items-center justify-center gap-4">
          <div className="flex -space-x-3 overflow-hidden">
            {testimonials.map((t, i) => (
              <img
                key={i}
                className="inline-block h-10 w-10 rounded-full ring-2 ring-background"
                src={t.avatar}
                alt=""
              />
            ))}
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground text-xs font-bold ring-2 ring-background">
              +10k
            </div>
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Join a thriving community of <span className="text-foreground font-bold">10,000+</span> explorers
          </p>
        </div>
      </div>
    </section>
  );
}