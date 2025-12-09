"use server";

import { cookies } from "next/headers"; // 1. Import this
import { redirect } from "next/navigation";

export const logoutUser = async () => {
  const cookieStore = await cookies(); // 2. Get the store

  // 3. Delete the cookies by name
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  redirect("/login");
};