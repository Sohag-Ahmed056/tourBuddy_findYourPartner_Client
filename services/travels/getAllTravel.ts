
"use server";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// const getAllTravelPlans = async () => {
//   const cookieStore = await cookies();
//     const accessToken = cookieStore.get("accessToken")?.value || "";


//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/v1/travel/get-all-travel-plans`,
//     {
//       method: "GET",
//       cache: "force-cache",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${accessToken}`,
//          "Cookie": `accessToken=${accessToken}`
//       },
//       credentials: "include",
//     }
//   );

//   if (!response.ok) {
//     const errorData = await response.json();
//     return { success: false, message: errorData };
//   }

//   const data = await response.json();
//   return { success: true, data };
// };

// export default getAllTravelPlans;


export default async function getAllTravelPlans(filters?: Record<string, string>) {
  const queryParams = new URLSearchParams();

  // ✅ Only iterate if filters is a plain object
  if (filters && typeof filters === "object") {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/travel/get-all-travel-plans${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
  
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) return { success: false, data: null };

  const data = await response.json();
  return { success: true, data };
}