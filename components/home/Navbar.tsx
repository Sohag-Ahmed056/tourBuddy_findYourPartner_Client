"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "../ui/modeToggle";
import { ProfileIcon } from "./profileIcon";
import { decodeUser } from "@/services/profile/decodeUser";
import { useEffect, useState } from "react";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/travel-plans", label: "Travel Plans" },
  { href: "/price", label: "Pricing" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const decoded = await decodeUser();
     // Debug log
      setUser(decoded);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setIsLoading(false);
    }
  };
  fetchUser();
}, []);

  // Fix: user already contains the full data structure from API
  const username = user?.profile?.fullName;

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                size="icon"
                variant="ghost"
              >
                <svg
                  className="pointer-events-none"
                  fill="none"
                  height={16}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width={16}
                >
                  <path d="M4 6H20" />
                  <path d="M4 12H20" />
                  <path d="M4 18H20" />
                </svg>
              </Button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link) => (
                    <NavigationMenuItem className="w-full" key={link.href}>
                      <NavigationMenuLink
                        href={link.href}
                        className={`py-1.5 ${
                          pathname === link.href
                            ? "text-red-500 font-semibold"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-6">
            <a href="/" className="text-primary hover:text-primary/90">
              <span className="sr-only">Home</span>
            </a>

            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink
                      href={link.href}
                      className={`py-1.5 font-medium ${
                        pathname === link.href
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {!isLoading && (
            <>
              {user ? (
                // Authenticated user UI
                <>
                  <span className="text-sm font-extrabold text-foreground hidden sm:inline">
                    Hi, {username}
                  </span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="font-extrabold border-2"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                // Guest user UI
                <>
                  <Button asChild size="sm" variant="ghost">
                    <a href="/login">Sign In</a>
                  </Button>
                  <Button asChild size="sm">
                    <a href="/register">Get Started</a>
                  </Button>
                </>
              )}
            </>
          )}
          <ModeToggle />
          {user && <ProfileIcon profile={user} />}
        </div>
      </div>
    </header>
  );
}