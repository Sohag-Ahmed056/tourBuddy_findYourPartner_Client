import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

// Public routes
const publicRoutes = ["/login", "/register", "/", "/price", "/travel-plans"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("accessToken")?.value;
  console.log("Access Token in Middleware:", accessToken);
  let userRole: string | null = null;

  // Decode JWT if exists
  if (accessToken) {
    try {
      const decode = jwt.verify(
        accessToken,
        "abcd"
      ) as JwtPayload;
      userRole = decode.role as string;
    } catch (error) {
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete("accessToken");
      return res;
    }
  }

  // Check if route is public
  const isPublic = publicRoutes.some((r) => pathname.startsWith(r));

  // Redirect logged-in users away from login/register
  if (accessToken && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL(getDashboard(userRole), req.url));
  }

  // Redirect unauthenticated users from private routes
  if (!isPublic && !accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Role-based access
  const roleGroups: Record<string, string[]> = {
    ADMIN: ["/admin-dashboard"],
    TOURIST: ["/dashboard"],
  };

  for (const role in roleGroups) {
    if (roleGroups[role].some((p) => pathname.startsWith(p))) {
      if (userRole !== role) {
        const target = getDashboard(userRole);
        if (pathname !== target) {
          return NextResponse.redirect(new URL(target, req.url));
        }
      }
    }
  }

  return NextResponse.next();
}

// Helper to get dashboard based on role - FIXED
export function getDashboard(role: string | null) {
  if (role === "ADMIN") return "/adminDashboard";
  if (role === "TOURIST") return "/dashboard";
  return "/";
}
