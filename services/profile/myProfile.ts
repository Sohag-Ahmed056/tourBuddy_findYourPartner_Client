"use server"

import { cookies } from "next/headers";

// http://localhost:5000/api/v1/user/my-profile
export const getMyProfile = async () => {

    const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value || "";
    
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/my-profile`,
        {
            method: "GET",
            cache: "force-cache",
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