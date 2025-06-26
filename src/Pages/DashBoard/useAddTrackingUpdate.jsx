import { useState } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";


const useAddTrackingUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const axiosSecure = UseAxiosSecure(); // your custom secure Axios hook

  const addTrackingUpdate = async ({ parcelId, status, location, updated_by }) => {
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const res = await axiosSecure.post("/tracking", {
        parcelId,
        status,
        location,
        updated_by,
      });

      setSuccessMessage("Tracking update added successfully");
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    addTrackingUpdate,
    loading,
    error,
    successMessage,
  };
};

export default useAddTrackingUpdate;
