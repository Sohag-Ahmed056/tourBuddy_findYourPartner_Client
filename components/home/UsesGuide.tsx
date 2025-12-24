"use client";

import { UserPlus, Users, Map, PlaneTakeoff, ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Login",
    description: "Create your profile and verify your identity for safe travels.",
    icon: UserPlus,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Join Group",
    description: "Browse verified trips and find a community that matches your vibe.",
    icon: Users,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Create Plan",
    description: "Coordinate dates, budgets, and destinations with your buddies.",
    icon: Map,
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    title: "Explore",
    description: "Set off on your adventure and make memories for a lifetime.",
    icon: PlaneTakeoff,
    color: "bg-amber-500/10 text-amber-400",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-background transition-colors duration-300">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Your journey from solo dreamer to group explorer in four simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group flex flex-col items-center text-center">
              
              {/* Connector Arrow (Hidden on Mobile) */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 z-0">
                  <div className="flex items-center justify-center w-full">
                    <div className="h-[2px] w-full bg-gradient-to-r from-border via-primary/20 to-transparent" />
                    <ArrowRight className="w-5 h-5 text-muted-foreground/30 -ml-2" />
                  </div>
                </div>
              )}

              {/* Icon Circle */}
              <div className={`relative z-10 w-24 h-24 mb-6 rounded-3xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${step.color} border border-white/5 shadow-xl shadow-black/5 dark:shadow-white/5`}>
                <step.icon className="w-10 h-10" />
                
                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xs font-bold text-foreground">
                  {index + 1}
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed px-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Line */}
        
      </div>
    </section>
  );
}