// src/components/chat/StartChatButton.tsx
"use client";

import { accessChatAction } from "@/services/chat/chatAccess";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface StartChatButtonProps {
  travelPlanId: string;
  otherUserId: string;
}

export default function StartChatButton({ travelPlanId, otherUserId }: StartChatButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAccessChat = async () => {
    try {
      setLoading(true);
      
      // Call the Server Action
      const chatData = await accessChatAction(travelPlanId, otherUserId);
      
      // Redirect to the dynamic chat route
      router.push(`/chat/${chatData.id}`);
      
    } catch (error) {
      console.error("Chat Access Error:", error);
      alert("Failed to start chat. Ensure your request was accepted.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleAccessChat}
      disabled={loading}
      className={`px-4 py-2 rounded-md text-white transition ${
        loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {loading ? "Connecting..." : "Message Traveler"}
    </button>
  );
}