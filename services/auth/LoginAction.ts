  'use server';

import { cookies } from "next/headers";

 export const loginUser = async(_currentState: any, formData: FormData) => {


  
    const loginData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const response = await fetch('http://localhost:5000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         
      },
      credentials: 'include',
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData };
    }

    const data = await response.json();


   const accessToken = data?.data?.accessToken;
  const refreshToken = data?.data?.refreshToken;

  
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
  httpOnly: true,
  secure: false, 
    sameSite: "lax",
    path: "/",
    
    maxAge:  60 * 60 * 24, // 1 day
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 90, // 7 days
  });




    return { success: true, data };
}   