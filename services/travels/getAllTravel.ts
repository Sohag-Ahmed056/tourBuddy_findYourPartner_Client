
"use server";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const getAllTravelPlans = async () => {
  const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || "";


  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/travel/get-all-travel-plans`,
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

  if (!response.ok) {
    const errorData = await response.json();
    return { success: false, message: errorData };
  }

  const data = await response.json();
  return { success: true, data };
};

export default getAllTravelPlans;


// "use server";

// import { cookies } from "next/headers";

// const getAllTravelPlans = async (query: Record<string, string>) => {
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get("accessToken")?.value || "";

//   // Convert query object → ?key=value&...
//   const params = new URLSearchParams();
//   Object.entries(query).forEach(([key, value]) => {
//     if (value) params.append(key, value);
//   });

//   const url = `http://localhost:5000/api/v1/travel/get-all-travel-plans?${params.toString()}`;

//   const response = await fetch(url, {
//     method: "GET",
//     cache: "no-store",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${accessToken}`,
//       "Cookie": `accessToken=${accessToken}`,
//     },
//     credentials: "include",
//   });

//   const json = await response.json();

//   if (!response.ok) {
//     return { success: false, message: json.message || "Something went wrong", data: [] };
//   }

//   return { success: true, data: json.data || [] };
// };

// export default getAllTravelPlans;
