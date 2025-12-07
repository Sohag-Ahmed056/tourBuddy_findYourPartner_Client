"use client";

import { useState } from "react";
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

  // Filter users based on search term
  const filteredUsers = initialData.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.email.toLowerCase().includes(searchLower) ||
      user.tourist?.fullName.toLowerCase().includes(searchLower) ||
      user.tourist?.currentLocation.toLowerCase().includes(searchLower)
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
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
    <div className="w-full  rounded-lg shadow-md p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
           Manage your Users
        </h2>
        <p className="text-sm text-muted-foreground">
          Total Users: <span className="font-semibold">{totalUsers}</span>
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or location..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-background border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-green-700">
                User
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-green-700">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-green-700">
                Location
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-green-700">
                Interests
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-green-700">
                Countries Visited
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-green-700">
                Joined
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-green-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-primary-foreground transition-colors"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {user.tourist?.profileImage ? (
                        <Image
                          src={user.tourist.profileImage}
                          alt={user.tourist.fullName}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                          {user.tourist?.fullName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-accent-foreground">
                          {user.tourist?.fullName || "N/A"}
                        </p>
                        <p className="text-xs text-gray-500">{user.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-accent-foreground">
                    {user.email}
                  </td>
                  <td className="px-4 py-4 text-sm text-accent-foreground">
                    {user.tourist?.currentLocation || "N/A"}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.tourist?.interests.slice(0, 2).map((interest) => (
                        <span
                          key={interest}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                      {user.tourist && user.tourist.interests.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{user.tourist.interests.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-accent-foreground">
                    {user.tourist?.visitedCountries.length || 0}
                  </td>
                  <td className="px-4 py-4 text-sm text-accent-foreground">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                        onClick={() => console.log("View user:", user.id)}
                      >
                        View
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                        onClick={() => console.log("Delete user:", user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-accent-foreground">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-accent-foreground">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}{" "}
            users
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-accent-foreground hover:bg-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? "bg-blue-500 text-white border-blue-500"
                            : "border-gray-300 text-accent-foreground hover:bg-primary-foreground"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span
                        key={page}
                        className="px-2 py-2 text-accent-foreground text-sm"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                }
              )}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-accent-foreground hover:bg-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}