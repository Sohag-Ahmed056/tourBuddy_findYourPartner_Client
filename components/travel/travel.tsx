import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import getAllTravelPlans from "@/services/travels/getAllTravel";
import JoinDialog from "../join/Sendjoin";
import ReviewDialog from "../review/Review";

export default async function TravelPlans() {
  const { success, data } = await getAllTravelPlans();

  if (!success) return <div>Error loading travel plans...</div>;

  return (
    <div className="p-6  ">
      <h1 className="text-3xl font-bold text-center tracking-tight mb-6">
        All Travel Plans
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data.map((plan: any) => (
          <Card
            key={plan.id}
            className="border border-gray-200 shadow-sm hover:shadow-md transition rounded-2xl"
          >
            <CardHeader>
              <h2 className="text-xl font-semibold">{plan.title}</h2>
              <h2 className="text-sm text-gray-500">ID: {plan.id}</h2>
              <p className="text-sm text-gray-500">
                {plan.city}, {plan.destination}
              </p>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm">
                <span className="font-medium">Dates:</span>{" "}
                {new Date(plan.startDate).toLocaleDateString()} –{" "}
                {new Date(plan.endDate).toLocaleDateString()}
              </p>

              <p className="text-sm">
                <span className="font-medium">Budget:</span>{" "}
                {plan.budgetMin} – {plan.budgetMax}
              </p>

              <p className="text-sm">
                <span className="font-medium">Travel Type:</span>{" "}
                {plan.travelType}
              </p>

              <p className="text-sm line-clamp-3 text-gray-600">
                {plan.description}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={plan.tourist.profileImage}
                    alt={plan.tourist.fullName}
                  />
                  <AvatarFallback>
                    {plan.tourist.fullName?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">
                  {plan.tourist.fullName}
                </span>
              </div>
            </CardContent>

            <CardFooter>
              <Link
                href={`/travel-plans/${plan.id}`}
                className="w-full"
              >
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium transition">
                  See Details
                </button>
             
              </Link>
                <div className="w-full ml-2">
                 <JoinDialog id={plan.id} />
               </div>
                  <div className="w-full ">
                 <ReviewDialog id={plan.id} /> 
               </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
