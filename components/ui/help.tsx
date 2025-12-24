"use client";

import React, { useState } from "react";
import { 
  LifeBuoy, 
  ShieldCheck, 
  UserCircle2, 
  Map, 
  Send, 
  CheckCircle2, 
  ChevronRight,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function HelpAndContact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate submission
    setTimeout(() => setStatus("success"), 1500);
  };

  const helpTopics = [
    {
      title: "Account & Verification",
      icon: UserCircle2,
      desc: "Issues with login, badges, or document uploads.",
    },
    {
      title: "Safety & Privacy",
      icon: ShieldCheck,
      desc: "How to report users and manage your visibility.",
    },
    {
      title: "Trip Coordination",
      icon: Map,
      desc: "Managing plans, group chats, and invitations.",
    },
  ];

  return (
    <section className="py-20 bg-background transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Support Center
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Find quick solutions to common issues or reach out to our team directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left: Help Topics (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid gap-4">
              {helpTopics.map((topic) => (
                <div 
                  key={topic.title}
                  className="group flex items-start gap-5 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-primary/50 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all cursor-pointer"
                >
                  <div className="p-3 rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <topic.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-lg text-foreground">{topic.title}</h3>
                      <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {topic.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Tips Box */}
            <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border-none">
              <div className="flex items-center gap-3 mb-3 text-primary">
                <LifeBuoy className="w-5 h-5" />
                <span className="font-bold text-sm uppercase tracking-wider">Pro Tip</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 italic">
                "Always check the 'Verified' badge on a user's profile before confirming a shared travel itinerary for maximum security."
              </p>
            </div>
          </div>

          {/* Right: Contact Form (5 Columns) */}
          <div className="lg:col-span-5">
            <div className="relative p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl shadow-black/5">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Send a Message</h3>
                <p className="text-sm text-muted-foreground">Our team typically responds within 4 hours.</p>
              </div>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Message Received</h4>
                  <p className="text-sm text-muted-foreground mb-6">We've sent a confirmation to your email.</p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="text-primary font-bold text-sm hover:underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      required 
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      required 
                      type="email"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Message</label>
                    <textarea 
                      required 
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="Describe your issue..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Request
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}