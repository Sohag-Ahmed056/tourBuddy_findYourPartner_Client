// app/travel-plans/loading.tsx

import { TravelPlansSkeleton } from "@/components/travel/TravelplanSkelton";




export default function Loading() {
  return (
    <div className=" mt-5 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <TravelPlansSkeleton />
    </div>
  );
}