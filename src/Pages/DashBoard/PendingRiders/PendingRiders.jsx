import { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PendingRiders = () => {
    const axiosSecure = UseAxiosSecure();
    const [selectedRider, setSelectedRider] = useState(null);



    const {isPending, data: riders = [], refetch} = useQuery({
        queryKey: ["pending-riders"],
        queryFn: async() => {
            const res = await axiosSecure.get("/riders/pending");
            return res?.data
        }
    })

    if(isPending) {
        return "....loading"
    }

    const handleDecision = async (id, decision) => {
        try {
            const res = await axiosSecure.patch(`/riders/${id}/status`, { status: decision });
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: `Rider ${decision === "active" ? "Approved" : "Rejected"} Successfully`,
                    timer: 1500,
                    showConfirmButton: false,
                });
                refetch()
                setSelectedRider(null);
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Pending Rider Applications</h2>

            <div className="overflow-x-auto rounded-lg shadow">
                <table className="table w-full">
                    <thead className="bg-green-600 text-white">
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
                        {riders.map((rider) => (
                            <tr key={rider._id}>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.phone}</td>
                                <td>{rider.region}</td>
                                <td>{rider.district}</td>
                                <td>{rider.bike_brand}</td>
                                <td>
                                    <button
                                        onClick={() => setSelectedRider(rider)}
                                        className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
                                    >
                                        <FaEye /> View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {riders.length === 0 && (
                    <p className="text-center p-4 text-gray-500">No pending riders</p>
                )}
            </div>

            {/* Modal */}
            {selectedRider && (
                <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md w-[90%] md:w-[600px] shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500"
                            onClick={() => setSelectedRider(null)}
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-semibold mb-4">Rider Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <p><strong>Name:</strong> {selectedRider.name}</p>
                            <p><strong>Email:</strong> {selectedRider.email}</p>
                            <p><strong>Phone:</strong> {selectedRider.phone}</p>
                            <p><strong>NID:</strong> {selectedRider.nid}</p>
                            <p><strong>Region:</strong> {selectedRider.region}</p>
                            <p><strong>District:</strong> {selectedRider.district}</p>
                            <p><strong>Bike Brand:</strong> {selectedRider.bike_brand}</p>
                            <p><strong>Bike Reg No:</strong> {selectedRider.bike_reg_number}</p>
                            <p><strong>Applied At:</strong> {new Date(selectedRider.appliedAt).toLocaleString()}</p>
                        </div>

                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                onClick={() => handleDecision(selectedRider._id, "active")}
                                className="btn bg-green-600 text-white hover:bg-green-700"
                            >
                                <FaCheckCircle className="mr-1" /> Approve
                            </button>
                            <button
                                onClick={() => handleDecision(selectedRider._id, "rejected")}
                                className="btn bg-red-600 text-white hover:bg-red-700"
                            >
                                <FaTimesCircle className="mr-1" /> Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingRiders;
