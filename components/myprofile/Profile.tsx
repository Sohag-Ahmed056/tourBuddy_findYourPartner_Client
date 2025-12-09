import React from 'react'
import { Badge } from '../ui/badge'
import Image from 'next/image'
import { getMyProfile } from '@/services/profile/myProfile';
import { Separator } from '../ui/separator';
import { UpdateProfileButton } from './updateProfileButton';

const Profile = async () => {

    const{data,success} = await getMyProfile();
    const profile = data?.data?.profile;
  return (
     <div className="w-full max-w-5xl mx-auto px-6 py-10 space-y-10">

      {/* ======== Header Section ======== */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">

        {/* Profile Image */}
         <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg ring-4 ring-primary/20">
          {profile.profileImage ? (
            <Image
              src={profile.profileImage}
              alt={profile.fullName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">{profile.fullName}</span>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="space-y-3 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight">{profile.fullName}</h1>
          <p className="text-muted-foreground max-w-xl">{profile.bio}</p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-2 text-sm text-muted-foreground">
            <span>📍 {profile.currentLocation}</span>
            <span>
              Joined:{" "}
              {new Date(profile.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </span>
          </div>
        </div>
      </div>

      <Separator />

      {/* ======== Interests ======== */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Interests</h2>
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest: string) => (
            <Badge key={interest} variant="secondary" className="px-3 py-1 text-sm">
              {interest}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      {/* ======== Visited Countries ======== */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Visited Countries</h2>

        <div className="flex flex-wrap gap-2">
          {profile.visitedCountries.map((country: string) => (
            <Badge
              key={country}
              variant="outline"
              className="px-3 py-1 text-sm border-primary/30"
            >
              🌍 {country}
            </Badge>
          ))}
          <UpdateProfileButton profile={profile} />
        </div>
      </div>

    </div>
  )
}

export default Profile