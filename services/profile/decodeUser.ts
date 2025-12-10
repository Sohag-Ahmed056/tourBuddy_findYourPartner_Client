"use server"

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getMyProfile } from "./myProfile";

export const decodeUser = async () => {
    const { data, success } = await getMyProfile();
    
    if (!success || !data?.data) {
        return null;
    }
    
    // data.data contains the full user object with nested profile
    const user = data.data;
    

    
    return user;
}