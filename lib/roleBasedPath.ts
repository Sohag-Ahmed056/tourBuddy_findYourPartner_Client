export function isValidRedirect(path: string, role: string | null) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return false;
  }

  if (["/login", "/register"].includes(path)) {
    return false;
  }

  const roleGroups: Record<string, string[]> = {
    ADMIN: ["/admin-dashboard", "/travel-plans"],
    TOURIST: ["/dashboard", "/travel-plans"],
  };

  if (role && roleGroups[role]) {
    return roleGroups[role].some((p) => path.startsWith(p));
  }

  return false;
}


export function getDashboard(role: string | null) {
  if (role === "ADMIN") return "/admin-dashboard";
  if (role === "TOURIST") return "/travel-plans";
  return "/";
}