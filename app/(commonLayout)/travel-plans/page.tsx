import TravelPlans from '@/components/travel/travel'
import TravelPlansSearch from '@/components/travel/travelSearchFilter'
import { MapPin } from 'lucide-react'
import React from 'react'

const TravelPlansPage = async({ searchParams }: any) => {
  const searchParamsObj =await searchParams || {};

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              All Travel Plans
            </h1>
          </div>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Discover amazing travel experiences shared by fellow adventurers. Join a trip or get inspired for your next journey.
          </p>
        </div>
      </div>

      {/* Main Content */}

       <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <TravelPlansSearch />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
       
        <TravelPlans searchParams={searchParamsObj} />
      </div>

     
      
    </div>
   
   
  )
}

export default TravelPlansPage