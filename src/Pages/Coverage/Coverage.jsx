import React from "react";
import DistrictMap from "../../Components/DistrictMap/DistrictMap";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const districtData = useLoaderData();
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-primary mb-4">
        We are available in 64 districts.
      </h1>

      {/* Map Section */}
      <DistrictMap districtData={districtData} />
      
    </div>
  );
};

export default Coverage;
