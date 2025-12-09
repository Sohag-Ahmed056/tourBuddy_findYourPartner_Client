"use server";

import { loginUser } from "./LoginAction";

export const registerUser = async (_currentState: any, formData: FormData) => {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const bio = formData.get("bio") as string;
  const interests = (formData.get("interests") as string)
    .split(",")
    .map(s => s.trim());

  const visitedCountries = (formData.get("visitedCountries") as string)
    .split(",")
    .map(s => s.trim());

  const currentLocation = formData.get("currentLocation") as string;
  const password = formData.get("password") as string;

  
  const payload = {
    password,
    tourist: {
      fullName,
      email,
      bio,
      interests,
      visitedCountries,
      currentLocation,
    },
  };

  // Backend requires form-data with field "data"
  const newFormData = new FormData();
  newFormData.append("data", JSON.stringify(payload));

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/create-tourist`,
    {
      method: "POST",
      body: newFormData,
    }
  );

  // This prevents the JSON "<!DOCTYPE html>" error
  const contentType = response.headers.get("content-type");

  // Backend returned HTML (error page)
  if (!contentType?.includes("application/json")) {
    const errorText = await response.text();
    return {
      success: false,
      message: "Invalid server response: " + errorText,
    };
  }

  const data = await response.json();
  if(data.success){
    return await loginUser(_currentState, formData);
  }

  if (!response.ok) {
    return { success: false, message: data };
  }

  return { success: true, data };
};
