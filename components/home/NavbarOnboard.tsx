"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Step {
  id: string;
  title: string;
  description: string;
}

export default function NavbarOnboard() {
  const steps: Step[] = [
    {
      id: "nav-links",
      title: "Navigation Menu",
      description: "Use these links to navigate the website easily.",
    },
    {
      id: "login-button",
      title: "Sign In",
      description: "Click here to log into your account.",
    },
    {
      id: "register-button",
      title: "Create Account",
      description: "Click here to sign up and start your journey.",
    },
  ];

  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  // Show onboarding only once
  useEffect(() => {
    const seen = localStorage.getItem("navbar_onboard_done");
    if (!seen) {
      setCurrentStep(0);
    }
  }, []);

  // Update target rectangle whenever step changes
  useEffect(() => {
    if (currentStep === null) return;

    const el = document.getElementById(steps[currentStep].id);
    if (el) {
      const rect = el.getBoundingClientRect();
      setTargetRect(rect);
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep === null) return;

    if (currentStep === steps.length - 1) {
      localStorage.setItem("navbar_onboard_done", "true");
      setCurrentStep(null);
      setTargetRect(null);
      return;
    }

    setCurrentStep((prev) => (prev !== null ? prev + 1 : 0));
  };

  if (currentStep === null || !targetRect) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/30"
      onClick={handleNext} // clicking outside also goes to next
    >
      {/* Highlight */}
      <div
        className="absolute border-2 border-primary rounded-lg pointer-events-none transition-all duration-300"
        style={{
          top: targetRect.top + window.scrollY - 4,
          left: targetRect.left + window.scrollX - 4,
          width: targetRect.width + 8,
          height: targetRect.height + 8,
        }}
      />

      {/* Popover */}
      <div
        className="absolute bg-card p-4 rounded-lg shadow-lg max-w-xs text-foreground pointer-events-auto transition-all duration-300"
        style={{
          top: targetRect.bottom + window.scrollY + 8,
          left: targetRect.left + window.scrollX,
        }}
        onClick={(e) => e.stopPropagation()} // prevent overlay click
      >
        <h3 className="font-bold">{steps[currentStep].title}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {steps[currentStep].description}
        </p>
        <div className="flex justify-end mt-2">
          <Button size="sm" onClick={handleNext}>
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
