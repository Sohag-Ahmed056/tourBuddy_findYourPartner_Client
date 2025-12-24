
"use server";

import { cookies } from "next/headers";

export async function getAITravelSuggestion(preferences: string) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || "";

    // Validation
    if (!preferences || typeof preferences !== 'string' || preferences.trim().length < 5) {
        return {
            success: false,
            message: 'Please provide valid travel interests (at least 5 characters)',
            data: null,
        };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/travel/get-ai-tour-suggestions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, // Ensure your backend middleware checks this
            },
            body: JSON.stringify({ preferences: preferences.trim() }), // Changed key from 'symptoms' to 'preferences'
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Error getting AI travel suggestion:", error);
        return {
            success: false,
            message: "Failed to get AI travel suggestions. Please try again.",
            data: null,
        };
    }
}