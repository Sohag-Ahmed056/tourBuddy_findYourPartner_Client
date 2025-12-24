"use client";

import { Target, Lightbulb, ShieldAlert, HeartHandshake, Globe2, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const motive = {
  title: "Our Motive",
  subtitle: "Why We Exist",
  description: "TravelBuddy was born from a simple observation: the world is vast, but solo travel can often feel small and isolating. Our motive is to democratize global exploration by removing the fear of being alone. We believe that by connecting like-minded people, we don't just facilitate trips—we build a global support system for curiosity.",
};

const objectives = [
  {
    title: "Safety & Verification",
    desc: "To provide a secure environment where every traveler is verified, ensuring peace of mind before the first flight is booked.",
    icon: ShieldAlert
  },
  {
    title: "Meaningful Connection",
    desc: "To move beyond 'roommate finding' and create matches based on shared values, interests, and travel styles.",
    icon: HeartHandshake
  },
  {
    title: "Global Accessibility",
    desc: "To make travel accessible for those who have the means and the heart to explore but lack a companion to share the journey.",
    icon: Globe2
  }
];

const challenges = [
  {
    item: "Building Trust in a Digital Age",
    detail: "Creating a vetting system that is rigorous enough to ensure safety but seamless enough to encourage community growth."
  },
  {
    item: "Cultural Nuances",
    detail: "Bridging the gap between different social norms and expectations when pairing travelers from diverse backgrounds."
  },
  {
    item: "Real-time Reliability",
    detail: "Managing the logistics of travel plans that are constantly changing due to flights, weather, or personal shifts."
  }
];

const About = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-indigo-100">
      
      {/* 1. Header: Minimalist and Bold */}
      <section className="py-20 border-b border-zinc-100 dark:border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold tracking-widest text-xs uppercase mb-4">
              <Sparkles className="w-4 h-4" /> About TravelBuddy
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
              Making the world feel <br /> 
              <span className="text-zinc-400 dark:text-zinc-600">a little bit smaller.</span>
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We are a community-driven platform dedicated to the idea that no one should 
              miss out on the beauty of the world simply because they don't have a partner to go with.
            </p>
          </div>
        </div>
      </section>

      {/* 2. The Motive & Objectives */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Left: Motive */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-500">{motive.subtitle}</h2>
              <h3 className="text-3xl font-bold">{motive.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                {motive.description}
              </p>
              <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <p className="font-medium italic text-zinc-700 dark:text-zinc-300">
                  "Our goal isn't just to help you find a traveler; it's to help you find your community in every corner of the globe."
                </p>
              </div>
            </div>

            {/* Right: Objectives */}
            <div className="lg:col-span-7">
              <div className="grid gap-8">
                {objectives.map((obj, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 transition-colors">
                      <obj.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{obj.title}</h4>
                      <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {obj.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Challenges Section */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">The Challenges We Face</h2>
              <p className="text-zinc-500">Connecting strangers across borders isn't easy, but it's worth it.</p>
            </div>
            
            <div className="grid gap-6">
              {challenges.map((c, i) => (
                <div key={i} className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{c.item}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-xl">{c.detail}</p>
                  </div>
                  <div className="text-xs font-black text-zinc-300 dark:text-zinc-700 uppercase">Challenge 0{i+1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Community/Help Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <div className="inline-block p-3 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 mb-6">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h2 className="text-4xl font-bold mb-8">How People Have Helped</h2>
          <div className="grid gap-6 text-left">
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <p className="text-zinc-600 dark:text-zinc-400"><strong className="text-zinc-900 dark:text-white">Community Feedback:</strong> Our first 1,000 users helped us refine our verification process by suggesting ID-check tiers.</p>
              </div>
              <div className="flex gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <p className="text-zinc-600 dark:text-zinc-400"><strong className="text-zinc-900 dark:text-white">Local Guides:</strong> Seasoned travelers have volunteered their time to write safety guides for over 50 major cities.</p>
              </div>
              <div className="flex gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <p className="text-zinc-600 dark:text-zinc-400"><strong className="text-zinc-900 dark:text-white">Open Beta Testers:</strong> Hundreds of developers and travelers helped us iron out the real-time matching algorithm we use today.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Minimalist CTA */}
      <section className="py-20 border-t border-zinc-100 dark:border-zinc-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-6">Want to contribute to our mission?</h2>
          <Link href="/register" className="btn btn-primary bg-blue-900 rounded border-2 p-4">Get Started</Link>
        </div>
      </section>
    </main>
  );
};

export default About;