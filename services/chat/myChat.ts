// @/actions/chat.ts
"use server";

import { cookies } from 'next/headers';

export async function getChatList() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { data: [], error: "Unauthorized" };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/chat/chat-list`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "Cookie": `accessToken=${accessToken}`
      },
      next: { revalidate: 0 }, // Same as cache: "no-store"
    });

    if (!res.ok) throw new Error("Failed to fetch chat list");

    const result = await res.json();
    return { data: result?.data || [], error: null };
  } catch (error) {
    console.error("Chat Fetch Error:", error);
    return { data: [], error: "Server Error" };
  }
}