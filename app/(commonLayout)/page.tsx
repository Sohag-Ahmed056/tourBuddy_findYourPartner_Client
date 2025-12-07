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
      <div className="w-full flex justify-center">
        <TravelPlans />
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-12 mb-12">
        <Footer />
      </div>

    </div>
  );
}
