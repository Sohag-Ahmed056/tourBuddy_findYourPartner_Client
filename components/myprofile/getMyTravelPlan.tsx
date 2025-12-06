
import { getMyProfile } from '@/services/profile/myProfile'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { DeleteTravelButton } from '../travel/DeleteTravelButton'
import { EditTravelButton } from '../travel/EditTravelPlanButton'

const MyTravelPlan = async () => {

    const { data, success } = await getMyProfile()
    const travelPlans = data?.data?.profile?.travelPlans

    return (
        <div>
            <h1>
                My Travel Plans:
            </h1>

            {travelPlans.map((plan: any) => (
                <Card key={plan.id} className="shadow-md border rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">{plan.title}</CardTitle>
                        <p className="text-sm text-gray-500">{plan.city}, {plan.destination}</p>
                    </CardHeader>

                    <CardContent className="space-y-2">
                        <Badge variant="secondary">{plan.travelType}</Badge>

                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Dates:</span>{" "}
                            {new Date(plan.startDate).toLocaleDateString()} →{" "}
                            {new Date(plan.endDate).toLocaleDateString()}
                        </p>

                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Budget:</span> {plan.budgetMin} — {plan.budgetMax} BDT
                        </p>

                        <p className="text-sm text-gray-700 line-clamp-2">{plan.description}</p>
                    </CardContent>

                    <CardFooter className="flex justify-between gap-3">
                        
                        
                    <DeleteTravelButton planId={plan.id} />
                    <EditTravelButton plan={plan} />
                    </CardFooter>
                </Card>
            ))}


        </div>
    )
}

export default MyTravelPlan;