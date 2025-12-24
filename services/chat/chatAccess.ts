// src/services/chat/chatAccessAction.ts
"use server";

import { cookies } from "next/headers";

export async function accessChatAction(travelPlanId: string, otherUserId: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/chat/access`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
      "Cookie": `accessToken=${accessToken}`
    },
    body: JSON.stringify({ travelPlanId, otherUserId }),
  });

  const result = await res.json();

  if (!result.success) {
    throw new Error(result.message || "Could not access chat");
  }

  return result.data; // Returns the conversation object { id: '...' }
}