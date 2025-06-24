import React from "react";
import { FaEye, FaTrash, FaMoneyBill, FaInfoCircle } from "react-icons/fa";

const ParcelTable = ({ parcels, onView, onPay, onDelete, onDetails }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full table-zebra border border-base-300">
        {/* Table Head */}
        <thead className="bg-base-200 text-base-content">
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Created At</th>
            <th>Cost</th>
            <th>Payment</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>
              <td className="capitalize">{parcel.type === "document" ? "Document" : "Non-Document"}</td>
              <td className="text-sm">{parcel.creation_date}</td>
              <td>৳{parcel.delivery_cost}</td>

              {/* Payment Status with Color Badge */}
              <td>
                <span
                  className={`badge ${
                    parcel.payment_status === "paid"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {parcel.payment_status}
                </span>
              </td>

              {/* Sender and Receiver Name */}
              <td>{parcel.sender_name}</td>
              <td>{parcel.receiver_name}</td>

              {/* Actions */}
              <td className="flex gap-2">
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => onView(parcel)}
                  title="View"
                >
                  <FaEye />
                </button>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => onPay(parcel)}
                  title="Pay"
                >
                  <FaMoneyBill />
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => onDetails(parcel)}
                  title="Details"
                >
                  <FaInfoCircle />
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => onDelete(parcel)}
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParcelTable;
