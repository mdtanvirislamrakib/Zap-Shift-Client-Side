import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const BeARider = () => {
    const serviceCenters = useLoaderData();
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const selectedRegion = watch("region");
    const uniqueRegions = [...new Set(serviceCenters.map((sc) => sc.region))];
    const districts = serviceCenters
        .filter((sc) => sc.region === selectedRegion)
        .map((sc) => sc.district);

    const onSubmit = async (data) => {
        const riderApplication = {
            ...data,
            name: user?.displayName,
            email: user?.email,
            status: "pending",
            appliedAt: new Date().toLocaleString(),
        };

        console.log("Rider Application", riderApplication);


        axiosSecure.post("/riders", riderApplication)
            .then(res => {
                if (res?.data?.insertedId) {
                    Swal.fire({
                        title: "Application Submited!",
                        icon: "success",
                        draggable: false
                    });
                }
            })


        reset()
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-3xl font-bold text-lime-700 mb-2">Become a Rider</h2>
            <p className="mb-6 text-gray-600">
                Fill out your details to apply as a delivery rider.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name (readonly) */}
                <div>
                    <label className="block text-sm font-medium">Full Name</label>
                    <input
                        type="text"
                        value={user?.displayName || ""}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>

                {/* Email (readonly) */}
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        value={user?.email || ""}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-medium">Phone Number</label>
                    <input
                        type="tel"
                        {...register("phone", { required: true })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.phone && <span className="text-sm text-red-500">Phone is required</span>}
                </div>

                {/* National ID */}
                <div>
                    <label className="block text-sm font-medium">National ID Number</label>
                    <input
                        type="number"
                        {...register("nid", { required: true })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.nid && <span className="text-sm text-red-500">NID is required</span>}
                </div>

                {/* Region */}
                <div>
                    <label className="block text-sm font-medium">Region</label>
                    <select
                        {...register("region", { required: true })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Region</option>
                        {uniqueRegions.map((region, idx) => (
                            <option key={idx} value={region}>
                                {region}
                            </option>
                        ))}
                    </select>
                    {errors.region && <span className="text-sm text-red-500">Region is required</span>}
                </div>

                {/* District */}
                <div>
                    <label className="block text-sm font-medium">District</label>
                    <select
                        {...register("district", { required: true })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select District</option>
                        {districts.map((district, idx) => (
                            <option key={idx} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                    {errors.district && <span className="text-sm text-red-500">District is required</span>}
                </div>

                {/* Bike Brand */}
                <div>
                    <label className="block text-sm font-medium">Bike Brand</label>
                    <input
                        type="text"
                        {...register("bike_brand", { required: true })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.bike_brand && <span className="text-sm text-red-500">Bike brand required</span>}
                </div>

                {/* Bike Reg Number */}
                <div>
                    <label className="block text-sm font-medium">Bike Registration Number</label>
                    <input
                        type="text"
                        {...register("bike_reg_number", { required: true })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.bike_reg_number && (
                        <span className="text-sm text-red-500">Bike registration required</span>
                    )}
                </div>

                {/* Submit */}
                <div className="md:col-span-2 mt-4 text-right">
                    <button
                        type="submit"
                        className="bg-lime-600 hover:bg-lime-700 text-white px-6 py-2 rounded"
                    >
                        Submit Application
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BeARider;
