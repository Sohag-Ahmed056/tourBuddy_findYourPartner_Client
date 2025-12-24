"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getOtherParticipant } from "@/lib/chatHelper";
import { Search } from "lucide-react"; // Added for a more "app-like" feel

export default function ChatSidebar({ conversations, currentUserId }: any) {
  const params = useParams();
  const activeChatId = params.id;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 transition-colors duration-300">
      {/* Sidebar Header with Search Placeholder */}
      <div className="p-5 border-b border-gray-100 dark:border-gray-800">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Messages</h1>
        
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {conversations?.length > 0 ? (
          conversations.map((chat: any) => {
            const otherUser = getOtherParticipant(chat, currentUserId);
            const lastMessage = chat.messages[0];
            const isActive = activeChatId === chat.id;

            return (
              <Link 
                key={chat.id} 
                href={`/chat/${chat.id}`}
                className={`group flex items-center gap-4 p-4 mx-2 my-1 rounded-2xl transition-all duration-200 ${
                  isActive 
                    ? "bg-blue-50 dark:bg-blue-900/20 shadow-sm" 
                    : "hover:bg-gray-50 dark:hover:bg-gray-900"
                }`}
              >
                {/* Avatar with Online Status Indicator */}
                <div className="relative shrink-0">
                  <img 
                    src={otherUser?.profileImage || "/default-avatar.png"} 
                    className={`w-12 h-12 rounded-full object-cover transition-transform group-hover:scale-105 ${
                      isActive ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-950" : "ring-1 ring-gray-200 dark:ring-gray-800"
                    }`} 
                    alt={otherUser?.fullName || "User"}
                  />
                  {/* Small online dot (static for UI demo) */}
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-950"></span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className={`font-semibold truncate text-[15px] ${
                      isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-gray-100"
                    }`}>
                      {/* {otherUser?.fullName} */}
                      {chat.travelPlan.title}
                      <p><span className="text-muted-foreground">{otherUser?.fullName}</span></p>
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium ml-2 shrink-0">
                      {lastMessage ? new Date(lastMessage.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ""}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${
                      isActive ? "text-blue-600/80 dark:text-blue-400/80" : "text-gray-500 dark:text-gray-400"
                    }`}>
                      {lastMessage?.content || "Start a new conversation..."}
                    </p>
                    
                    {/* Unread indicator (Optional UI element) */}
                    {!isActive && (
                       <div className="h-2 w-2 bg-blue-500 rounded-full ml-2 shrink-0"></div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm italic">
            No conversations yet.
          </div>
        )}
      </div>
    </div>
  );
}