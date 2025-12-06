import { getMyProfile } from "@/services/profile/myProfile";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";


const ReceivedJoinrequest =async () => {

    const {data,success} = await getMyProfile();
    const receivedJoinrequest = data?.data?.profile?.joinRequestsReceived;

    return (
       <div className="space-y-4">
      {receivedJoinrequest.map((req: any) => (
        <Card key={req.id} className="border rounded-xl shadow-sm">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-base font-semibold">
              Join Request • {new Date(req.createdAt).toLocaleDateString()}
            </CardTitle>

            <Badge
              variant={
                req.status === "ACCEPTED"
                  ? "default"
                  : req.status === "REJECTED"
                  ? "destructive"
                  : "secondary"
              }
              className="uppercase"
            >
              {req.status}
            </Badge>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">{req.message}</p>
          </CardContent>
        </Card>
      ))}

      {receivedJoinrequest.length === 0 && (
        <p className="text-center text-muted-foreground py-10">
          No join requests found
        </p>
      )}
    </div>
    )
}

export default ReceivedJoinrequest;