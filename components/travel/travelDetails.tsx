import getSingleTravelPlan from "@/services/travels/getSingleTravel";


export default async function TravelDetails({ params }: any) {
  const { id } = await params;

  const response = await getSingleTravelPlan(id);
  const plan = response?.data;

  if (!plan) return <div>No travel plan found.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{plan.title}</h1>

      <p><strong>Destination:</strong> {plan.city}, {plan.destination}</p>
      <p><strong>Travel Type:</strong> {plan.travelType}</p>
      <p><strong>Budget:</strong> {plan.budgetMin} - {plan.budgetMax}</p>
      <p><strong>Start:</strong> {new Date(plan.startDate).toDateString()}</p>
      <p><strong>End:</strong> {new Date(plan.endDate).toDateString()}</p>

      <p className="mt-4"><strong>Description:</strong> {plan.description}</p>

      <hr className="my-6" />

      <h2 className="text-xl font-bold">Traveller Information</h2>
      <p><strong>Name:</strong> {plan.tourist.fullName}</p>
      <p><strong>Location:</strong> {plan.tourist.currentLocation}</p>

      <img 
        src={plan.tourist.profileImage} 
        alt="Profile" 
        className="w-24 h-24 rounded-full mt-4"
      />
    </div>
  );
}
