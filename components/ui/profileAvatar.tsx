import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Mail, MapPin, Briefcase, Calendar } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";



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
  const firstLetter =  profile?.fullName?.charAt(0).toUpperCase();

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button
          className="h-10 w-10 rounded-full bg-gradient-to-br from-avatar-from to-avatar-to 
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
                <Image
                src={profile?.profileImage}
                alt={profile?.fullName}
                width={100}
                height={100}
                className="object-cover"
              />
              </AvatarFallback>
            </Avatar>
          </div>
          
          {/* Name and badge */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-lg font-semibold text-foreground leading-tight">
              {profile?.fullName}
            </h4>
            {profile?.currentLocation && (
              <Badge variant="secondary" className="text-xs font-medium shrink-0">
                {profile.currentLocation}
              </Badge>
            )}
          </div>
          
          {/* Info rows */}
          <div className="space-y-2.5 mt-4">
            
            {profile?.bio && (
              <div className="flex items-center gap-3 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground/80 truncate">
                  {profile.bio}
                </span>
              </div>
            )}

            </div>
            
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};



// const ProfileInfoRow = ({ icon: Icon, value }:any ) => (
//   <div className="flex items-center gap-3 text-sm">
//     <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
//     <span className="text-foreground/80 truncate">{value}</span>
//   </div>
// );

export default ProfileAvatar;
