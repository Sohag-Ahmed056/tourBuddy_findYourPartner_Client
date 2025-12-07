"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createPaymentSession(prevState: any, formData: FormData) {

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";

  const planType = formData.get("planType");
  const price = Number(formData.get("price"));

  try {
    const response = await fetch("http://localhost:5000/api/v1/payment/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({ planType, price }),
    });

    const data = await response.json();

    // if (data.success && data.data?.url) {
    //   // IMPORTANT: Must return redirect directly
    //   redirect(data.data.url);
    // }

      if (data.success && data.data?.url) {
    return {
      success: true,
      url: data.data.url, // ⬅️ return URL instead of redirecting
    };
  }

    return {
      success: false,
      message: "Failed to create payment session",
    };

  } catch (error) {
    return {
      success: false,
      message: "Network error occurred",
    };
  }
}
