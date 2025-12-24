"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

interface Tourist {
  id: string;
  userId: string;
  fullName: string;
  bio: string;
  profileImage: string | null;
  interests: string[];
  visitedCountries: string[];
  currentLocation: string;
  isDeleted: boolean;
  created_at: string;
}

interface User {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  tourist: Tourist | null;
  admin: null;
}

interface UserManagementTableProps {
  initialData: User[];
  totalUsers: number;
}

export default function UserManagementTable({
  initialData,
  totalUsers,
}: UserManagementTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 3;

  const filteredUsers = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return initialData.filter((user) => {
      return (
        user.email.toLowerCase().includes(searchLower) ||
        user.tourist?.fullName.toLowerCase().includes(searchLower) ||
        user.tourist?.currentLocation.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm, initialData]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  
  // Safeguard: Ensure activePage is always valid
  const activePage = Math.min(Math.max(1, currentPage), totalPages || 1);
  
  const startIndex = (activePage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full rounded-lg shadow-md p-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 transition-colors">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-2">Manage your Users</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400">
          Total Users: <span className="font-semibold text-blue-600 dark:text-blue-400">{totalUsers}</span>
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or location..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg 
                     bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100
                     focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-700">
              <th className="px-4 py-3 text-left text-sm font-semibold text-green-700 dark:text-green-400">User</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-green-700 dark:text-green-400">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-green-700 dark:text-green-400">Location</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-green-700 dark:text-green-400">Interests</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-green-700 dark:text-green-400">Countries</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-green-700 dark:text-green-400">Joined</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-green-700 dark:text-green-400 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {user.tourist?.profileImage ? (
                        <Image
                          src={user.tourist.profileImage}
                          alt={user.tourist.fullName}
                          width={40}
                          height={40}
                          className="rounded-full object-cover border border-gray-200 dark:border-slate-700"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                          {user.tourist?.fullName.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900 dark:text-slate-100">{user.tourist?.fullName || "N/A"}</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold">{user.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-slate-300">{user.email}</td>
                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-slate-300">{user.tourist?.currentLocation || "N/A"}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.tourist?.interests.slice(0, 2).map((interest) => (
                        <span key={interest} className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs rounded-full border border-blue-200 dark:border-blue-800">
                          {interest}
                        </span>
                      ))}
                      {user.tourist && user.tourist.interests.length > 2 && (
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400 text-xs rounded-full">
                          +{user.tourist.interests.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-slate-300 text-center">
                    {user.tourist?.visitedCountries.length || 0}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-slate-300">{formatDate(user.createdAt)}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors shadow-sm">
                        View
                      </button>
                      <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition-colors shadow-sm">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-500 dark:text-slate-400">
                  <p className="text-lg font-medium">No users found</p>
                  <p className="text-sm">Try adjusting your search criteria</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      {totalPages > 1 ? (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 dark:border-slate-800 pt-6">
          <p className="text-sm text-gray-600 dark:text-slate-400">
            Showing <span className="font-medium text-gray-900 dark:text-slate-200">{startIndex + 1}</span> to{" "}
            <span className="font-medium text-gray-900 dark:text-slate-200">
              {Math.min(startIndex + itemsPerPage, filteredUsers.length)}
            </span>{" "}
            of <span className="font-medium text-gray-900 dark:text-slate-200">{filteredUsers.length}</span> results
          </p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={activePage === 1}
              className="px-3 py-1.5 border border-gray-300 dark:border-slate-700 rounded hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-sm text-gray-700 dark:text-slate-200 transition-colors"
            >
              Previous
            </button>

            <div className="flex gap-1">
              {generatePagination(activePage, totalPages).map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  disabled={page === "..."}
                  className={`px-3 py-1.5 border rounded text-sm min-w-[38px] transition-colors ${
                    activePage === page
                      ? "bg-blue-600 text-white border-blue-600"
                      : page === "..." 
                      ? "border-transparent text-gray-400 cursor-default"
                      : "border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={activePage === totalPages}
              className="px-3 py-1.5 border border-gray-300 dark:border-slate-700 rounded hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-sm text-gray-700 dark:text-slate-200 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        /* Optional: Show message if pagination is hidden but users exist */
        filteredUsers.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800 text-right">
             <p className="text-xs text-gray-400">All users shown on one page</p>
          </div>
        )
      )}
    </div>
  );
}

function generatePagination(current: number, total: number) {
  const pages: (number | string)[] = [];
  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, 4, "...", total);
    } else if (current > total - 3) {
      pages.push(1, "...", total - 3, total - 2, total - 1, total);
    } else {
      pages.push(1, "...", current - 1, current, current + 1, "...", total);
    }
  }
  return pages;
}