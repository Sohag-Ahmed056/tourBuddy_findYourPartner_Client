'use server'


import { cookies } from 'next/headers';

// Server Action
export async function handleChangePassword(_currentState: any,formData: FormData) {


    const cookieStore = await cookies();
      const accessToken = cookieStore.get("accessToken")?.value || "";
    
  const oldPassword = formData.get('oldPassword') as string
  const newPassword = formData.get('newPassword') as string
  
  const payload = {
    
    oldPassword,
    newPassword,
  }
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `accessToken=${accessToken}`,
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload)
    })
    
    if (!response.ok) {
    const errorData = await response.json();
    return { success: false, message: errorData };
  }

    
    const data = await response.json()
    
    
    
    return { success: true, data }
  } catch (error) {
    console.error('Error processing join request:', error)
    return { success: false, error: 'Failed to process request' }
  }
}

