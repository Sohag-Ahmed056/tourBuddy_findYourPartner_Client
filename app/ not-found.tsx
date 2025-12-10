import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-6">
      <Card className="max-w-lg w-full p-8 text-center bg-card/50 backdrop-blur-md border border-border/50 shadow-lg">
        <CardContent>
          <h1 className="text-7xl font-extrabold text-primary mb-4">404</h1>
          <p className="text-xl font-semibold text-foreground/90 mb-2">
            Page Not Found
          </p>
          <p className="text-muted-foreground mb-6">
            Oops! The page you are looking for doesn’t exist or has been moved.
          </p>
          <Link href="/">
            <Button size="lg" className="px-6 py-3">
              Go Back Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
