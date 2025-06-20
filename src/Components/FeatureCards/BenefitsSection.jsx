import React from "react";
import img1 from "../../assets/live-tracking.png";
import img2 from "../../assets/safe-delivery.png";
import img3 from "../../assets/call-support.png";

const features = [
    {
        title: "Live Parcel Tracking",
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
        image: img1,
        fade: "fade-right"
    },
    {
        title: "100% Safe Delivery",
        description:
            "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        image: img2,
        fade: "fade-left"
    },
    {
        title: "24/7 Call Center Support",
        description:
            "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        image: img3,
        fade: "fade-right"
    },
];

const BenefitsSection = () => {
    return (
        <section className="py-16">
            <div className="max-w-6xl mx-auto px-8 grid gap-10">
                {features.map((feature, idx) => (
                    <div
                        data-aos={feature.fade}
                        data-aos-delay="50"
                        data-aos-duration="3000"
                        key={idx}
                        className="bg-[#FFFFFFB3] rounded-lg shadow-md flex flex-col lg:flex-row items-center gap-6 py-6 px-8 hover:shadow-xl transition"
                    >
                        {/* Image Section */}
                        <div className="w-full lg:w-1/3 flex items-center justify-center">
                            <img
                                src={feature.image}
                                alt={feature.title}
                                className="h-40 object-contain"
                            />
                        </div>

                        {/* Vertical Line */}
                        <div className="hidden lg:block border-r border-dashed border-gray-400 h-full"></div>

                        {/* Text Section */}
                        <div className="w-full lg:w-2/3 text-center lg:text-left">
                            <h3 className="text-3xl font-bold mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-base-content">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BenefitsSection;
