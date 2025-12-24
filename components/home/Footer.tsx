"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Github, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight
} from "lucide-react";

const footerLinks = {
  platform: [
    { name: "Home", href: "/" },
    { name: "Travel Plans", href: "/travel-plans" },
    { name: "Create Plan", href: "/dashboard" },
    
  ],
  community: [
    { name: "Stories", href: "/about" },
   
  ],
  support: [
  
    { name: "Help Center", href: "/help" },
    { name: "Privacy", href: "/privacy" },
  ],
  socials: [
    { icon: Facebook, href: "https://www.facebook.com/sohag.shisir.5", label: "Facebook" },
   
    { icon: Github, href: "https://github.com/Sohag-Ahmed056", label: "Github" },
  ]
};

export function Footer() {
  return (
    <footer className=" mt-5 relative border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] transition-colors duration-300">
      {/* Subtle top accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-6 py-12"> {/* Reduced vertical padding */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-12">
          
          {/* Brand & Description */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block transition-transform active:scale-95">
              <Image
                src="/Logo.png"
                alt="TravelBuddy Logo"
                width={130}
                height={40}
                className="dark:brightness-125"
              />
            </Link>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-sm">
              Connecting solo adventurers worldwide. Find your next travel partner and explore the world with confidence.
            </p>
            <div className="flex items-center gap-2">
              {footerLinks.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:bg-primary hover:text-white transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { title: "Platform", links: footerLinks.platform },
              { title: "Community", links: footerLinks.community },
              { title: "Support", links: footerLinks.support }
            ].map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900 dark:text-white opacity-80">
                  {section.title}
                </h3>
                <ul className="space-y-2.5"> {/* Tighter spacing between list items */}
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href} 
                        className="group flex items-center text-sm text-zinc-500 dark:text-zinc-400 hover:text-primary transition-colors"
                      >
                        <ArrowRight className="w-0 h-3 opacity-0 -ml-2 group-hover:w-3 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-2 transition-all duration-300" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
        </div>

        {/* Info Strip - Integrated and Compact */}
        <div className="mt-3 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-zinc-100 dark:border-zinc-900 py-6">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-primary opacity-70" />
            <a href="mailto:sohagahmed056@gmail.com" className="text-sm text-zinc-600 dark:text-zinc-400 hover:underline">sohagahmed056@gmail.com</a>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-primary opacity-70" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">+880 1302243428</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-primary opacity-70" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Dhaka, Bangladesh</span>
          </div>
        </div>

        {/* Bottom bar with simplified copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
          <p>© {new Date().getFullYear()} TravelBuddy. Adventure Awaits.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy</Link>
            <Link href="/help" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Help</Link>
            
          </div>
        </div>
      </div>
    </footer>
  );
}