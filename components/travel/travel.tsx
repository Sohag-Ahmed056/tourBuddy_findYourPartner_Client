import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import JoinDialog from "../join/Sendjoin";
import ReviewDialog from "../review/Review";
import { Calendar, Compass, MapPin, Wallet } from "lucide-react";
import { Badge } from "../ui/badge";
import getAllTravelPlans from "@/services/travels/getAllTravel";
import TravelSearchFilter from "./travelSearchFilter";

interface TravelPlansProps {
  searchParams?: Record<string, string>;
}

export default async function TravelPlans({ searchParams }: TravelPlansProps) {
  // ✅ searchParams is already a plain object on the server
  const filters =  searchParams? await searchParams : {};

  const { success, data } = await getAllTravelPlans(filters);
  const plans = data?.data || [];

  if (!success) {
    return <div className="text-center text-red-500 mt-4">Error loading travel plans...</div>;
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(amount);

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase();

  return (
    <div className="space-y-6">
      {/* 🔹 Add search & filter component */}
  

      {plans.length === 0 ? (
        <div className="text-center text-muted-foreground mt-8">No travel plans found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map((plan: any) => (
            <Card key={plan.id} className="group overflow-hidden border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/20">
              <CardHeader className="pb-3 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 flex-1">
                    <h2 className="font-display text-xl font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {plan.title}
                    </h2>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="text-sm">{plan.city}, {plan.destination}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="flex-shrink-0">
                    <Compass className="w-3 h-3 mr-1" />
                    {plan.travelType}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pb-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50">
                    <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Dates</p>
                      <p className="text-sm font-medium text-foreground truncate">
                        {formatDate(plan.startDate)} – {formatDate(plan.endDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50">
                    <Wallet className="w-4 h-4 text-secondary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Budget</p>
                      <p className="text-sm font-medium text-foreground truncate">
                        {formatCurrency(plan.budgetMin)} – {formatCurrency(plan.budgetMax)}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{plan.description}</p>

                <Link href={`/user/${plan.touristId}`} className="flex items-center gap-3 pt-1 border-t border-border/50 cursor-pointer">
                  <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
                    <AvatarImage src={plan.tourist.profileImage} alt={plan.tourist.fullName} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                      {getInitials(plan.tourist.fullName)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{plan.tourist.fullName}</p>
                    <p className="text-xs text-muted-foreground truncate">{plan.tourist.currentLocation}</p>
                  </div>
                </Link>
              </CardContent>

              <CardFooter className="pt-0 gap-2">
                <Link href={`/travel-plans/${plan.id}`} className="w-full">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium transition">
                    See Details
                  </button>
                </Link>
                <div className="w-full ml-2"><JoinDialog id={plan.id} /></div>
                <div className="w-full"><ReviewDialog id={plan.id} /></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
