"use server";
 export const createTravelPlan = async ( _currentState: any,formData: FormData) => {
    
     
   const payload = {
      title: formData.get("title"),
      destination: formData.get("destination"),
      city: formData.get("city"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      budgetMin: Number(formData.get("budgetMin")),
      budgetMax: Number(formData.get("budgetMax")),
      travelType: formData.get("travelType"),
      description: formData.get("description"),
      visibility: true,
    };

    const res =  await fetch("http://localhost:5000/api/v1/travel/create-travel-plan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData };
    }
    return { success: true, data: await res.json() };



}


