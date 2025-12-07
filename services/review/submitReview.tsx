
'use server';

import { cookies } from "next/headers";

export const submitReview = async (_currentState: any, formData: FormData) => {
  const id = formData.get('id');
  const rating = formData.get('rating');
  const comment = formData.get('comment');

  if (!id || !rating || !comment) {
    return { success: false, message: { message: 'ID and message are required' } };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";

  try {
    const response = await fetch('http://localhost:5000/api/v1/review/create-review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Cookie': `accessToken=${accessToken}`
      },
      credentials: 'include',
      body: JSON.stringify({ travelPlanId: id.toString(), rating: Number(rating), comment: comment.toString() }),
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