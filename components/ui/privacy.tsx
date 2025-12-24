"use client";

import React from "react";
import { ShieldCheck, Eye, Lock, Globe, FileText, ChevronRight } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    { id: "data-collection", title: "Data Collection", icon: Eye },
    { id: "data-usage", title: "How We Use Data", icon: Globe },
    { id: "security", title: "Security Protocols", icon: Lock },
    { id: "third-party", title: "Third-Party Sharing", icon: ShieldCheck },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500">
      {/* Header */}
      <div className="relative py-20 bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-indigo-600/10 text-indigo-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              Legal Framework
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl">
            Last Updated: December 23, 2025. We value your trust and are committed to protecting your personal travel data.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 h-fit hidden lg:block">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="w-full flex items-center justify-between p-4 rounded-xl text-left text-sm font-bold text-zinc-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <section.icon className="w-4 h-4" />
                    {section.title}
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </nav>
            <div className="mt-8 p-6 rounded-2xl bg-zinc-900 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Need Help?</p>
              <p className="text-sm leading-relaxed mb-4">Have questions about your data rights?</p>
                 <span className="text-indigo-400 font-bold cursor-pointer">Contact our Privacy Team</span>
            </div>
          </aside>

          {/* Policy Content */}
          <main className="lg:col-span-9 space-y-20">
            
            {/* Section 1 */}
            <section id="data-collection" className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-1.5 bg-indigo-600 rounded-full" />
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">1. Data Collection</h2>
              </div>
              <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  We collect information that you provide directly to us when you create an account, update your profile, or plan a trip. This includes:
                </p>
                <ul className="grid md:grid-cols-2 gap-4 list-none p-0">
                  <li className="flex gap-3 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <FileText className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span><strong>Identity:</strong> Full name, date of birth, and passport-style verification images.</span>
                  </li>
                  <li className="flex gap-3 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <Globe className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span><strong>Location:</strong> Current city and history of visited countries for travel matching.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section id="data-usage" className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-1.5 bg-indigo-600 rounded-full" />
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">2. How We Use Data</h2>
              </div>
              <div className="text-zinc-600 dark:text-zinc-400 space-y-4">
                <p>Your information serves three primary purposes in our travel ecosystem:</p>
                <div className="grid gap-6">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-sm">01</div>
                    <div>
                      <h4 className="font-bold text-zinc-900 dark:text-white mb-1">Algorithm Matching</h4>
                      <p className="text-sm">Connecting you with travelers who share your specific interests like hiking or photography.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-sm">02</div>
                    <div>
                      <h4 className="font-bold text-zinc-900 dark:text-white mb-1">Safety Verifications</h4>
                      <p className="text-sm">Ensuring all platform members are real people through our multi-step verification process.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="security" className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-1.5 bg-indigo-600 rounded-full" />
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">3. Security Protocols</h2>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-indigo-600 text-white relative overflow-hidden">
                <Lock className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10" />
                <p className="relative z-10 text-lg leading-relaxed font-medium">
                  We use industry-standard AES-256 encryption to protect your sensitive data. All passport and ID uploads are automatically deleted from our active servers once verification is complete.
                </p>
              </div>
            </section>

            {/* Footer Notice */}
            <div className="pt-10 border-t border-zinc-200 dark:border-zinc-800 text-center">
              <p className="text-sm text-zinc-500">
                Questions about GDPR or CCPA? Email <span className="text-indigo-600 font-bold">sohagahmed056@gmail.com</span>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}