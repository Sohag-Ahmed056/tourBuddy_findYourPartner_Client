import getSingleTravelPlan from "@/services/travels/getSingleTravel";
import { Button } from "../ui/button";
import { ArrowLeft, Calendar, Compass, MapPin, User, Wallet } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


export default async function TravelDetails({ params }: any) {
  const { id } = await params;

  const response = await getSingleTravelPlan(id);
  const plan = response?.data;


   const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (!plan) return <div>No travel plan found.</div>;

  return (
   <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[320px] overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Back Button */}
        <Button 
          variant="ghost" 
          size="sm"
          className="absolute top-6 left-6 z-10 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
          <div className="max-w-4xl mx-auto w-full">
            <Badge 
              variant="secondary" 
              className="mb-4 bg-primary-foreground/20 text-primary-foreground border-0 backdrop-blur-sm"
            >
              <Compass className="w-3 h-3 mr-1" />
              {plan.travelType}
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-3">
              {plan.title}
            </h1>
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{plan.city}, {plan.destination}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 -mt-8 relative z-10">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Dates Card */}
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Travel Dates
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Start</span>
                <span className="font-medium text-foreground">{formatDate(plan.startDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">End</span>
                <span className="font-medium text-foreground">{formatDate(plan.endDate)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Budget Card */}
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-secondary" />
                </div>
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Budget Range
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-foreground">{formatCurrency(plan.budgetMin)}</span>
                <span className="text-muted-foreground">—</span>
                <span className="font-display text-2xl font-bold text-foreground">{formatCurrency(plan.budgetMax)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description Card */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="font-display text-2xl">About This Trip</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {plan.description}
            </p>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Traveller Section */}
        <div className="pb-12">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground">Traveller</h2>
          </div>

          <Card className="shadow-lg">
            <CardContent className="flex items-center gap-6 p-6">
              <Avatar className="w-20 h-20 border-4 border-background shadow-md">
                <AvatarImage src={plan.tourist.profileImage} alt={plan.tourist.fullName} />
                <AvatarFallback className="bg-primary text-primary-foreground font-display text-xl">
                  {getInitials(plan.tourist.fullName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  {plan.tourist.fullName}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{plan.tourist.currentLocation}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
