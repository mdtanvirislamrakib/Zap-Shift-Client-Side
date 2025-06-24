import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import ParcelTable from "../../Components/ParcelTable/ParcelTable";
import Loader from "../../Components/Loader/Loader";
// import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner"; // Assuming you have a spinner component

const MyParcels = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch parcels data
    const {
        data: parcels = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["my-parcels", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email, // Only fetch when user email is available
    });

    // Delete parcel mutation
    const deleteParcelMutation = useMutation({
        mutationFn: (id) => axiosSecure.delete(`/parcels/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["my-parcels"]); // Refresh the parcels list
        },
    });

    // Action Handlers
    const handleView = (parcel) => {
        Swal.fire({
            title: "Parcel Details",
            html: `
        <div class="text-left">
          <p><strong>Title:</strong> ${parcel.title}</p>
          <p><strong>Status:</strong> ${parcel.status}</p>
          <p><strong>Delivery Cost:</strong> ৳${parcel.delivery_cost}</p>
          <p><strong>From:</strong> ${parcel.sender_name}</p>
          <p><strong>To:</strong> ${parcel.receiver_name}</p>
        </div>
      `,
            icon: "info",
        });
    };

    const handlePay = (parcel) => {
        Swal.fire({
            title: "Payment",
            text: `Payment initiated for ৳${parcel.delivery_cost}`,
            icon: "success",
        });
    };

    const handleDelete = async (parcel) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `You are about to delete "${parcel.title}". This action cannot be undone!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result?.isConfirmed) {
            try {
                await deleteParcelMutation.mutateAsync(parcel._id);
                Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
            } catch (error) {
                Swal.fire("Error", "Failed to delete parcel.", "error");
                console.error("Delete error:", error);
            }
        }
        refetch()
    };

    if (isLoading) return <Loader />;

    if (isError) {
        return (
            <div className="text-center text-red-500">
                <p>Failed to load parcels.</p>
                <p>{error.message}</p>
                <button
                    onClick={() => refetch()}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">My Parcels ({parcels.length})</h2>

            {parcels.length > 0 ? (
                <ParcelTable
                    parcels={parcels}
                    onView={handleView}
                    onPay={handlePay}
                    onDelete={handleDelete}
                />
            ) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">You have no parcels yet.</p>
                    <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Create New Parcel
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyParcels;