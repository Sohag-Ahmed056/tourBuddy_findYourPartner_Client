"use server"
const getSingleTravelPlan = async (id: string) => {
    const res = await fetch(`http://localhost:5000/api/v1/travel/get-single-tour/${id}`, {
        method: "GET",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData };
    }
    return res.json()
}
export default getSingleTravelPlan