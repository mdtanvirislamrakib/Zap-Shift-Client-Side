import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const AssignRider = () => {
  const axiosSecure = UseAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);

  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels?payment_status=paid&delivary_status=not-collected");
      return res.data;
    },
  });

  const { data: riders = [] } = useQuery({
    queryKey: ["allRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  const handleAssignClick = (parcel) => {
    setSelectedParcel(parcel);
    document.getElementById("assignModal").showModal();
  };

  const handleConfirmAssign = async (rider) => {
    try {
      const res = await axiosSecure.patch(`/parcels/${selectedParcel._id}/assign`, {
        assigned_rider: rider,
        assigned_at: new Date(),
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Rider assigned successfully!", "success");
        document.getElementById("assignModal").close();
        setSelectedParcel(null);
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to assign rider", "error");
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading parcels...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Assign Rider to Parcels</h2>

      <div className="overflow-x-auto shadow rounded-md">
        <table className="table w-full">
          <thead className="bg-lime-600 text-white">
            <tr>
              <th>#</th>
              <th>Parcel Info</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <strong>{parcel.title}</strong>
                  <br />
                  <span className="text-sm text-gray-600">
                    {parcel.type} {parcel.weight && `| ${parcel.weight} kg`}
                  </span>
                </td>
                <td>
                  {parcel.sender_name}
                  <br />
                  <span className="text-xs text-gray-500">📞 {parcel.sender_contact}</span>
                </td>
                <td>
                  {parcel.receiver_name}
                  <br />
                  <span className="text-xs text-gray-500">📞 {parcel.receiver_contact}</span>
                </td>
                <td>৳{parcel.delivery_cost}</td>
                <td>
                  <span className="badge badge-success text-xs">{parcel.payment_status}</span>
                </td>
                <td>
                  <span className="badge badge-warning text-xs">{parcel.delivary_status}</span>
                </td>
                <td className="text-xs">{parcel.creation_date}</td>
                <td>
                  <button
                    className="btn btn-sm bg-lime-500 hover:bg-lime-600 text-white flex items-center gap-1"
                    onClick={() => handleAssignClick(parcel)}
                  >
                    <FaUserPlus /> Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog id="assignModal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Select Rider for: <span className="text-green-700">{selectedParcel?.title}</span></h3>
          <div className="grid gap-3 max-h-[400px] overflow-y-auto">
            {riders
              .filter((r) => r.district === selectedParcel?.sender_service_center)
              .map((rider) => (
                <div key={rider._id} className="flex justify-between items-center border p-3 rounded">
                  <div>
                    <p className="font-semibold">{rider.name}</p>
                    <p className="text-sm text-gray-500">{rider.email}</p>
                    <p className="text-sm text-gray-500">📞 {rider.phone}</p>
                  </div>
                  <button
                    className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleConfirmAssign(rider)}
                  >
                    Confirm
                  </button>
                </div>
              ))}

            {riders.filter((r) => r.district === selectedParcel?.sender_service_center).length === 0 && (
              <p className="text-sm text-center text-gray-500">No riders available for this location.</p>
            )}
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRider;
