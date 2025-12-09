
import { getMyProfile } from '@/services/profile/myProfile'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { DeleteTravelButton } from '../travel/DeleteTravelButton'
import { EditTravelButton } from '../travel/EditTravelPlanButton'
import { Calendar, MapPin, Plane, Wallet } from 'lucide-react'

const getTravelTypeVariant = (type: string) => {
  const typeMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    adventure: "default",
    business: "secondary",
    leisure: "destructive",
    family: "outline",
  }
  return typeMap[type.toLowerCase()] || "default"
}


const MyTravelPlan = async () => {

    const { data, success } = await getMyProfile()
    const travelPlans = data?.data?.profile?.travelPlans

    return (
         <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
            My Travel Plans
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and track your upcoming adventures
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1.5">
            <Plane className="h-3 w-3" />
            {travelPlans.length} {travelPlans.length === 1 ? "Trip" : "Trips"}
          </Badge>
        </div>
      </div>

      {/* Travel Plans Grid */}
      {travelPlans.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Plane className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">
              No travel plans yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Start planning your next adventure
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {travelPlans.map((plan:any, index: number) => (
            <Card
              key={plan.id}
              className="group relative overflow-hidden border-border/50 bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-border"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent opacity-80" />

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-foreground leading-tight truncate">
                      {plan.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="text-sm truncate">
                        {plan.city}, {plan.destination}
                      </span>
                    </div>
                  </div>
                  <Badge variant={getTravelTypeVariant(plan.travelType)} className="flex-shrink-0">
                    {plan.travelType}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pb-4">
                {/* Date Range */}
                <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                  <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="flex items-center gap-1.5 text-sm">
                    <span className="font-medium text-foreground">
                      {new Date(plan.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-muted-foreground">→</span>
                    <span className="font-medium text-foreground">
                      {new Date(plan.endDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Budget */}
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">
                    <span className="font-medium text-foreground">
                      {plan.budgetMin.toLocaleString()} — {plan.budgetMax.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground ml-1">BDT</span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {plan.description}
                </p>
              </CardContent>

              <CardFooter className="border-t border-border/50 pt-3">
                <div className="flex items-center justify-end gap-1 w-full">
                  <DeleteTravelButton planId={plan.id} />
                  <EditTravelButton plan={plan} />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
    )
}

export default MyTravelPlan;