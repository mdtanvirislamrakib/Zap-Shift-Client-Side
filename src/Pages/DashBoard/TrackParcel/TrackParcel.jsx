
import React, { useState } from "react";
import useAddTrackingUpdate from "../useAddTrackingUpdate";

const TrackParcel = () => {
    const { addTrackingUpdate, loading, error, successMessage } = useAddTrackingUpdate();
  const [form, setForm] = useState({
    parcelId: "",
    status: "",
    location: "",
    updated_by: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTrackingUpdate(form);
  };
    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded shadow-md">
            <input
                type="text"
                name="parcelId"
                placeholder="Parcel ID"
                value={form.parcelId}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />
            <input
                type="text"
                name="status"
                placeholder="Status (e.g., Out for delivery)"
                value={form.status}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />
            <input
                type="text"
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
            <input
                type="text"
                name="updated_by"
                placeholder="Updated By"
                value={form.updated_by}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                {loading ? "Saving..." : "Add Update"}
            </button>

            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-600">{successMessage}</p>}
        </form>
    );
};

export default TrackParcel;