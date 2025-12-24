import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Mail, MapPin, Briefcase, Calendar, LayoutDashboard, ShieldCheck, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { getDashboard } from "@/proxy";

const ProfileAvatar = ({ profile }: { profile: any }) => {
  const firstLetter = profile?.profile?.fullName?.charAt(0).toUpperCase();
  const role = profile?.role || "Member";

  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger asChild>
        <button
          className="relative h-10 w-10 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 
            transition-all duration-300 hover:scale-110 active:scale-95 group shadow-md hover:shadow-primary/20"
        >
          <div className="flex h-full w-full items-center justify-center rounded-full bg-background dark:bg-zinc-950 transition-colors group-hover:bg-transparent">
             <span className="font-bold text-sm bg-gradient-to-tr from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent group-hover:text-white">
              {profile?.profile?.profileImage ? (
                 <Image
                    src={profile.profile.profileImage}
                    alt={profile.profile.fullName}
                    width={40}
                    height={40}
                    className="rounded-full object-cover h-full w-full"
                  />
              ) : firstLetter}
            </span>
          </div>
        </button>
      </HoverCardTrigger>

      <HoverCardContent 
        className="w-80 p-0 overflow-hidden border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-2xl rounded-2xl"
        sideOffset={12}
      >
        {/* Dynamic Header Gradient */}
        <div className="relative h-24 w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
          <div className="absolute inset-0 bg-black/10" />
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '16px 16px' }} />
          
          <div className="absolute -bottom-1 w-full h-8 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent" />
        </div>
        
        <div className="relative px-5 pb-5">
          {/* Floating Avatar with Status Ring */}
          <div className="-mt-12 mb-4 relative inline-block">
            <Avatar className="h-20 w-20 border-4 border-white dark:border-zinc-950 shadow-xl ring-1 ring-black/5 dark:ring-white/5">
                <AvatarFallback className="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 text-2xl font-black">
                    {profile?.profile?.profileImage ? (
                    <Image
                        src={profile.profile.profileImage}
                        alt={profile.profile.fullName}
                        width={100}
                        height={100}
                        className="object-cover"
                    />
                    ) : (
                    <span className="bg-gradient-to-br from-indigo-500 to-purple-500 bg-clip-text text-transparent">{firstLetter}</span>
                    )}
                </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-1 right-1 h-5 w-5 bg-emerald-500 border-[3px] border-white dark:border-zinc-950 rounded-full shadow-sm" />
          </div>
          
          {/* Name and Verification */}
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {profile?.profile?.fullName}
            </h4>
            <ShieldCheck className="h-4 w-4 text-blue-500 fill-blue-500/10" />
          </div>
          
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">
            {role}
          </p>
          
          {/* Detail Rows */}
          <div className="space-y-3 py-4 border-y border-zinc-100 dark:border-zinc-800/50">
            {profile?.profile?.currentLocation && (
              <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800">
                    <MapPin className="h-3.5 w-3.5" />
                </div>
                <span className="font-medium">{profile.profile.currentLocation}</span>
              </div>
            )}

            {profile?.email && (
              <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800">
                    <Mail className="h-3.5 w-3.5" />
                </div>
                <span className="font-medium truncate">{profile.email}</span>
              </div>
            )}
          </div>
          
          {/* Bio Section */}
          {profile?.profile?.bio && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-4 leading-relaxed italic">
              "{profile.profile.bio}"
            </p>
          )}

          {/* Action Button */}
          <Link
            href={getDashboard(profile?.role)}
            className="group mt-6 w-full inline-flex items-center justify-between
              bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 
              px-5 py-2.5 rounded-xl text-sm font-bold
              transition-all duration-300 hover:shadow-lg hover:shadow-primary/10
              active:scale-[0.98]"
          >
            <div className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
            </div>
            <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProfileAvatar;