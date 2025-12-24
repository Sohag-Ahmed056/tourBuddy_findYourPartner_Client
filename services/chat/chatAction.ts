// src/app/chat/actions.ts
"use server";

import { cookies } from "next/headers";

export async function sendMessageAction(conversationId: string, content: string) {

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/chat/message`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Cookie': `accessToken=${accessToken}`,
        'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({ conversationId, content }),
  });

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Failed to send message");
  }

  return result.data; // This returns the saved message object
}