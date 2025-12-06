
"use server";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const deleteTravel = async (id: string) => {
  const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || "";


  const response = await fetch(
    `http://localhost:5000/api/v1/travel/delete-travel-plan/${id}`,
    {
      method: "DELETE",
      cache: "no-store",
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

export default deleteTravel;