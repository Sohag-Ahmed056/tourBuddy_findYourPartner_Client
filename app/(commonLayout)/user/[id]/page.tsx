import UserProfileComponent from '@/components/home/ViewProfile'
import { getSingleProfile } from '@/services/profile/getSingleProfile'

const UserInformationPage = async ({params} :{params:any} ) => {
    const { id } = await params;
    

    const {success,data} =await getSingleProfile(id)
    const UserData= data?.data

    if(!success){
        return (
            <div>
                <h1>Error Loading Data</h1>
            </div>
        )
    }

  return (
    <div>
        <UserProfileComponent userData={UserData} />
    </div>
  )
}

export default UserInformationPage