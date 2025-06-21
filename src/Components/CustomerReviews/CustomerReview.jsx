import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaQuoteLeft } from "react-icons/fa";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import image from "../../assets/customer-top.png"

const testimonials = [
  {
    id: "1",
    userName: "John Doe",
    job: "Product Manager",
    review: "Smooth delivery and polite staff. Very impressed with their professionalism and attention to detail.",
    user_photoURL: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    id: "2",
    userName: "Jane Smith",
    job: "CTO",
    review: "Took a bit longer than expected, but the quality of service made up for the wait time. Would use again.",
    user_photoURL: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    id: "3",
    userName: "Alex Brown",
    job: "Operations Lead",
    review: "Excellent service! Fast and secure delivery. The team went above and beyond to meet our needs.",
    user_photoURL: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    id: "4",
    userName: "Lisa White",
    job: "Project Manager",
    review: "Very responsive and professional. They handled our urgent request with care and efficiency.",
    user_photoURL: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: "5",
    userName: "David Lee",
    job: "Marketing Director",
    review: "Consistently great experience. Their reliability makes them our go-to service provider.",
    user_photoURL: "https://randomuser.me/api/portraits/men/19.jpg",
  },
];

const CustomerReview = () => {
  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <img src={image} alt="" className="mx-auto mb-8" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          What our customers are saying
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hear from businesses and individuals who have experienced our exceptional service firsthand.
        </p>
      </div>

      <div className="max-w-6xl mx-auto relative px-4">
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={30}
          slidesPerView={1.25}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".custom-swiper-prev",
            nextEl: ".custom-swiper-next",
          }}
          pagination={{
            clickable: true,
            el: ".custom-swiper-pagination",
            type: "bullets",
            bulletClass: "inline-block w-2 h-2 mx-1 rounded-full bg-gray-300 cursor-pointer",
            bulletActiveClass: "!bg-blue-600",
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
            },
            1024: {
              slidesPerView: 2.5,
            },
          }}
          className="pb-16"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              {({ isActive }) => (
                <div
                  className={`flex flex-col items-center bg-white rounded-2xl p-8 h-full transition-all duration-300 shadow-md
                    ${isActive ? "opacity-100 scale-100" : "opacity-40 scale-95"}
                  `}
                >
                  <FaQuoteLeft className="text-blue-500 text-4xl mb-6 opacity-20" />
                  <p className="text-gray-700 text-lg text-center mb-8 font-medium leading-relaxed">
                    "{testimonial.review}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <img
                      src={testimonial.user_photoURL}
                      alt={testimonial.userName}
                      className="w-14 h-14 rounded-full border-2 border-blue-100 object-cover"
                    />
                    <div className="text-left">
                      <h4 className="font-bold text-gray-800 text-lg">
                        {testimonial.userName}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {testimonial.job}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation & Pagination */}
        <div className="flex justify-center items-center mt-12">
          <button
            className="custom-swiper-prev flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors duration-200 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <MdArrowBackIosNew className="text-lg" />
          </button>
          
          <div className="custom-swiper-pagination mx-6 flex items-center"></div>
          
          <button
            className="custom-swiper-next flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors duration-200 focus:outline-none"
            aria-label="Next testimonial"
          >
            <MdArrowForwardIos className="text-lg" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;