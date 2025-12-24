import { RegisterForm } from '@/components/auth/RegisterForm';
import { Compass, Sparkles } from 'lucide-react';
import React from 'react';

const RegisterPage = () => {
  return (
    // Perfect vertical and horizontal centering
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4 md:p-0">
      <div className="grid w-full max-w-[1400px] min-h-[85vh] lg:grid-cols-2 overflow-hidden border border-border/40 shadow-2xl rounded-[2.5rem] bg-card">
        
        {/* Left Side: Form Container */}
        <div className="flex flex-col gap-4 p-8 md:p-12 lg:p-16">
          {/* Brand Logo */}
          <div className="flex justify-center lg:justify-start">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
              <div className="bg-primary rounded-lg p-1.5 shadow-lg shadow-primary/20 transition-transform hover:rotate-12">
                <Compass className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-foreground">TourBuddy</span>
            </div>
          </div>

          {/* Form Centered within its column */}
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="mb-8 text-center lg:text-left">
                  <h1 className="text-3xl font-black tracking-tight mb-2 text-foreground">Create Account</h1>
                  <p className="text-muted-foreground text-sm">Join our community and start planning your dream journey today.</p>
               </div>
              <RegisterForm />
            </div>
          </div>

          {/* Footer info */}
          <div className="text-center lg:text-left text-[10px] uppercase font-bold tracking-widest text-muted-foreground/50">
            &copy; {new Date().getFullYear()} TourBuddy Inc. All rights reserved.
          </div>
        </div>

        {/* Right Side: Visual Image & Branding */}
        <div className="relative hidden lg:block bg-slate-900 overflow-hidden">
          {/* Subtle Overlay Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-12 text-white">
            <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
              <Compass className="w-8 h-8 text-emerald-400" />
              <span>TourBuddy</span>
            </div>

            <div className="max-w-md">
               <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 w-fit px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-6 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  Your journey starts here
               </div>
               <h2 className="text-4xl font-black leading-tight mb-4 drop-shadow-md">
                  "Adventure is worthwhile in itself."
               </h2>
               <p className="text-lg text-zinc-300 font-medium">
                  Create an account to save itineraries, connect with local guides, and explore the world with confidence.
               </p>
            </div>
          </div>

          {/* Professional Overlays for Readability */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
          <div className="absolute inset-0 z-10 bg-black/20" />

          <img
            src="/login.png" // You can change this to a /register.png for variety
            alt="Adventure Awaits"
            className="absolute inset-0 h-full w-full object-cover grayscale-[10%] hover:scale-110 transition-transform duration-[25s] ease-out"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;