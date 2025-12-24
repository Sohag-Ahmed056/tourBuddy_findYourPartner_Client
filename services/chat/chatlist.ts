// src/app/actions/chatActions.ts
"use server";

import { cookies } from "next/headers";
import { decodeUser } from "@/services/profile/decodeUser";

export async function getConversationData(id: string) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || "";
    const user = await decodeUser();

    if (!user || !user.id) {
      throw new Error("Unauthorized");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/chat/my-chats/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Cookie': `accessToken=${accessToken}`
        // Note: Generally, you don't need to manually pass the Cookie header 
        // if you are already using the Authorization header for JWT.
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch conversation");
    }

    const result = await res.json();
    
    return {
      conversation: result.data,
      currentUserId: user.id,
      success: true
    };
  } catch (error) {
    console.error("Chat Fetch Error:", error);
    return { success: false, error: "Could not load chat history" };
  }
}