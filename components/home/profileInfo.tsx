import { getMyProfile } from '@/services/profile/myProfile';
import React from 'react'
import { ProfileIcon } from './profileIcon';

const ProfileInfo =async () => {
    const{data,success} = await getMyProfile();
        const profile = data?.data?.profile;


  return (
    <ProfileIcon profile={profile} />
    

  )
}

export default ProfileInfo