"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateUser(prevState: any, formData: FormData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";

  if (!accessToken) {
    return { success: false, message: "Unauthorized. Please login." };
  }

  try {
    const backendForm = new FormData();

    // Convert comma separated → array
    const visited = (formData.get("visitedCountries") as string || "")
      .split(",")
      .map(v => v.trim())
      .filter(Boolean);

    const interests = (formData.get("interests") as string || "")
      .split(",")
      .map(i => i.trim())
      .filter(Boolean);

    // Build data object
    const dataObject = {
      fullName: formData.get("fullName") || "",
      bio: formData.get("bio") || "",
      currentLocation: formData.get("currentLocation") || "",
      visitedCountries: visited,
      interests: interests,
    };

    backendForm.append("data", JSON.stringify(dataObject));

    // Optional file
    const file = formData.get("file");
    if (file instanceof File) {
      backendForm.append("file", file);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/update-user`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: backendForm,
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      return { success: false, message: err?.message || "Failed to update profile" };
    }

    const data = await response.json();

    revalidatePath("/profile");
    revalidatePath("/my-profile");

    return { success: true, data };

  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
