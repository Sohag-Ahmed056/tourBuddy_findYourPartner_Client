"use client";

import { useState } from "react";
import { Home, MapPin, Inbox, Send, User, Settings, LogOut, X, Menu } from "lucide-react";
import Link from "next/link";
import LogoutButton from "../auth/LogOut";
import Image from "next/image";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", icon: Home, label: "Home", href: "/" },
    { id: "travel-plans", icon: MapPin, label: "Travel Plans", href: "/dashboard/getMytravelplans" },
    { id: "join-requests-received", icon: Inbox, label: "Join Requests", href: "/dashboard/receivedJoinrequest" },
    { id: "join-requests-sent", icon: Send, label: "Sent Requests", href: "/dashboard/sendJoinrequest" },
    { id: "profile", icon: User, label: "Profile", href: "/dashboard/myProfile" },
    { id: "settings", icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 w-full border-b h-14 flex items-center px-4 z-50">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={26} />
        </button>
         <Image
                      src="/Logo.png"
                      alt="Logo"
                      width={40}
                      height={20}
                      className="mr-2"
                    />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen  border-r 
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b">
          <Image
                       src="/Logo.png"
                       alt="Logo"
                       width={70}
                       height={30}
                       className="mr-2"
                     />
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-sky-800"
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          
            <LogoutButton />
          
        </div>
      </aside>
    </>
  );
}
