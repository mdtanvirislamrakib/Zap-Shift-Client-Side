import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { user } = UseAuth();

  const axiosSecure = UseAxiosSecure();

  const serviceCenters = useLoaderData();
  const uniqueRegions = [...new Set(serviceCenters.map((w) => w.region))];

  const parcelType = watch("type");
  const senderRegion = watch("sender_region");
  const receiverRegion = watch("receiver_region");

  const getServiceCentersByRegion = (region) =>
    serviceCenters.filter((sc) => sc.region === region).map((sc) => sc.district);

  const getCurrentDateTime = () => {
    const now = new Date();
    const pad = (n) => (n < 10 ? "0" + n : n);

    let hours = now.getHours();
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12

    return {
      formatted: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(hours)}:${minutes}:${seconds} ${ampm}`,
      dateObject: now
    };
  };


  const onSubmit = (data) => {
    const currentDateTime = getCurrentDateTime();
    const weight = Number(data.weight || 0);
    const sameRegion = data.sender_region === data.receiver_region;
    const isDocument = data.type === "document";

    // Cost logic
    let baseCost = 0;
    let weightCost = 0;
    let outsideRegionCost = 0;

    if (isDocument) {
      baseCost = sameRegion ? 60 : 80;
    } else {
      baseCost = sameRegion ? 110 : 150;
      if (weight > 3) {
        weightCost = Math.ceil(weight - 3) * 40;
        if (!sameRegion) {
          outsideRegionCost = 40;
        }
      }
    }

    const total = baseCost + weightCost + outsideRegionCost;

    // HTML breakdown with all details
    const breakdownHtml = `
    <div class="text-left space-y-3">
      <div class="bg-gray-100 p-3 rounded-lg">
        <h3 class="font-bold text-lg mb-2">Parcel Information</h3>
        <div class="grid grid-cols-2 gap-2">
          <div><span class="text-gray-600">Type:</span> ${isDocument ? "Document" : "Non-Document"}</div>
          <div><span class="text-gray-600">Description:</span> ${data.title}</div>
          ${!isDocument ? `<div><span class="text-gray-600">Weight:</span> ${weight} kg</div>` : ''}
          <div><span class="text-gray-600">Created:</span> ${currentDateTime.formatted}</div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-gray-100 p-3 rounded-lg">
          <h3 class="font-bold text-lg mb-2">Sender Details</h3>
          <div class="space-y-1">
            <div><span class="text-gray-600">Name:</span> ${data.sender_name}</div>
            <div><span class="text-gray-600">Contact:</span> ${data.sender_contact}</div>
            <div><span class="text-gray-600">Region:</span> ${data.sender_region}</div>
            <div><span class="text-gray-600">Service Center:</span> ${data.sender_service_center}</div>
            <div><span class="text-gray-600">Address:</span> ${data.sender_address}</div>
            <div><span class="text-gray-600">Pickup Instructions:</span> ${data.pickup_instruction}</div>
          </div>
        </div>

        <div class="bg-gray-100 p-3 rounded-lg">
          <h3 class="font-bold text-lg mb-2">Receiver Details</h3>
          <div class="space-y-1">
            <div><span class="text-gray-600">Name:</span> ${data.receiver_name}</div>
            <div><span class="text-gray-600">Contact:</span> ${data.receiver_contact}</div>
            <div><span class="text-gray-600">Region:</span> ${data.receiver_region}</div>
            <div><span class="text-gray-600">Service Center:</span> ${data.receiver_service_center}</div>
            <div><span class="text-gray-600">Address:</span> ${data.receiver_address}</div>
            <div><span class="text-gray-600">Delivery Instructions:</span> ${data.delivery_instruction}</div>
          </div>
        </div>
      </div>

      <div class="bg-gray-100 p-3 rounded-lg">
        <h3 class="font-bold text-lg mb-2">Delivery Cost Breakdown</h3>
        <div class="space-y-1">
          <div class="flex justify-between">
            <span>Base Delivery Cost (${isDocument ? 'Document' : 'Up to 3kg'} ${sameRegion ? 'Same Region' : 'Different Region'})</span>
            <strong>৳${baseCost}</strong>
          </div>
          ${weightCost > 0 ? `
            <div class="flex justify-between">
              <span>Extra Weight Charge (${Math.ceil(weight - 3)}kg × ৳40)</span>
              <strong>৳${weightCost}</strong>
            </div>
          ` : ''}
          ${outsideRegionCost > 0 ? `
            <div class="flex justify-between">
              <span>Outside District Fee</span>
              <strong>৳${outsideRegionCost}</strong>
            </div>
          ` : ''}
          <hr class="my-2 border-gray-300"/>
          <div class="flex justify-between text-lg font-bold text-green-700">
            <span>Total Delivery Cost</span>
            <strong>৳${total}</strong>
          </div>
        </div>
      </div>
    </div>
  `;

    Swal.fire({
      title: "Parcel Summary & Cost Breakdown",
      html: breakdownHtml,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "💳 Proceed To Payment",
      cancelButtonText: "🖊 Continue Editing",
      width: '800px',
      customClass: {
        htmlContainer: "text-left",
        confirmButton: "bg-green-600 hover:bg-green-700",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelWithDate = {
          ...data,
          delivery_cost: total,
          payment_status: "unpaid",
          delivary_status: "not-collected",
          created_by: user?.email,
          creation_date: currentDateTime.formatted,
        };
        console.log("Saving to DB:", parcelWithDate);

        axiosSecure.post("/parcels", parcelWithDate)
        .then(res => {

          if(res?.data?.insertedId) {

            // TODO payment page
            Swal.fire({
              title: "Redirecting...",
              text: "Proceding to payment gateway",
              icon: "success",
              timer: 1500,
              showConfirmButton: false
            })
          }
        })
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-green-800 mb-2">Add Parcel</h2>
      <hr className="mb-6 border-gray-300" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <div>
          <p className="font-semibold mb-2">Enter your parcel details</p>
          <div className="flex items-center gap-6 mb-4">
            <label className="flex items-center gap-2">
              <input type="radio" value="document" {...register("type", { required: true })} className="radio checked:bg-green-600" />
              Document
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="non-document" {...register("type", { required: true })} className="radio checked:bg-green-600" />
              Non-Document
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Describe Parcel" {...register("title", { required: true })} className="input input-bordered w-full" />
            {parcelType === "non-document" && (
              <input type="number" step="0.1" placeholder="Weight (kg)" {...register("weight")} className="input input-bordered w-full" />
            )}
          </div>
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-semibold text-lg mb-2">Sender Details</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Sender Name" defaultValue="MD. Tanvir Islam Rakib" {...register("sender_name", { required: true })} className="input input-bordered w-full" />
              <input type="tel" placeholder="Sender Contact" {...register("sender_contact", { required: true })} className="input input-bordered w-full" />
              <select {...register("sender_region", { required: true })} className="select select-bordered w-full">
                <option value="">Select Region</option>
                {uniqueRegions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              <select {...register("sender_service_center", { required: true })} className="select select-bordered w-full">
                <option value="">Select Service Center</option>
                {getServiceCentersByRegion(senderRegion).map((sc) => (
                  <option key={sc} value={sc}>{sc}</option>
                ))}
              </select>
              <input type="text" placeholder="Address" {...register("sender_address", { required: true })} className="input input-bordered w-full" />
              <textarea placeholder="Pickup Instruction" {...register("pickup_instruction", { required: true })} className="textarea textarea-bordered w-full" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Receiver Details</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Receiver Name" {...register("receiver_name", { required: true })} className="input input-bordered w-full" />
              <input type="tel" placeholder="Receiver Contact" {...register("receiver_contact", { required: true })} className="input input-bordered w-full" />
              <select {...register("receiver_region", { required: true })} className="select select-bordered w-full">
                <option value="">Select Region</option>
                {uniqueRegions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              <select {...register("receiver_service_center", { required: true })} className="select select-bordered w-full">
                <option value="">Select Service Center</option>
                {getServiceCentersByRegion(receiverRegion).map((sc) => (
                  <option key={sc} value={sc}>{sc}</option>
                ))}
              </select>
              <input type="text" placeholder="Address" {...register("receiver_address", { required: true })} className="input input-bordered w-full" />
              <textarea placeholder="Delivery Instruction" {...register("delivery_instruction", { required: true })} className="textarea textarea-bordered w-full" />
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-2">* Pickup Time 4pm–7pm Approx.</p>

        <button type="submit" className="btn bg-lime-400 hover:bg-lime-500 text-white w-full">
          Continue
        </button>
      </form>
    </div>
  );
};

export default SendParcel;