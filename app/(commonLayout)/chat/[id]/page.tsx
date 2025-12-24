// src/app/chat/[id]/page.tsx

import ChatWindow from "@/components/chat/ChatWindow";
import { getConversationData } from "@/services/chat/chatlist";

import { notFound } from "next/navigation";

export default async function ChatPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  // Call the server action
  const data = await getConversationData(id);

  // Handle errors or missing data
  if (!data.success || !data.conversation) {
    return (
      <main className="p-8 flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold">Conversation not found</h2>
          <p className="text-zinc-500">We couldn't retrieve the messages for this chat.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-5xl">
      <ChatWindow 
        conversationId={id} 
        currentUserId={data.currentUserId} 
        initialMessages={data.conversation.messages || []}
      />
    </main>
  );
}