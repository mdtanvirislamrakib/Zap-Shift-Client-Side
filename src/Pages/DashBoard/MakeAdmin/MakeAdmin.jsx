import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaSearch, FaUserShield, FaUserTimes } from "react-icons/fa";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const MakeAdmin = () => {
  const axiosSecure = UseAxiosSecure();
  const [emailQuery, setEmailQuery] = useState("");
  const [searchTrigger, setSearchTrigger] = useState("");

  // Search users via TanStack query
  const { data: users = [], refetch, isFetching } = useQuery({
    queryKey: ["searchUsers", searchTrigger],
    enabled: !!searchTrigger,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${searchTrigger}`);
      return res.data;
    },
  });

  const handleSearch = () => {
    if (emailQuery.trim()) {
      setSearchTrigger(emailQuery.trim());
    }
  };

  const handleRoleUpdate = async (id, newRole) => {
    const confirm = await Swal.fire({
      title: `Are you sure?`,
      text: `You want to ${newRole === "admin" ? "make" : "remove"} admin role?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/${id}/role`, { role: newRole });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", `User is now ${newRole}`, "success");
        refetch();
      }
    } catch (err) {
      console.error("Role update failed", err);
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Admin Management</h2>

      {/* Search */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by email"
          value={emailQuery}
          onChange={(e) => setEmailQuery(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
        <button onClick={handleSearch} className="btn bg-lime-500 text-white">
          <FaSearch className="mr-2" /> Search
        </button>
      </div>

      {/* Result Table */}
      <div className="overflow-x-auto shadow rounded-md">
        <table className="table">
          <thead className="bg-lime-600 text-white">
            <tr>
              <th>Email</th>
              <th>Created At</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>{new Date(user.created_at).toLocaleString()}</td>
                  <td>{user.role || "user"}</td>
                  <td>
                    {user.role === "admin" ? (
                      <button
                        className="btn btn-sm bg-red-600 text-white"
                        onClick={() => handleRoleUpdate(user._id, "user")}
                      >
                        <FaUserTimes className="mr-1" /> Remove Admin
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm bg-green-600 text-white"
                        onClick={() => handleRoleUpdate(user._id, "admin")}
                      >
                        <FaUserShield className="mr-1" /> Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500">
                  {isFetching ? "Searching..." : "No users found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MakeAdmin;
