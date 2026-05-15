import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Parallax, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import './Carousel.css';

const Carousel = ({ slides = [] }) => {
    return (
        <div className="carousel">
            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                // autoplay={{ delay: 500, disableOnInteraction: false, pauseOnMouseEnter: false }}
                modules={[Autoplay, Parallax, Mousewheel]}
                parallax={true}
                mousewheel={true}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        {slide}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Carousel;
