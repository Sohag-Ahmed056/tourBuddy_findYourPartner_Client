"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function TravelSearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams(); // ✅ Client only

  const [search, setSearch] = useState(searchParams?.get("search") || "");
  const [filters, setFilters] = useState({
    destination: searchParams?.get("destination") || "",
    city: searchParams?.get("city") || "",
    travelType: searchParams?.get("travelType") || "",
    budgetMin: searchParams?.get("budgetMin") || "",
    budgetMax: searchParams?.get("budgetMax") || "",
    startDate: searchParams?.get("startDate") || "",
    endDate: searchParams?.get("endDate") || "",
  });

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (search) params.set("search", search);
      else params.delete("search");

      router.push(`?${params.toString()}`, { scroll: false });
    }, 3000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    Object.entries(filters).forEach(([key, val]) => {
      if (val) params.set(key, val);
    });
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full border p-4 rounded-lg shadow-sm mb-5">
      <input
        type="text"
        placeholder="Search travel plans..."
        className="w-full border p-2 rounded-md mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Filters */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <input type="text" placeholder="Destination(eg: Bangladesh)" className="border p-2 rounded-md" value={filters.destination} onChange={(e) => setFilters({ ...filters, destination: e.target.value })} />
          <input type="text" placeholder="City(eg: Rajshahi)" className="border p-2 rounded-md" value={filters.city} onChange={(e) => setFilters({ ...filters, city: e.target.value })} />
          <select className="border bg-background p-2 rounded-md" value={filters.travelType} onChange={(e) => setFilters({ ...filters, travelType: e.target.value })}>
            
            <option value="SOLO">SOLO</option>
            <option value="FAMILY">FAMILY</option>
          </select>
          <input type="number" placeholder="Budget Min(eg: 500)" className="border p-2 rounded-md" value={filters.budgetMin} onChange={(e) => setFilters({ ...filters, budgetMin: e.target.value })} />
          <input type="number" placeholder="Budget Max(eg: 1000)" className="border p-2 rounded-md" value={filters.budgetMax} onChange={(e) => setFilters({ ...filters, budgetMax: e.target.value })} />
          <input type="date" className="border p-2 rounded-md" value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} />
          <input type="date" className="border p-2 rounded-md" value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} />
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-foreground p-2 rounded-md">Find Your Match</button>
      </form>
    </div>
  );
}
