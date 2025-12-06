import CreateTravelPlanFormDialog from "@/components/travel/createTravelPlanFormDialog";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/modeToggle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      

      <Button>Hello</Button>
      <CreateTravelPlanFormDialog />


      <div className="mt-11">
        
         <ModeToggle /> 

      </div>

     
      
    </div>
  );
}
