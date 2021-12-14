import React from "react";
import { Swiper, SwiperSlide, Autoplay } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/swiper.min.css";
import carousel from "../../assets/carousel/carousel_1.png";

const Carousel = () => {
  const images = [carousel, carousel, carousel, carousel];
  const params = {
    autoplay: {
      delay: 1000,
      disableOnInteraction: true,
    },
  };
  return (
    <div className="overflow-hidden">
      <Swiper
        {...params}
        className="w-full"
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {images.map((imageURL) => (
          <SwiperSlide>
            <img src={imageURL} alt={imageURL} className="width-full" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
