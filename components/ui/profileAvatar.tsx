import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Mail, MapPin, Phone, Building2, Calendar } from "lucide-react";

const ProfileAvatar = ({ profile }: { profile: any; }) => {
  const firstLetter = profile.fullName

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button
          className={`h-10 w-10 text-lg rounded-full bg-gradient-to-br from-avatar-from to-avatar-to 
            flex items-center justify-center font-semibold text-primary-foreground 
            cursor-pointer transition-all duration-300 ease-out
            hover:scale-110 hover:shadow-lg hover:shadow-primary/25
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
        >
          {firstLetter}
        </button>
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-80 p-0 overflow-hidden border-border/50 shadow-xl"
        sideOffset={8}
      >
        <div className="bg-gradient-to-br from-avatar-from to-avatar-to h-16" />
        <div className="px-4 pb-4">
          <div className="-mt-8 mb-3">
            <div className="h-16 w-16 rounded-full bg-white text-black from-avatar-from to-avatar-to 
              flex items-center justify-center text-2xl font-bold 
              border-4 border-card shadow-md">
              {firstLetter}
            </div>
          </div>
          
          {profile.name && (
            <h4 className="text-lg  text-black font-semibold mb-1">
              {profile.name}
            </h4>
          )}
          
          <div className="space-y-2.5 mt-3">
            <ProfileInfoRow icon={Mail} value={profile.fullName} />
            {profile.phone && <ProfileInfoRow icon={Phone} value={profile.phone} />}
            {profile.location && <ProfileInfoRow icon={MapPin} value={profile.location} />}
            {profile.company && <ProfileInfoRow icon={Building2} value={profile.company} />}
            {profile.joinedDate && <ProfileInfoRow icon={Calendar} value={profile.joinedDate} />}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};



const ProfileInfoRow = ({ icon: Icon, value }: { icon: any; value: string }) => (
  <div className="flex items-center gap-2.5 text-sm">
    <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
    <span className="text-foreground truncate">{value}</span>
  </div>
);

export default ProfileAvatar;
