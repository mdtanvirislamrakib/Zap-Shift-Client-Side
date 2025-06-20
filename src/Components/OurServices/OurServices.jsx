
import { motion } from "framer-motion";
import { FaBuilding, FaMapMarkedAlt, FaMoneyBillWave, FaUndoAlt, FaWarehouse } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";

const services = [
  {
    title: "Express & Standard Delivery",
    description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: <FaTruckFast className="text-4xl text-primary" />
  },
  {
    title: "Nationwide Delivery",
    description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: <FaMapMarkedAlt className="text-4xl text-primary" />
  },
  {
    title: "Fulfillment Solution",
    description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: <FaWarehouse className="text-4xl text-primary" />
  },
  {
    title: "Cash on Home Delivery",
    description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <FaMoneyBillWave className="text-4xl text-primary" />
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description: "Customized corporate services which includes warehouse and inventory management support.",
    icon: <FaBuilding className="text-4xl text-primary" />
  },
  {
    title: "Parcel Return",
    description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: <FaUndoAlt className="text-4xl text-primary" />
  }
];

const OurServices = () => {
  return (
    <section className="py-16 rounded-4xl mt-10 bg-[#03373D]" id="services">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Our Services</h2>
        <p className="text-gray-200 max-w-2xl mx-auto mb-10">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <motion.div
              key={service.title}
              whileHover={{ scale: 1.05 }}
              className="card bg-base-200 text-center shadow-md border border-base-300 p-6 transition-all duration-300 hover:bg-[#CAEB66]"
            >
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="p-4 rounded-full bg-gradient-to-br from-white to-gray-100 shadow-inner">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary">{service.title}</h3>
                <p className="text-base-content">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
