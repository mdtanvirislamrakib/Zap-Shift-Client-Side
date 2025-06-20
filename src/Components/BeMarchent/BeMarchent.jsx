import React from "react";
import bannerBg from "../../assets/be-a-merchant-bg.png"; // background wave effect
import boxImage from "../../assets/location-merchant.png"; // box + location image

const BeMerchant = () => {
  return (
    <section className="relative bg-[#003D3C] text-white rounded-2xl overflow-hidden my-10">
      {/* Background image on left to center */}
      <img
        src={bannerBg}
        alt="Background"
        className="absolute -top-80 -rotate-12 left-0 right-0 w-full opacity-80 z-0"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Side Text */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-4">
          <h2 className="text-3xl font-bold leading-snug">
            Merchant and Customer Satisfaction<br />
            is Our First Priority
          </h2>
          <p className="text-base text-gray-200">
            We offer the lowest delivery charge with the highest value along with 100% safety of your product.
            Profast courier delivers your parcels in every corner of Bangladesh right on time.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button className="bg-[#CAEB66] text-[#003D3C] font-semibold px-5 py-2 rounded-full hover:bg-lime-400 transition">
              Become a Merchant
            </button>
            <button className="border border-[#CAEB66] text-[#CAEB66] font-semibold px-5 py-2 rounded-full hover:bg-[#CAEB66] hover:text-[#003D3C] transition">
              Earn with Profast Courier
            </button>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="lg:w-1/2 flex justify-center">
          <img src={boxImage} alt="Box with location" className="h-48 md:h-60 object-contain" />
        </div>
      </div>
    </section>
  );
};

export default BeMerchant;
