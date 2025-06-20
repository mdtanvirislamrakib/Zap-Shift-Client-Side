
import casioLogo from "../../assets/brands/casio.png";
import amazonLogo from "../../assets/brands/amazon.png";
import moonStarLogo from "../../assets/brands/moonstar.png";
import starLogo from "../../assets/brands/start.png";
import startPeopleLogo from "../../assets/brands/start-people 1.png";
import randstadLogo from "../../assets/brands/randstad.png"

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const logos = [
    casioLogo,
    amazonLogo,
    moonStarLogo,
    starLogo,
    startPeopleLogo,
    randstadLogo
];

const ClientSlider = () => {
    return (
        <section className=" py-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">We've helped thousands of sales teams</h2>
            </div>

            <Swiper
                modules={[Autoplay]}
                slidesPerView={2}
                breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                    1280: { slidesPerView: 6 },
                }}
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                speed={5000}
                className="w-full px-4"
            >
                {[...logos, ...logos].map((logo, index) => (
                    <SwiperSlide key={index} className="flex items-center justify-center">
                        <img
                            src={logo}
                            alt={`Client ${index + 1}`}
                            className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

        </section>
    );
};

export default ClientSlider;
