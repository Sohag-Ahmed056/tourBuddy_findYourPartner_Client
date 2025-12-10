
"use client";


import ProfileAvatar from "../ui/profileAvatar";


// const Profile = {
//   email: "john.doe@example.com",
//   name: "John Doe",
//   phone: "+1 (555) 123-4567",
//   location: "San Francisco, CA",
//   company: "Acme Inc.",
//   joinedDate: "Joined March 2023",
// };
 

export const ProfileIcon = ({ profile }: { profile: any }) => {
 
  if (!profile) {
    return null;
  }

  return (
    <div className="rounded-2xl bg-white">
      <div className="flex items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <ProfileAvatar profile={profile} />
        </div>
      </div>
    </div>
  );
};