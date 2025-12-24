"use client";

import { usePathname } from "next/navigation";
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
import { Menu, LayoutDashboard, CreditCard, Info, Map, HeartHandshake, Columns4 } from "lucide-react";

import LogoutButton from "../auth/LogOut";
import Image from "next/image";
import NavbarOnboard from "./NavbarOnboard";
import Link from "next/link";


const navigationLinks = [
  { href: "/", label: "Home", icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: "/travel-plans", label: "Plans", icon: <Map className="w-5 h-5" /> },
  { href: "/subscribe", label: "Billing", icon: <CreditCard className="w-5 h-5" /> },
  { href: "/about", label: "About", icon: <Info className="w-5 h-5" /> },
  { href: "/help", label: "Help", icon:<HeartHandshake  className="w-5 h-5" />},
  { href: "/privacy", label: "Privacy", icon:<Columns4 className="w-5 h-5" />},
];

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const decoded = await decodeUser();
        setUser(decoded);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const username = user?.profile?.fullName;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          
          {/* Section: Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-14 w-14 overflow-hidden bg-transparent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
              <Image src="/Logo.png" alt="Logo" fill className="object-cover p-2 invert" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-black tracking-widest leading-none">TOUR</span>
              <span className="text-[10px] font-bold text-primary tracking-[0.3em]">EXPRESS</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1 lg:gap-4">
              {navigationLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <NavigationMenuItem key={link.href}>
                    {/* FIX: NavigationMenuLink asChild must wrap the Link. 
                        The Link must be the ONLY child of NavigationMenuLink.
                    */}
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.href}
                        className={`
                          group flex flex-col items-center justify-center min-w-[70px] py-2 gap-1 rounded-xl transition-all
                          ${isActive 
                            ? "text-primary bg-primary/5" 
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          }
                        `}
                      >
                        <div className={`p-1 transition-transform group-hover:-translate-y-0.5 ${isActive ? "scale-110" : ""}`}>
                          {link.icon}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider">
                          {link.label}
                        </span>
                        {isActive && (
                          <span className="h-1 w-1 rounded-full bg-primary mt-0.5" />
                        )}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Section: Right Side Actions */}
          <div className="flex items-center gap-3">
            {!isLoading && (
              <div className="flex items-center gap-2">
                {user ? (
                  <div className="flex items-center gap-3 border border-border/60 bg-secondary/30 pl-2 pr-4 py-1.5 rounded-2xl">
                    <div className="relative">
                      <ProfileIcon profile={user} />
                      <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-emerald-500 border-2 border-background rounded-full" />
                    </div>
                    <div className="hidden lg:flex flex-col">
                      <span className="text-[10px] font-black text-muted-foreground uppercase leading-none">Welcome</span>
                      <span className="text-xs font-bold truncate max-w-[80px]">{username}</span>
                    </div>
                    <LogoutButton />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" className="hidden sm:flex font-bold text-[11px] uppercase tracking-widest">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="rounded-xl font-black text-[11px] uppercase tracking-[0.1em] px-6 h-10 shadow-xl shadow-primary/20">
                      <Link href="/register">Join Platform</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            <div className="h-8 w-[1px] bg-border mx-1 hidden sm:block" />
            <ModeToggle />

            {/* Mobile Menu */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-[240px] p-2 mt-4 rounded-3xl backdrop-blur-3xl shadow-2xl">
                <div className="grid grid-cols-2 gap-2 p-1">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all border ${
                        pathname === link.href
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-muted/30 border-transparent text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {link.icon}
                      <span className="text-[10px] font-black uppercase tracking-widest">{link.label}</span>
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <NavbarOnboard />
    </header>
  );
}