'use server';

import { cookies } from "next/headers";

export const sendJoinRequest = async (_currentState: any, formData: FormData) => {
  const id = formData.get('id');
  const message = formData.get('message');

  if (!id || !message) {
    return { success: false, message: { message: 'ID and message are required' } };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";

  try {
    const response = await fetch('http://localhost:5000/api/v1/join/join-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Cookie': `accessToken=${accessToken}`
      },
      credentials: 'include',
      body: JSON.stringify({ id: id.toString(), message: message.toString() }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, message: errorData };
    }

    const data = await response.json();

    return { success: true, data };
  } catch (error) {
    return { success: false, message: { message: error instanceof Error ? error.message : 'Failed to send request' } };
  }
};