import { Footer } from "@/components/home/Footer";
import { TravelHero } from "@/components/home/Hero";
import CreateTravelPlanFormDialog from "@/components/travel/createTravelPlanFormDialog";
import TravelPlans from "@/components/travel/travel";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/modeToggle";
import Image from "next/image";

export default function Home() {
  return (
     <div className="min-h-screen w-full bg-zinc-50 dark:bg-black flex flex-col items-center justify-start font-sans">

      {/* Centered Hero Section */}
      <div className="w-full flex justify-center">
        <TravelHero />
      </div>

      {/* Centered Travel Plans */}
         
       <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
            <h1 className=" mb-8 font-display text-3xl md:text-4xl text text-center font-bold text-foreground tracking-tight">
              All Travel Plans
            </h1>
              <TravelPlans />
            </div>
      <div className="w-full flex flex-col items-center justify-center mt-12 mb-12">
        <Footer />
      </div>

    </div>
  );
}
