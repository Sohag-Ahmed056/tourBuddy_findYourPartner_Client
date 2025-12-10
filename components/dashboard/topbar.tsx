"use client";

import { Search, Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="border-b px-4 py-3 flex items-center justify-between  ">
      
      {/* Left Side (keeps space so it doesn't overlap mobile hamburger) */}
      <div className=" md:flex-none md:w-auto"></div>

      {/* Search Bar - hidden on mobile */}
      <div className="hidden md:flex items-center bg-background px-4 py-2 rounded-lg border border-b-blue-700 w-80">
        <Search className="text-foreground mr-2" />
        <input
          className="bg-transparent outline-none w-full"
          placeholder="Search..."
        />
      </div>

      {/* Notification Button */}
      <button className="relative p-2 rounded-lg ml-2">
        <Bell className="text-gray-600" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      
    </header>
  );
}
