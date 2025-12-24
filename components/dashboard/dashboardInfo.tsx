import { getMyProfile } from "@/services/profile/myProfile";
import { Card, CardContent } from "../ui/card";
import CreateTravelCard from "../travel/createPlanCard";
import { Sparkles, MapPin, Send, User, BadgeCheck, Compass } from "lucide-react";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

export default async function DashboardInfo() {
  const { data } = await getMyProfile();
  const profile = data?.data?.profile;

  if (!profile) return null;

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto min-h-screen transition-colors duration-500">
      
      {/* 1. HERO SECTION */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 dark:bg-zinc-900 p-8 lg:p-12 text-white shadow-2xl">
        {/* Abstract Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
        
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-300">Traveler Dashboard</span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight">
              {getGreeting()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">{profile?.fullName.split(' ')[0]}</span>
            </h1>
            <p className="text-slate-400 text-lg lg:text-xl max-w-2xl font-light leading-relaxed">
              You have <span className="text-white font-semibold">{profile.travelPlans.length} active adventures</span>. Your next journey is just a click away.
            </p>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Redesigned Profile Card (4/12 cols) */}
        <div className="lg:col-span-4">
          <Card className="relative overflow-hidden border-none bg-white dark:bg-zinc-900 shadow-xl group h-full">
            {/* Colorful Header Splash */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 transition-all group-hover:h-36 duration-500" />
            
            <CardContent className="relative p-8 pt-16 flex flex-col items-center">
              {/* Profile Image with Modern Ring */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative p-1.5 bg-white dark:bg-zinc-900 rounded-full shadow-2xl">
                  <img
                    src={profile.profileImage}
                    alt={profile.fullName}
                    className="w-32 h-32 rounded-full object-cover border-2 border-slate-50 dark:border-zinc-800"
                  />
                  <div className="absolute bottom-2 right-2 p-1.5 bg-emerald-500 border-4 border-white dark:border-zinc-900 rounded-full shadow-lg">
                    <BadgeCheck className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* User Identity */}
              <div className="text-center space-y-1">
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {profile.fullName}
                </h3>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1.5 uppercase tracking-wider">
                  <Compass className="w-4 h-4" /> Global Explorer
                </p>
              </div>

              {/* Passport Style Stats */}
              <div className="w-full mt-8 grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-zinc-800/50 p-5 rounded-[2rem] border border-slate-100 dark:border-zinc-800 text-center hover:scale-[1.02] transition-transform">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-1">Plans</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">{profile.travelPlans.length}</p>
                </div>
                <div className="bg-slate-50 dark:bg-zinc-800/50 p-5 rounded-[2rem] border border-slate-100 dark:border-zinc-800 text-center hover:scale-[1.02] transition-transform">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-1">Sent</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">{profile.joinRequestsSent.length}</p>
                </div>
              </div>

              {/* Footer Meta */}
              <div className="w-full mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Account Status</span>
                <span className="text-emerald-500">Active</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Stats & Actions (8/12 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Travel Stats Card */}
            <Card className="border-none shadow-lg dark:bg-zinc-900 overflow-hidden group">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl group-hover:rotate-6 transition-transform">
                    <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-slate-900 dark:text-white leading-none">
                      {profile.travelPlans.length}
                    </span>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1 text-nowrap">Current Itineraries</p>
                  </div>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between text-xs font-bold uppercase tracking-tighter text-slate-500">
                      <span>Trip Capacity</span>
                      <span>{profile.travelPlans.length}/10</span>
                   </div>
                   <div className="h-2.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${Math.min(profile.travelPlans.length * 10, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requests Stats Card */}
            <Card className="border-none shadow-lg dark:bg-zinc-900 overflow-hidden group">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl group-hover:rotate-6 transition-transform">
                    <Send className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-slate-900 dark:text-white leading-none">
                      {profile.joinRequestsSent.length}
                    </span>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1 text-nowrap">Join Requests</p>
                  </div>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between text-xs font-bold uppercase tracking-tighter text-slate-500">
                      <span>Approval Rate</span>
                      <span>High</span>
                   </div>
                   <div className="h-2.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${Math.min(profile.joinRequestsSent.length * 20, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Create Plan Section */}
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl">
            <CreateTravelCard />
          </div>
        </div>

      </div>
    </div>
  );
}