import { getMyProfile } from "@/services/profile/myProfile";
import { Sparkles, Users, PlaneTakeoff, ShieldCheck } from "lucide-react";
import getAllTravelPlans from "@/services/travels/getAllTravel";
import getAllUser from "@/services/user/getAlluser";
import UserActivationChart from "../chart/UserActivationChart";
import TravelPlanChart from "../chart/TravelPlanActivationBarChart";

// Import your chart components here

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

export default async function AdminDashboardInfo() {
  const { data } = await getMyProfile();
  const { data: travels } = await getAllTravelPlans();
  const { data: UserData } = await getAllUser();
  
  const travelPlans = travels?.data || [];
  const users = UserData?.data || [];
  const profile = data?.data;

  if (!profile) return null;

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto min-h-screen transition-colors duration-500">
      
      {/* 1. HERO SECTION */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 dark:bg-zinc-950 p-8 lg:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-300">System Oversight</span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight">
              {getGreeting()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">Admin</span>
            </h1>
            <p className="text-slate-400 text-lg font-medium">Monitoring platform growth and traveler activity.</p>
          </div>
        </div>
      </div>

      {/* 2. QUICK STATS SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-5">
          <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-500">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Total Users</p>
            <h2 className="text-3xl font-black">{users.length}</h2>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-5">
          <div className="p-4 rounded-2xl bg-primary/10 text-primary">
            <PlaneTakeoff className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Total Plans</p>
            <h2 className="text-3xl font-black">{travelPlans.length}</h2>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-5 md:col-span-2 lg:col-span-1">
          <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-500">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-500 uppercase tracking-wider">System Health</p>
            <h2 className="text-3xl font-black">99.9%</h2>
          </div>
        </div>
      </div>

      {/* 3. CHARTS SECTION (BENTO GRID) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Activation Chart */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <UserActivationChart users={users} />
        </div>

        {/* Travel Activity Chart */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <TravelPlanChart plans={travelPlans} />
        </div>
      </div>

    </div>
  );
}