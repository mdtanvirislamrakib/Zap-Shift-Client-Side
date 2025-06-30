import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaUserSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const ActiveRiders = () => {
    const axiosSecure = UseAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch active riders using React Query
    const { data: riders = [], refetch, isPending } = useQuery({
        queryKey: ["activeRiders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/active");
            return res.data;
        },
    });
    if (isPending) {
        return "....loading"
    }

    const filteredRiders = riders.filter((rider) => {
        const name = rider.name || "";
        return name.toLowerCase().includes(searchTerm.toLowerCase());
    });


    // Handle deactivation
    const handleDeactivate = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You want to deactivate this rider?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Deactivate!",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.patch(`/riders/${id}/status`, {
                    status: "inactive",
                });

                if (res.data.modifiedCount > 0) {
                    Swal.fire("Success", "Rider has been deactivated.", "success");
                    refetch();
                }
            } catch (err) {
                console.error("Failed to deactivate rider", err);
                Swal.fire("Error", "Something went wrong", "error");
            }
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

            {/* Search */}
            <div className="mb-4 flex justify-end">
                <div className="relative w-full max-w-sm">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="input input-bordered w-full pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-md shadow">
                <table className="table w-full">
                    <thead className="bg-lime-600 text-white">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Bike</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRiders.map((rider) => (
                            <tr key={rider._id}>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.phone}</td>
                                <td>{rider.region}</td>
                                <td>{rider.district}</td>
                                <td>{rider.bike_brand} ({rider.bike_reg_number})</td>
                                <td>
                                    <button
                                        onClick={() => handleDeactivate(rider._id)}
                                        className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                                    >
                                        <FaUserSlash className="mr-1" /> Deactivate
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredRiders.length === 0 && !isPending && (
                    <p className="text-center p-4 text-gray-500">No active riders found.</p>
                )}
            </div>
        </div>
    );
};

export default ActiveRiders;
