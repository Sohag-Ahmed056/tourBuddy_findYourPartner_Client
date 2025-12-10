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

import LogoutButton from "../auth/LogOut";
import Image from "next/image";

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
        // 1. Call the async function directly. 
        // We assume decodeUser handles token retrieval (e.g., from cookies/localStorage).
        const decoded = await decodeUser();
        
        // If decoding succeeds, set the user data
        setUser(decoded);
      } catch (error) {
        // 2. IMPORTANT: If token is missing, expired, or invalid, 
        // the decodeUser service should throw. We catch the error
        // and safely set the user to null (unauthenticated state).
        // This is the correct flow for handling unauthenticated users.
        setUser(null);
        // console.error("Failed to fetch user, defaulting to guest:", error); 
      } finally {
        // 3. Stop loading regardless of success or failure
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []); // Run only once on mount

  // Ensure you access the correct nested properties from the resolved API data
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
            <Image
              src="/Logo.png"
              alt="Logo"
              width={70}
              height={50}
              className="mr-2"
            />
         
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
                  <LogoutButton />
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