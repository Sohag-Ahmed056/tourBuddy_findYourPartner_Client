"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui
import { Input } from "@/components/ui/input";   // Assuming shadcn/ui
import { cn } from "@/lib/utils";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyY8lgS7k2altj6N1rF-BVAEsFKLiA9yVnuJhKxlZwstXFU8aLWkCI0ZNCuxF8rCy6m/exec";

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      // Google Apps Script no-cors won't return a readable response body,
      // but the request usually hits the server.
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, timestamp: new Date().toISOString() }),
      });

      // Artificial delay for better UX perception
      setTimeout(() => {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 5000);
      }, 800);
      
    } catch (error) {
      console.error("Newsletter Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className=" max-w-sm">
      <div className="relative group">
        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-6 w-1 bg-primary rounded-full" />
          <h3 className="text-lg font-bold tracking-tight text-foreground">
            Stay Connected
          </h3>
        </div>

        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          Join our newsletter for exclusive travel deals and platform updates. No spam, ever.
        </p>

        <form onSubmit={handleSubscribe} className="relative space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className={cn(
                  "h-11 bg-background border-input transition-all duration-200 focus:ring-2 focus:ring-primary/20",
                  status === "success" && "border-emerald-500/50 focus:ring-emerald-500/20",
                  status === "error" && "border-destructive/50 focus:ring-destructive/20"
                )}
                disabled={status === "loading" || status === "success"}
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={status === "loading" || status === "success"}
              className="h-11 px-6 font-semibold transition-all duration-300 active:scale-95"
            >
              {status === "loading" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : status === "success" ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <>
                  <span className="mr-2">Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </Button>
          </div>

          {/* Status Indicators */}
          <div className="min-h-[20px] transition-all duration-300">
            {status === "success" && (
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 animate-in fade-in slide-in-from-top-1">
                <CheckCircle2 className="w-4 h-4" />
                <p className="text-xs font-medium">You're on the list! Check your inbox soon.</p>
              </div>
            )}
            
            {status === "error" && (
              <div className="flex items-center gap-2 text-destructive animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-4 h-4" />
                <p className="text-xs font-medium">Something went wrong. Please try again.</p>
              </div>
            )}
          </div>
        </form>

        {/* Subtle decorative background for the section */}
        <div className="absolute -inset-4 bg-primary/5 rounded-2xl -z-10 scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
      </div>
    </div>
  );
}