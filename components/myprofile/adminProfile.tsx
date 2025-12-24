import React from 'react';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { getMyProfile } from '@/services/profile/myProfile';
import { UpdateProfileButton } from './updateProfileButton';
import { 
  ShieldCheck, 
  Settings, 
  Activity, 
  Users, 
  Mail, 
  Calendar,
  Lock,
  LayoutDashboard,
  UserCircle
} from 'lucide-react';
import getAllUser from '@/services/user/getAlluser';
import getAllTravelPlans from '@/services/travels/getAllTravel';

const AdminProfile = async () => {
  const { data } = await getMyProfile();
  const{  data: userData } = await getAllUser();
  const {data:travelPlan}= await getAllTravelPlans()
  const profile = data?.data;
  const totalUsers = userData?.data?.length || 0;
    const totalTravelPlans = travelPlan?.data?.length || 0;

  if (!profile) return null;

  // Admin fallbacks
  const adminName =  "System Administrator";
  const role = "Super Admin"; // Or pull from your auth context
  const joinDate = profile.createdAt ? new Date(profile.createdAt).getFullYear() : 2024;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-8 animate-in fade-in duration-500">
      
      {/* ======== Admin Header Section ======== */}
      <section className="relative overflow-hidden rounded-[2rem] bg-zinc-900 dark:bg-black border border-zinc-800 p-8 md:p-10 shadow-2xl">
        {/* Subtle Tech Pattern (Grid) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          {/* Avatar with Status Ring */}
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-zinc-700 p-1 bg-zinc-800">
              {profile.profileImage ? (
                <Image
                  src={profile.profileImage}
                  alt={adminName}
                  width={160}
                  height={160}
                  className="object-cover rounded-xl"
                />
              ) : (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                  <UserCircle className="w-16 h-16 text-zinc-600" />
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-lg shadow-lg border-2 border-zinc-900">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          {/* Admin Identity */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  {adminName}
                </h1>
                <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground uppercase tracking-tighter px-3">
                  {role}
                </Badge>
              </div>
              <p className="text-zinc-400 text-sm font-medium flex items-center justify-center md:justify-start gap-4">
                <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {profile.email}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Access granted {joinDate}</span>
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                
                
                <UpdateProfileButton profile={profile} />
            </div>
          </div>
        </div>
      </section>

      {/* ======== Admin Control Bento Grid ======== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Quick Stats Card */}
        <div className="p-6 rounded-[1.5rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-foreground">Session Metrics</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-sm text-muted-foreground">System Health</span>
              <span className="text-sm font-bold text-emerald-500">99.9%</span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[99%]" />
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-sm text-muted-foreground">Admin Actions</span>
              <span className="text-sm font-bold text-foreground">1,240</span>
            </div>
          </div>
        </div>

        {/* User Management Overview */}
        <div className="p-6 rounded-[1.5rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-foreground">Platform Access</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
              <p className="text-[10px] uppercase font-bold text-zinc-400">Total Users</p>
              <p className="text-xl font-bold">{totalUsers}</p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
              <p className="text-[10px] uppercase font-bold text-zinc-400">Total Travel Plans</p>
              <p className="text-xl font-bold text-rose-500">{totalTravelPlans}</p>
            </div>
          </div>
        </div>

        {/* Security Logs Card */}
       

      </div>
    </div>
  );
};

export default AdminProfile;