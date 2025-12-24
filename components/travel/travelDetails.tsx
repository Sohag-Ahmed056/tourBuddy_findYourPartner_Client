import getSingleTravelPlan from "@/services/travels/getSingleTravel";
import { Button } from "../ui/button";
import { ArrowLeft, Calendar, Compass, MapPin, User, Wallet, Info, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import JoinDialog from "../join/Sendjoin";
import StartChatButton from "../chat/StartChatButton";

export default async function TravelDetails({ params }: any) {
  const { id } = await params;
  const response = await getSingleTravelPlan(id);
  const plan = response?.data;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  if (!plan) return <div className="h-screen flex items-center justify-center text-muted-foreground">Plan not found.</div>;

  return (
    <div className="mt-5 min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20">
      {/* 1. HERO SECTION: Uses a vibrant Indigo-to-Emerald mesh */}
      <div className="relative h-[45vh] min-h-[400px] w-full overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_30%,#4f46e5,transparent_50%),radial-gradient(circle_at_80%_70%,#10b981,transparent_50%)]" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 via-transparent to-transparent" />

        <div className="relative z-20 max-w-7xl mx-auto p-6 h-full flex flex-col justify-between">
          <Link href="/travel-plans">
            <Button variant="ghost" className="w-fit text-white hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          </Link>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge className="mb-4 bg-indigo-500/20 text-indigo-300 border-indigo-500/30 backdrop-blur-xl px-4 py-1">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              {plan.travelType}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              {plan.title}
            </h1>
            <div className="flex mb-8 items-center gap-2 text-white/90 bg-white/5 w-fit px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-md">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <span className="text-lg font-medium">{plan.city}, {plan.destination}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Summary Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-card border border-border/50 p-6 rounded-[2rem] shadow-sm flex items-center gap-5">
                 <div className="p-4 bg-blue-500/10 rounded-2xl">
                    <Calendar className="w-8 h-8 text-blue-500" />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Date Range</p>
                    <p className="font-bold text-base">{formatDate(plan.startDate)} - {formatDate(plan.endDate)}</p>
                 </div>
              </div>
              <div className="bg-card border border-border/50 p-6 rounded-[2rem] shadow-sm flex items-center gap-5">
                 <div className="p-4 bg-emerald-500/10 rounded-2xl">
                    <Wallet className="w-8 h-8 text-emerald-500" />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Price Point</p>
                    <p className="font-bold text-base">{formatCurrency(plan.budgetMin)} - {formatCurrency(plan.budgetMax)}</p>
                 </div>
              </div>
            </div>

            {/* Overview Card */}
            <Card className="border-none shadow-xl shadow-black/5 bg-card/60 backdrop-blur-sm rounded-[2.5rem]">
              <CardHeader className="p-8">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-5 h-5 text-indigo-500" />
                  <span className="text-xs font-black uppercase tracking-widest text-indigo-500">Trip Story</span>
                </div>
                <CardTitle className="text-3xl font-bold">About this Expedition</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-10">
                <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-wrap">
                  {plan.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 3. SIDEBAR */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="border-none shadow-2xl bg-slate-900 text-white rounded-[2.5rem] overflow-hidden">
               <div className="p-8">
                  <h3 className="text-indigo-300 font-bold uppercase text-xs tracking-widest mb-6">Booking Details</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between">
                       <span className="text-zinc-400">Total Budget</span>
                       <span className="font-black text-2xl text-emerald-400">{formatCurrency(plan.budgetMax)}</span>
                    </div>
                    <Separator className="bg-white/10" />
                    <div className="flex justify-between text-sm">
                       <span className="text-zinc-400">Travel Type</span>
                       <span className="font-bold">{plan.travelType}</span>
                    </div>
                  </div>
                  <Button className="w-full h-14 rounded-2xl bg-white hover:bg-indigo-500 text-white font-bold text-lg transition-all active:scale-95 shadow-lg shadow-indigo-600/20">
                     <JoinDialog id={plan.id} /> 
                  </Button>
               </div>
            </Card>

            {/* Host Profile */}
            <Card className="rounded-[2.5rem] border-border/50 bg-card p-6 shadow-lg">
               <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">Your Guide</p>
               <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 ring-4 ring-indigo-500/10">
                     <AvatarImage src={plan.tourist.profileImage} />
                     <AvatarFallback className="bg-muted">{getInitials(plan.tourist.fullName)}</AvatarFallback>
                  </Avatar>
                  <div>
                     <h4 className="font-bold text-lg leading-tight">{plan.tourist.fullName}</h4>
                     <p className="text-sm text-muted-foreground">{plan.tourist.currentLocation}</p>
                  </div>
               </div>
               <Link href={`/user/${plan.touristId}`}>
                  <Button variant="outline" className="w-full mt-6 rounded-xl border-dashed hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/20">
                    View Public Profile
                  </Button>
               </Link>
               <div className="mt-6 pt-4 border-t border-border/50 flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Verified Community Member</span>
               </div>
               <div>
                 <StartChatButton travelPlanId={plan.id} otherUserId={plan.tourist.userId} />
               </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}