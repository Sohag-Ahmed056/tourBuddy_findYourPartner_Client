// REMOVE "use client" from here
import WhyChooseUs from "@/components/home/Choose";
import FAQ from "@/components/home/FAQ";
import { Footer } from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection"; // Import the wrapper
import Newsletter from "@/components/home/NewsLetter";
import Testimonials from "@/components/home/testimonial";
import HowItWorks from "@/components/home/UsesGuide";
import TravelPlans from "@/components/travel/travel";
import HelpAndContact from "@/components/ui/help";
import HelpHub from "@/components/ui/help";
import HelpCenter from "@/components/ui/help";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-black flex flex-col items-center justify-start font-sans">
      
      {/* Combined Hero and AI Suggestion */}
      <HeroSection />

      {/* 3. Travel Plans Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 w-full">
        <div className="flex flex-col items-center mb-10 text-center">
           <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
             Adventure is Calling
           </h2>
           <p className="text-muted-foreground mt-2 max-w-lg">
             Explore all current community travel plans and join the next journey.
           </p>
        </div>
        <TravelPlans />
      </div>

      {/* 4. Other Sections */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 w-full">
        <WhyChooseUs />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 w-full">
        <Testimonials />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 w-full">
        <HowItWorks />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 w-full">
        <FAQ />
      </div>
      <div >
        <Newsletter />
      </div>

      
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 w-full">
        <Footer />
      </div>
    </div>
  );
}