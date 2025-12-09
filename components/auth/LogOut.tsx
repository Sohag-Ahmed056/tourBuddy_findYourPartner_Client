// Adjust path

import { logoutUser } from "@/services/auth/Logout";
import { Button } from "../ui/button";

export default function LogoutButton() {
    return (
        <form action={logoutUser}>
            <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="font-extrabold border-2"
            >
                Logout
            </Button>
        </form>
    );
}