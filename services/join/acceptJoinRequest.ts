'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers';

// Server Action
export async function handleJoinRequest(formData: FormData) {


    const cookieStore = await cookies();
      const accessToken = cookieStore.get("accessToken")?.value || "";
    
  const requestId = formData.get('requestId') as string
  const acceptString = formData.get('accept') as string
  
  const payload = {
    requestId,
    accept: acceptString === 'true' ? true : false // Convert string to boolean: true = Accepted, false = Rejected
  }
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/join/join-request/respond`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `accessToken=${accessToken}`,
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload)
    })
    
    if (!response.ok) {
      throw new Error('Failed to process request')
    }
    
    const data = await response.json()
    
    // Revalidate the page to show updated data
  // Adjust path as needed
    
    return { success: true, data }
  } catch (error) {
    console.error('Error processing join request:', error)
    return { success: false, error: 'Failed to process request' }
  }
}

// Alternative: Direct function for use in client components
