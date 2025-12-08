
"use server";
import { cookies } from "next/headers";


const getAllUser = async () => {
  const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || "";


  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/all`,
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

  if (!response.ok) {
    const errorData = await response.json();
    return { success: false, message: errorData };
  }

  const data = await response.json();
  return { success: true, data };
};

export default getAllUser;