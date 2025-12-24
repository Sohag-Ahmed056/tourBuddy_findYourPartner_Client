// components/chat/MobileNav.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function MobileNav({ 
  sidebar, 
  hasSelectedChat 
}: { 
  sidebar: React.ReactNode;
  hasSelectedChat: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar automatically when navigating to a new chat
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Sidebar Trigger (Floating or Header) */}
      {hasSelectedChat && (
        <button 
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed top-24 left-2 z-50 p-4 bg-blue-600 text-white rounded-full shadow-lg active:scale-95 transition-transform"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-0 z-[60] transform transition-transform duration-300 ease-in-out
        md:relative md:inset-auto md:translate-x-0 md:z-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${hasSelectedChat ? "md:flex" : "flex"}
        w-full md:w-auto h-full
      `}>
        {/* Close Button (Mobile Only) */}
        <button 
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-5 right-5 z-[70] p-2 bg-gray-100 dark:bg-gray-800 rounded-full"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        {sidebar}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}