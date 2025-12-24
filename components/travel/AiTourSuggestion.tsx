"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { getAITravelSuggestion } from "@/services/ai/aiService";

import {
  Calendar,
  Compass,
  DollarSign,
  Loader2,
  MapPin,
  Plane,
  Sparkles,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import JoinDialog from "../join/Sendjoin";

export default function AITourSuggestion() {
  const [preferences, setPreferences] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedTours, setSuggestedTours] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleGetSuggestion = async () => {
    if (!preferences.trim() || preferences.trim().length < 5) {
      toast.error("Please describe your travel interests (at least 5 characters)");
      return;
    }

    setIsLoading(true);
    setSuggestedTours([]);
    setShowSuggestions(false);

    try {
      const response = await getAITravelSuggestion(preferences);
      if (response.success && response.data) {
        setSuggestedTours(response.data);
        setShowSuggestions(true);
        toast.success("Found the best trips for you!");
      } else {
        toast.error(response.message || "Failed to get AI suggestions");
      }
    } catch (error) {
      toast.error("Failed to get AI suggestion. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full bg-gradient-to-br from-blue-50/50 via-background to-emerald-50/50 dark:from-emerald-950/20 dark:via-background dark:to-blue-950/20 border-emerald-200/50 dark:border-emerald-800/50 shadow-lg">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 bg-emerald-600 rounded-lg shrink-0">
            <Compass className="h-5 w-5 text-white" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-lg sm:text-xl text-emerald-800 dark:text-emerald-400">
              AI Trip Finder
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-emerald-700/80 dark:text-emerald-500/80">
              Tell us your dream vibe, and we'll match you with active plans. This AI
              assistant scours our travel plans to find your perfect adventure buddy.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
        <div>
          <Textarea
            placeholder="e.g., I want a budget-friendly solo trip to Rajshahi this winter..."
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            rows={4}
            className="text-sm sm:text-base resize-none border-emerald-200 dark:border-emerald-800 bg-background focus:border-emerald-500 focus:ring-emerald-500/20"
            disabled={isLoading}
          />
        </div>

        <Button
          onClick={handleGetSuggestion}
          disabled={isLoading || preferences.trim().length < 5}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-colors h-11 sm:h-12"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Finding matches...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Find My Next Adventure
            </>
          )}
        </Button>

        {showSuggestions && suggestedTours.length > 0 && (
          <div className="space-y-4 p-3 sm:p-4 bg-emerald-50/30 dark:bg-emerald-950/20 rounded-xl border-2 border-emerald-100 dark:border-emerald-900/50">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                <Plane className="h-3 w-3 mr-1" />
                {suggestedTours.length} Matches
              </Badge>
            </div>

            <div className="space-y-4">
              {suggestedTours.map((tour) => (
                <div key={tour.id} className="p-4 bg-background rounded-xl border border-emerald-100 dark:border-emerald-800 shadow-sm hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    {/* Organizer Image - Centered on mobile */}
                    <div className="shrink-0 mx-auto sm:mx-0">
                      {tour.organizerImage ? (
                        <Image
                          src={tour.organizerImage}
                          alt={tour.organizerName}
                          width={48}
                          height={48}
                          className="rounded-full border-2 border-emerald-200 dark:border-emerald-800 h-12 w-12 object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                          {tour.organizerName?.[0] || 'U'}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 w-full space-y-3">
                      <div className="text-center sm:text-left">
                        <h4 className="font-bold text-foreground text-base sm:text-lg leading-tight">
                          {tour.title}
                        </h4>
                        <div className="flex items-center justify-center sm:justify-start gap-1 text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                          <MapPin className="h-3 w-3" />
                          {tour.city}, {tour.destination}
                        </div>
                      </div>

                      <div className="bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-md text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 italic border-l-4 border-emerald-400">
                        "{tour.matchReason}"
                      </div>

                      {/* Details Grid - Single column on mobile, 2 columns on tablet+ */}
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span>Starts: {new Date(tour.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span>Ends: {new Date(tour.endDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span>{tour.travelType}</span>
                        </div>
                        <div className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-400">
                          <DollarSign className="h-4 w-4 shrink-0" />
                          <span>{tour.budget} BDT</span>
                        </div>
                      </div>

                      {/* Action Buttons - Full width on mobile */}
                      <div className="flex flex-col xs:flex-row gap-2 pt-3 border-t border-emerald-50 dark:border-emerald-900/50">
                        <Link href={`/travel-plans/${tour.id}`} className="w-full">
                          <Button size="sm" variant="default" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                            View Details
                          </Button>
                        </Link>
                        <div className="w-full">
                          <JoinDialog id={tour.id} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}