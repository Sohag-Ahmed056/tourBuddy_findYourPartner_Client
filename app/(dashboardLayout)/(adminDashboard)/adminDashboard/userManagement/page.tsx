import UserManagementTable from "@/components/user/userManagementTable";
import getAllUser from "@/services/user/getAlluser";

export default async function UsersPage() {
  const result = await getAllUser();

  if (!result.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Failed to load users. Please try again.</p>
        </div>
      </div>
    );
  }

  const { data: responseData } = result;

  return (
    <div className="container mx-auto px-4 py-8">
      <UserManagementTable
        initialData={responseData.data}
        totalUsers={responseData.meta.total}
      />
    </div>
  );
}