import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Mail, MapPin, Briefcase, Calendar, LayoutDashboard } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { getDashboard } from "@/proxy";



// const dummyProfile: Profile = {
//   email: "sarah.johnson@company.com",
//   name: "Sarah Johnson",
//   role: "Senior Product Designer",
//   location: "San Francisco, CA",
//   department: "Design",
//   joinedDate: "March 2022",
// };


// fullName: profile.fullName || '',
//     bio: profile.bio || '',
//     currentLocation: profile.currentLocation || '',
//     visitedCountries: profile.visitedCountries?.join(', ') || '',
//     interests: profile.interests?.join(', ') || '',
//     profileImage: profile.profileImage || '',

const ProfileAvatar = ({ profile  }: { profile: any }) => {
  const firstLetter =  profile?.profile?.fullName?.charAt(0).toUpperCase();

  return (
     <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button
          className="h-10 w-10 rounded-full bg-foreground from-avatar-from to-avatar-to 
            flex items-center justify-center font-semibold text-primary-foreground text-lg
            cursor-pointer transition-all duration-300 ease-out
            hover:scale-110 hover:shadow-lg hover:shadow-primary/20
            focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        >
          {firstLetter}
        </button>
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-80 p-0 overflow-hidden border-border/50 shadow-2xl"
        sideOffset={8}
      >
        {/* Header gradient */}
        <div className="bg-gradient-to-br from-avatar-from to-avatar-to h-20 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTZzLTItNC0yLTYgMi00IDItNi0yLTQtMi02IDItNCAyLTYtMi00LTItNiAyLTQgMi02Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        </div>
        
        {/* Content */}
        <div className="px-5 pb-5">
          {/* Avatar */}
          <div className="-mt-10 mb-4">
            <Avatar className="h-20 w-20 border-4 border-card shadow-lg">
              <AvatarFallback className="bg-gradient-to-br from-avatar-from to-avatar-to text-primary-foreground text-2xl font-bold">
                {profile?.profile?.profileImage ? (
                  <Image
                    src={profile.profile.profileImage}
                    alt={profile.profile.fullName}
                    width={100}
                    height={100}
                    className="object-cover rounded-full"
                  />
                ) : (
                  firstLetter
                )}
              </AvatarFallback>
            </Avatar>
          </div>
          
          {/* Name and location badge */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-lg font-semibold text-foreground leading-tight">
              {profile?.profile?.fullName}
            </h4>
            {profile?.profile?.currentLocation && (
              <Badge variant="secondary" className="text-xs font-medium shrink-0">
                {profile.profile.currentLocation}
              </Badge>
            )}
          </div>
          
          {/* Role badge */}
          {profile?.role && (
            <Badge variant="outline" className="text-xs mt-1">
              {profile.role}
            </Badge>
          )}
          
          {/* Info rows */}
          <div className="space-y-2.5 mt-4">
            {profile?.profile?.bio && (
              <div className="flex items-center gap-3 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground/80 truncate">
                  {profile.profile.bio}
                </span>
              </div>
            )}

            {profile?.email && (
              <div className="flex items-center gap-3 text-sm">
                <svg 
                  className="h-4 w-4 text-muted-foreground flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
                <span className="text-foreground/80 truncate">
                  {profile.email}
                </span>
              </div>
            )}
          </div>
          
          {/* Dashboard Link */}
          <Link
            href={getDashboard(profile?.role)}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 
              bg-primary text-primary-foreground hover:bg-primary/90
              px-4 py-2 rounded-md text-sm font-medium
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <LayoutDashboard className="h-4 w-4" />
            Go to Dashboard
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};


export default ProfileAvatar;
