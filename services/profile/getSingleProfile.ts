

"use server"

import { cookies } from "next/headers";

// http://localhost:5000/api/v1/user/my-profile
export const getSingleProfile = async (userId:string) => {

    const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value || "";
        console.log(userId);
    
    const res = await fetch(
        `http://localhost:5000/api/v1/user/get-user/${(userId)}`,
        {
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
                "Cookie": `accessToken=${accessToken}`
            },
            credentials: "include",
        }
    );

    const data = await res.json();
    if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData };
    }
    return { success: true, data } as any as typeof data;
}