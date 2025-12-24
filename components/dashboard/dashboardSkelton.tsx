import React from "react";

const Skeleton = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <div className={`animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded-lg ${className}`} style={style} />
);
    
const DashboardSkeleton = () => {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      
      {/* 1. Sidebar Skeleton */}
     
      <div className="flex-1 overflow-hidden">
        {/* 2. Header / Navbar Skeleton */}
        <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-8 bg-white dark:bg-zinc-950">
          <Skeleton className="h-4 w-48" />
          <div className="flex gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </header>

        <main className="p-8 space-y-8 max-w-7xl mx-auto">
          
          {/* 3. Greetings Banner Skeleton */}
          <div className="relative overflow-hidden rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
            <div className="space-y-3">
              <Skeleton className="h-8 w-64" /> {/* "Good morning, User!" */}
              <Skeleton className="h-4 w-96" /> {/* Subtitle text */}
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-20">
               <Skeleton className="h-24 w-24 rounded-full" />
            </div>
          </div>

          {/* 4. Bar Charts Section (Side by Side) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2].map((chart) => (
              <div key={chart} className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 h-80">
                <div className="flex justify-between mb-8">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-8 w-24 rounded-xl" />
                </div>
                
                {/* Simulated Bar Chart Visual */}
                <div className="flex items-end justify-around h-40 gap-2 px-2">
                  {[...Array(8)].map((_, i) => (
                    <Skeleton 
                      key={i} 
                      className="w-full rounded-t-md" 
                      style={{ height: `${Math.floor(Math.random() * 80) + 20}%` }} 
                    />
                  ))}
                </div>
                
                {/* Chart Labels */}
                <div className="flex justify-around mt-4">
                   {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-2 w-8" />)}
                </div>
              </div>
            ))}
          </div>

          {/* 5. Recent Activity (Bonus) */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-40" />
            <div className="grid gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default DashboardSkeleton;