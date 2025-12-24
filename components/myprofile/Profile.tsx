import React from 'react';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { getMyProfile } from '@/services/profile/myProfile';
import { Separator } from '../ui/separator';
import { UpdateProfileButton } from './updateProfileButton';
import { MapPin, Calendar, Globe2, Heart, UserCircle } from 'lucide-react';

const Profile = async () => {
  const { data } = await getMyProfile();
  const profile = data?.data?.profile;

  if (!profile) return null;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 space-y-12 animate-in fade-in duration-700">
      
      {/* ======== Premium Header Section ======== */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 p-8 lg:p-12 shadow-sm">
        {/* Abstract Background Accents */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Avatar with Animated Border */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-primary via-blue-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-white dark:border-zinc-950 shadow-2xl">
              {profile.profileImage ? (
                <Image
                  src={profile.profileImage}
                  alt={profile.fullName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center">
                  <UserCircle className="w-20 h-20 text-slate-300 dark:text-zinc-600" />
                </div>
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 space-y-5 text-center md:text-left">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-zinc-400">
                {profile.fullName}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-medium text-slate-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800">
                  <MapPin className="w-4 h-4 text-primary" /> {profile.currentLocation}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800">
                  <Calendar className="w-4 h-4 text-blue-500" /> Joined {new Date(profile.created_at).getFullYear()}
                </span>
              </div>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-zinc-400 max-w-2xl leading-relaxed italic">
              &ldquo;{profile.bio}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ======== Info Bento Grid ======== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Interests Card */}
        <div className="group p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-500">
              <Heart className="w-6 h-6" fill="currentColor" />
            </div>
            <h2 className="text-xl font-bold dark:text-white">Interests</h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {profile.interests.map((interest: string) => (
              <Badge 
                key={interest} 
                variant="secondary" 
                className="px-4 py-1.5 text-sm font-medium transition-all bg-slate-100 dark:bg-zinc-800 hover:bg-primary hover:text-white border-none"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Visited Countries Card */}
        <div className="group p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500">
                <Globe2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold dark:text-white">Travel History</h2>
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-lg">
              {profile.visitedCountries.length} Countries
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5 mb-6">
            {profile.visitedCountries.map((country: string) => (
              <Badge
                key={country}
                variant="outline"
                className="px-4 py-1.5 text-sm font-medium border-slate-200 dark:border-zinc-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
              >
                <span className="mr-2">🌍</span> {country}
              </Badge>
            ))}
          </div>
          
          <div className="pt-4 border-t border-slate-100 dark:border-zinc-800">
            <UpdateProfileButton profile={profile} />
          </div>
        </div>

      </div>

      {/* Optional: Footer decoration */}
      <div className="flex justify-center opacity-20">
        <div className="w-1 h-1 rounded-full bg-slate-400 mx-1" />
        <div className="w-1 h-1 rounded-full bg-slate-400 mx-1" />
        <div className="w-1 h-1 rounded-full bg-slate-400 mx-1" />
      </div>

    </div>
  );
};

export default Profile;