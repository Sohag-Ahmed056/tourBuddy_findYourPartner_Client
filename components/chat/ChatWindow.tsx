"use client";

import React, { useEffect, useState, useRef } from "react";
import { socket } from "@/lib/socket";
import { sendMessageAction } from "@/services/chat/chatAction";
import { Send, User, Hash } from "lucide-react"; // Icons for a pro look
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWindow({ 
  conversationId, 
  currentUserId, 
  initialMessages = [] 
}: { 
  conversationId: string, 
  currentUserId: string, 
  initialMessages: any[]
}) {
  const [messages, setMessages] = useState<any[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.connect();
    socket.emit("join_conversation", conversationId);

    socket.on("new_message", (message: any) => {
      setMessages((prev) => {
        if (prev.find((m) => m.id === message.id)) return prev;
        return [...prev, message];
      });
    });

    return () => {
      socket.off("new_message");
      socket.disconnect();
    };
  }, [conversationId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const messageContent = input;
    setInput("");
    setIsSending(true);

    try {
      await sendMessageAction(conversationId, messageContent);
    } catch (error) {
      console.error("Message failed:", error);
      alert("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-[85vh] md:h-[80vh] w-full max-w-4xl mx-auto overflow-hidden border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-950 shadow-2xl transition-colors duration-300">
      
      {/* Header: More professional with status indicators */}
      <header className="px-6 py-4 flex items-center justify-between bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <Hash className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
              Conversation Room
            </h2>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">
              ID: {conversationId.slice(-8).toUpperCase()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[12px] font-medium text-gray-500 dark:text-gray-400">Live</span>
        </div>
      </header>

      {/* Messages List: Using Framer Motion for smooth entry */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isMe = msg.senderId === currentUserId;
            return (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[85%] md:max-w-[70%] ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                  {/* Avatar Placeholder */}
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </div>

                  <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-1 px-1">
                      {isMe ? "You" : msg?.sender?.fullName}
                    </span>
                    <div className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm ${
                      isMe 
                        ? "bg-blue-600 dark:bg-blue-500 text-white rounded-tr-none shadow-blue-200 dark:shadow-none" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-none"
                    }`}>
                      <p className="leading-relaxed">{msg.content}</p>
                    </div>
                    <span className="text-[9px] mt-1.5 text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={scrollRef} />
      </div>

      {/* Input Form: Modern glassmorphism look */}
      <footer className="p-4 md:p-6 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
        <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isSending}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all active:scale-95 flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </footer>
    </div>
  );
}