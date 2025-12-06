import { getMyProfile } from "@/services/profile/myProfile";
import getAllTravelPlans from "@/services/travels/getAllTravel";
import Link from "next/link";

export default async function TravelPlans() {
  const { success, data } = await getAllTravelPlans();

   

  if (!success) return <div>Error loading travel plans...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Travel Plans</h1>
      <ul className="space-y-4">
        {data?.data.map((plan: any) => (
          <li key={plan.id} className="border p-4 rounded-lg">
            <h2>Plan ID: {plan.id}</h2>
            <h2 className="text-xl font-semibold">{plan.title}</h2>
            <p>
              Destination: {plan.city}, {plan.destination}
            </p>
            <p>
              Dates: {new Date(plan.startDate).toLocaleDateString()} -{" "}
              {new Date(plan.endDate).toLocaleDateString()}
            </p>
            <p>Budget: {plan.budgetMin} - {plan.budgetMax}</p>
            <p>Travel Type: {plan.travelType}</p>
            <p>Description: {plan.description}</p>
            <div className="mt-2 flex items-center gap-2">
              <img
                src={plan.tourist.profileImage}
                alt={plan.tourist.fullName}
                className="w-10 h-10 rounded-full"
              />
              <p>{plan.tourist.fullName}</p>
            </div>
            <Link
      href={`/travel-plans/${plan.id}`}
      className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-md"
    >
      See Details
    </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}