import Navbar from "@/components/home/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  // Use this exact string everywhere for horizontal alignment
//   const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full";

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black">
      {/* 1. Navbar Wrapper */}
      <header className="w-full border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Navbar />
        </div>
      </header>

      {/* 2. Main Content Wrapper */}
      <main className="flex-1 flex flex-col items-center">
        {/* Note: We DON'T wrap {children} in the container here because 
           your Hero section needs to be slightly wider or have its own 
           rounded edges. We wrap the sections INSIDE the children instead.
        */}
        {children}
      </main>
    </div>
  );
};

export default CommonLayout;