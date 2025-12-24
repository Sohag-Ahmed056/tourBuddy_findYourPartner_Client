import { Card, CardContent } from "@/components/ui/card";

const RequestSkeleton = () => {
  return (
    <div className="grid gap-4 w-full">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="overflow-hidden border-gray-100 dark:border-gray-800">
          <CardContent className="p-0">
            <div className="flex items-start p-5 gap-4">
              
              {/* Avatar Skeleton */}
              <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse flex-shrink-0" />

              <div className="flex-1 min-w-0 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* Name Skeleton */}
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                    {/* Badge Skeleton */}
                    <div className="h-5 w-16 bg-gray-100 dark:bg-gray-800/50 rounded-full animate-pulse" />
                  </div>
                  {/* Action Menu Skeleton */}
                  <div className="h-8 w-8 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                </div>

                {/* Date Skeleton */}
                <div className="h-3 w-24 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />

                {/* Message Bubble Skeleton */}
                <div className="h-16 w-full bg-gray-50 dark:bg-gray-900/50 rounded-lg animate-pulse border border-gray-100/50 dark:border-gray-800/50" />
              </div>

            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RequestSkeleton;