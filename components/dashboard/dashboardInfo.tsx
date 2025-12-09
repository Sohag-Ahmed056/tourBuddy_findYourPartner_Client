import { getMyProfile } from "@/services/profile/myProfile";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CreateTravelCard from "../travel/createPlanCard";

export default async function DashboardInfo() {
     const{data,success} = await getMyProfile();
        const profile = data?.data?.profile;
  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Profile Card */}
      <Card className="col-span-1 lg:col-span-1 bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{profile.fullName}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <img
            src={profile.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
          <div className="flex justify-around w-full mt-2">
            <div className="text-center">
              <p className="text-3xl font-bold">{profile.travelPlans.length}</p>
              <p className="text-sm">Travel Plans</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{profile.joinRequestsSent.length}</p>
              <p className="text-sm">Join Requests</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Travel Plans Stat */}
      <Card className="shadow-md hover:shadow-lg transition p-4">
        <CardHeader>
          <CardTitle>Travel Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{profile.travelPlans.length}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{
                width: `${Math.min(profile.travelPlans.length * 10, 100)}%`,
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Join Requests Stat */}
      <Card className="shadow-md hover:shadow-lg transition p-4">
        <CardHeader>
          <CardTitle>Join Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{profile.joinRequestsSent.length}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{
                width: `${Math.min(profile.joinRequestsSent.length * 20, 100)}%`,
              }}
            />
          </div>
        </CardContent>
      </Card>

      <div>
        <CreateTravelCard />
      </div>
    </div>
  );
}