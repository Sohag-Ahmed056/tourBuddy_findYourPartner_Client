"use server";

import { cookies } from "next/headers"; 
import { redirect } from "next/navigation";

export const logoutUser = async () => {
  const cookieStore = await cookies(); 

  // 3. Delete the cookies by name
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  redirect("/login");
};