"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";


const updateTravel = async (travelPlanId: string, payload: any) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";

  if (!accessToken) {
    return { success: false, message: "Unauthorized. Please login." };
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/travel/update-travel-plan/${travelPlanId}`,
      {
        method: "PUT", // or PUT depending on your backend
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          Cookie: `accessToken=${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { 
        success: false, 
        message: errorData.message || "Failed to update travel plan" 
      };
    }

    const data = await response.json();
    
    // Revalidate the paths to refresh the data
    revalidatePath("/my-travel-plans");
    revalidatePath(`/travel-plans/${travelPlanId}`);
    
    return { success: true, data };
  } catch (error) {
    console.error("Update travel error:", error);
    return { 
      success: false, 
      message: "An error occurred while updating the travel plan" 
    };
  }
};

export default updateTravel;