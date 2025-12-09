"use server";

import { cookies } from "next/headers";

 export const createTravelPlan = async ( _currentState: any,formData: FormData) => {
     const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value || "";
    
     
   const payload = {
      title: formData.get("title"),
      destination: formData.get("destination"),
      city: formData.get("city"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      budgetMin: Number(formData.get("budgetMin")),
      budgetMax: Number(formData.get("budgetMax")),
      travelType: formData.get("travelType"),
      description: formData.get("description"),
      visibility: true,
    };

    const res =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/travel/create-travel-plan`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
            "Cookie": `accessToken=${accessToken}`
        },
        credentials:"include",
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData };
    }
    return { success: true, data: await res.json() };



}


