import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800/40 bg-zinc-50 dark:bg-black py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
              <Image
                            src="/Logo.png"
                            alt="Logo"
                            width={70}
                            height={50}
                            className="mr-2"
                          />
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Discover destinations, create travel plans, and connect with 
              fellow explorers. Start your next adventure with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li><a href="/" className="hover:text-zinc-900 dark:hover:text-white">Home</a></li>
              <li><a href="/travel-plans" className="hover:text-zinc-900 dark:hover:text-white">Travel Plans</a></li>
              <li><a href="/create-travel-plan" className="hover:text-zinc-900 dark:hover:text-white">Create Plan</a></li>
              <li><a href="/profile" className="hover:text-zinc-900 dark:hover:text-white">Profile</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>Email: sohagahmed056@gmail.com</li>
              <li>Phone: +880 1302243428</li>
              <li>Address: Dhaka, Bangladesh</li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-zinc-800/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            © {new Date().getFullYear()} TravelMate. All rights reserved.
          </p>

          
        </div>

      </div>
    </footer>
  );
}
