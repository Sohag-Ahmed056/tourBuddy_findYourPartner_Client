"use client";

import { useEffect, useState } from "react";
import getAllTravelPlans from "@/services/travels/getAllTravel";
import TravelPlans from "./travel";


export default function TravelPlansSearch() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    city: "",
    budgetMin: "",
    budgetMax: "",
  });

  const [plans, setPlans] = useState([]);

  const fetchPlans = async () => {
    const query = { search, ...filters };
    const {data,success} = await getAllTravelPlans(query);
    if (success) setPlans(data.data);
  };

  // AUTO SEARCH ONLY
  useEffect(() => {
    const t = setTimeout(() => {
      fetchPlans();
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  // initial load
  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="p-2 border rounded-md w-full"
      />

      {/* Filters */}
      <div className="flex gap-3">
        <select
          value={filters.city}
          onChange={(e) =>
            setFilters({ ...filters, city: e.target.value })
          }
          className="p-2 border rounded-md"
        >
          <option value="">All Cities</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chittagong">Chittagong</option>
        </select>

        <button
          onClick={fetchPlans}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Apply Filters
        </button>
      </div>

      <TravelPlans plans={plans} />
    </div>
  );
}
