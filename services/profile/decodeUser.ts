"use server"

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getMyProfile } from "./myProfile";

export const decodeUser =async()=>{

        const{data,success} = await getMyProfile();
        const profile = data?.data?.profile;

   
    //   const cookieStore = await cookies();
    //     const accessToken = cookieStore.get("accessToken")?.value || "";
    //           const decode = jwt.verify(accessToken, "abcd") as JwtPayload;
               const user = profile;


    return user;

    
}