"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";


const updateUser = async (payload: any) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";

  if (!accessToken) {
    return { success: false, message: "Unauthorized. Please login." };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/update-user`, // Adjust endpoint as needed
      {
        method: "PUT",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
          "Cookie": `accessToken=${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      }
    );

    // Check content type before parsing
    const contentType = response.headers.get("content-type");
    
    if (!response.ok) {
      if (contentType?.includes("text/html")) {
        const htmlText = await response.text();
        console.error("Server returned HTML:", htmlText.substring(0, 200));
        return { 
          success: false, 
          message: `Server error (${response.status}): Check console for details` 
        };
      }

      try {
        const errorData = await response.json();
        return { 
          success: false, 
          message: errorData.message || "Failed to update profile" 
        };
      } catch {
        return { 
          success: false, 
          message: `Server error: ${response.status} ${response.statusText}` 
        };
      }
    }

    const data = await response.json();
    
    // Revalidate the profile page
    revalidatePath("/profile");
    revalidatePath("/my-profile");
    
    return { success: true, data };
    
  } catch (error) {
    console.error("Update user error:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Network error occurred" 
    };
  }
};

export default updateUser;