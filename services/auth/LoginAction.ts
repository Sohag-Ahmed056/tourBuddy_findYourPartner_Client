'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getDashboard } from "@/proxy";

export const loginUser = async (_currentState: any, formData: FormData) => {
  const loginData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return { success: false, message: errorData };
  }

  const data = await response.json();

  const accessToken = data?.data?.accessToken;
  const refreshToken = data?.data?.refreshToken;

  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 90, // 90 days
  });

  // Decode token to get user role
  let userRole: string | null = null;
  try {
      const decode = jwt.verify(accessToken, "abcd") as JwtPayload;
    userRole = decode.role as string;
  } catch (error) {
    console.error("Failed to decode token:", error);
  }

  // Determine redirect URL based on role
  const redirectUrl = getDashboard(userRole);
  
  // Redirect to appropriate dashboard
  redirect(redirectUrl);
};

// Helper function (same as in proxy.ts)
// function getDashboard(role: string | null) {
//   if (role === "ADMIN") return "/admin-dashboard";
//   if (role === "TOURIST") return "/dashboard";
//   return "/";
// }