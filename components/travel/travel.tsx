import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import JoinDialog from "../join/Sendjoin";
import ReviewDialog from "../review/Review";
import { Calendar, Compass, MapPin, Wallet, ArrowRight, Star, Globe } from "lucide-react";
import { Badge } from "../ui/badge";
import getAllTravelPlans from "@/services/travels/getAllTravel";
import { Button } from "../ui/button";

interface TravelPlansProps {
  searchParams?: Record<string, string>;
}

export default async function TravelPlans({ searchParams }: TravelPlansProps) {
  const filters = searchParams ? await searchParams : {};
  const { success, data } = await getAllTravelPlans(filters);
  const plans = data?.data || [];

  if (!success) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center border-2 border-dashed rounded-[2rem] bg-destructive/5 border-destructive/20">
        <div className="bg-destructive/10 p-5 rounded-full mb-4 ring-8 ring-destructive/5">
          <MapPin className="w-10 h-10 text-destructive" />
        </div>
        <h3 className="text-xl font-bold tracking-tight">System Unavailable</h3>
        <p className="text-muted-foreground max-w-xs mx-auto mt-2">We're having trouble reaching the travel servers. Please try again shortly.</p>
        <Button variant="outline" className="mt-6 rounded-full px-8" onClick={() => window.location.reload()}>Refresh Page</Button>
      </div>
    );
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { 
      style: "currency", 
      currency: "USD", 
      minimumFractionDigits: 0 
    }).format(amount);

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="space-y-10">
      {plans.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-muted-foreground/20 rounded-[3rem] bg-muted/5 relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            <div className="p-6 bg-background rounded-full shadow-xl mb-6">
                <Globe className="w-12 h-12 text-primary/40 animate-pulse" />
            </div>
            <p className="text-2xl font-black tracking-tight">No Journeys Found</p>
            <p className="text-muted-foreground mt-2 font-medium">Try broadening your search or filters.</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan: any) => (
            <Card 
              key={plan.id} 
              className="group relative flex flex-col overflow-hidden border-border/50 bg-card/50 backdrop-blur-md hover:border-primary/40 transition-all duration-500 hover:shadow-[0_22px_60px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_22px_60px_-15px_rgba(0,0,0,0.5)]"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-blue-500 to-primary/20" />

              <CardHeader className="pb-5 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                       <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
                       <span className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/80">Confirmed Trip</span>
                    </div>
                    <h2 className="text-2xl font-black tracking-tight text-foreground transition-colors line-clamp-1 group-hover:text-primary">
                      {plan.title}
                    </h2>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-bold text-muted-foreground/90 uppercase tracking-wider truncate">
                        {plan.city}, {plan.destination}
                      </span>
                    </div>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-none hover:bg-primary/20 font-bold transition-all px-3">
                    {plan.travelType}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-6">
                {/* Visual Stats Section */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/20 group/stat">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-500 group-hover/stat:scale-110 transition-transform" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Schedule</span>
                    </div>
                    <p className="text-sm font-bold text-foreground/90">
                      {formatDate(plan.startDate)} – {formatDate(plan.endDate)}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/20 group/stat">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Wallet className="w-3.5 h-3.5 text-emerald-500 group-hover/stat:scale-110 transition-transform" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Budget</span>
                    </div>
                    <p className="text-sm font-bold text-foreground/90 truncate">
                      {formatCurrency(plan.budgetMin)}–{formatCurrency(plan.budgetMax)}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Organizer Info */}
                <Link 
                  href={`/user/${plan.touristId}`} 
                  className="flex items-center gap-3 p-1 rounded-2xl transition-all group/author"
                >
                  <div className="relative">
                    <Avatar className="h-11 w-11 ring-2 ring-primary/10 ring-offset-2 ring-offset-background group-hover/author:ring-primary transition-all duration-300">
                      <AvatarImage src={plan.tourist.profileImage} alt={plan.tourist.fullName} />
                      <AvatarFallback className="bg-primary text-primary-foreground font-black text-xs">
                        {getInitials(plan.tourist.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5 border shadow-sm">
                       <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-black text-foreground/90 group-hover/author:text-primary transition-colors truncate">
                      {plan.tourist.fullName}
                    </p>
                    <p className="text-[10px] font-bold text-muted-foreground flex items-center gap-1 uppercase tracking-tighter">
                      Explorer from <span className="text-foreground/60">{plan.tourist.currentLocation}</span>
                    </p>
                  </div>
                </Link>
              </CardContent>

              <CardFooter className="p-6 pt-2 flex flex-col gap-3">
                {/* PERFECT ALIGNMENT: Grid forces equal width and selector forces internal buttons to fill */}
                <div className="grid grid-cols-2 gap-3 w-full [&_button]:w-full [&_div]:w-full">
                  <JoinDialog id={plan.id} />
                  <ReviewDialog id={plan.id} />
                </div>
                
                <Link href={`/travel-plans/${plan.id}`} className="w-full">
                  <Button 
                    variant="default" 
                    className="w-full h-11 bg-foreground text-background dark:bg-primary dark:text-primary-foreground font-black uppercase tracking-widest text-[11px] shadow-lg shadow-primary/5 hover:scale-[1.01] active:scale-[0.99] transition-all group/btn"
                  >
                    View Plan Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}