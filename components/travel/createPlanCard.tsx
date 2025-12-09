import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Compass } from "lucide-react";
import CreateTravelPlanFormDialog from "./createTravelPlanFormDialog";



const CreateTravelCard = () => {
  const features = [
    {
      icon: MapPin,
      title: "Choose Destination",
      description: "Pick from thousands of destinations worldwide",
    },
    {
      icon: Calendar,
      title: "Set Your Dates",
      description: "Plan your perfect travel timeline",
    },
    {
      icon: Users,
      title: "Travel Style",
      description: "Solo, couple, family, or group adventures",
    },
    {
      icon: Compass,
      title: "Share & Connect",
      description: "Find travel buddies with similar plans",
    },
  ];

  return (
    <Card className="overflow-hidden border border-b-emerald-600 bg-background/50  shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="bg-background from-primary/10 to-accent/10 pb-4">
        <div className="flex items-center gap-3 bg-background">
          <div className="p-2 rounded-full bg-background">
            <Compass className="h-6 w-6 text-primary" />
          </div>
          <div className="bg-background">
            <CardTitle className="font-heading bg-background  text-emerald-500 text-xl">Plan Your Next Adventure</CardTitle>
            <CardDescription className="text-teal-400">
              Create a travel plan and connect with fellow travelers
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-background hover:bg-muted/50 transition-colors"
            >
              <div className="p-1.5 rounded-md bg-primary/10">
                <feature.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-sm text-foreground">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-6">
       <CreateTravelPlanFormDialog />
      
      </CardFooter>
    </Card>
    
  );
};

export default CreateTravelCard;
