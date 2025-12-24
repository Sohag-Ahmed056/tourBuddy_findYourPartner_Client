"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I know if a travel buddy is verified?",
    answer: "Every member goes through a multi-step verification process including email validation, social media linking, and optional government ID checks. Verified members carry a blue badge on their profile.",
  },
  {
    question: "Is TravelBuddy free to use?",
    answer: "Joining the community and browsing trips is completely free. We offer a Premium tier for advanced filtering, unlimited messaging, and priority support to help you find the perfect match faster.",
  },
  {
    question: "How do group trips work?",
    answer: "Anyone can create a travel plan. Once posted, other travelers can request to join. The creator reviews profiles and accepts buddies based on shared interests and travel styles.",
  },
  {
    question: "What happens if a trip gets cancelled?",
    answer: "We recommend all users discuss cancellation plans in their group chat. TravelBuddy provides a secure messaging platform to coordinate logistics and emergency backups.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-background transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-3xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 mb-4 rounded-xl bg-primary/10 text-primary">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about finding your next adventure companion.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                "group border rounded-2xl transition-all duration-300 overflow-hidden",
                openIndex === index 
                  ? "border-primary/50 bg-primary/[0.02] shadow-sm" 
                  : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
              )}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className={cn(
                  "font-semibold text-base transition-colors",
                  openIndex === index ? "text-primary" : "text-zinc-700 dark:text-zinc-300"
                )}>
                  {faq.question}
                </span>
                <ChevronDown 
                  className={cn(
                    "w-5 h-5 text-zinc-400 transition-transform duration-300",
                    openIndex === index && "rotate-180 text-primary"
                  )} 
                />
              </button>

              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Support Link */}
        <div className="mt-10 text-center p-6 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <p className="text-sm text-muted-foreground">
            Still have questions?{" "}
            <a href="/help" className="text-primary font-bold hover:underline">
              Contact our support team
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}