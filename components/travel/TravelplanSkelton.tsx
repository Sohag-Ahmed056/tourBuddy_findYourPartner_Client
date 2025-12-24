import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function TravelPlansSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="flex flex-col overflow-hidden border-border/50 shadow-sm">
          <CardHeader className="pb-3 space-y-3">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-2 flex-1">
                <div className="h-6 w-3/4 bg-muted animate-pulse rounded-md" />
                <div className="h-4 w-1/2 bg-muted animate-pulse rounded-md" />
              </div>
              <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
            </div>
          </CardHeader>
          <CardContent className="space-y-5 pb-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="h-16 bg-muted animate-pulse rounded-2xl" />
              <div className="h-16 bg-muted animate-pulse rounded-2xl" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted animate-pulse rounded-md" />
              <div className="h-4 w-full bg-muted animate-pulse rounded-md" />
              <div className="h-4 w-2/3 bg-muted animate-pulse rounded-md" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
              <div className="space-y-2 flex-1">
                <div className="h-3 w-24 bg-muted animate-pulse rounded-md" />
                <div className="h-3 w-32 bg-muted animate-pulse rounded-md" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0 flex flex-col gap-3">
            <div className="flex gap-2 w-full">
              <div className="h-10 flex-1 bg-muted animate-pulse rounded-md" />
              <div className="h-10 flex-1 bg-muted animate-pulse rounded-md" />
            </div>
            <div className="h-10 w-full bg-muted animate-pulse rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}