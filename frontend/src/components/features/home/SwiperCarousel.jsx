import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const SwiperCarousel = () => {
  const images = [
    'https://images.unsplash.com/photo-1587831990711-23d7e4a6453b?w=1600&q=80',
    'https://images.unsplash.com/photo-1598992645182-2c62a4452488?w=1600&q=80',
    'https://images.unsplash.com/photo-1604382354936-07c5d9983d34?w=1600&q=80',
    'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=1600&q=80',
    'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1600&q=80',
    'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1600&q=80',
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1600&q=80',
  ];

  return (
    <div className="relative w-full h-screen">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="w-full h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="!w-[80%] md:!w-[60%] lg:!w-[40%] h-full">
            <img src={image} alt={`slide_image_${index}`} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ArrowLeft className="w-8 h-8 text-white" />
          </div>
          <div className="swiper-button-next slider-arrow">
            <ArrowRight className="w-8 h-8 text-white" />
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;