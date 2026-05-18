import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


const PopularThisWeek = () => {
    const cards = [
        {
            image: "https://picsum.photos/seed/card1/600/300",
            title: "Khám phá tính năng mới",
            description: "Trải nghiệm giao diện hiện đại với nhiều cải tiến vượt trội.",
            button: "Xem ngay",
        },
        {
            image: "https://picsum.photos/seed/card1/600/300",
            title: "Ưu đãi đặc biệt tháng 5",
            description: "Giảm đến 50% cho tất cả sản phẩm trong tuần này.",
            button: "Mua ngay",
        },
        {
            image: "https://picsum.photos/seed/card1/600/300",
            title: "Cộng đồng của chúng tôi",
            description: "Hơn 10,000 thành viên đang tham gia mỗi ngày.",
            button: "Tham gia",
        },
        {
            image: "https://picsum.photos/seed/card1/600/300",
            title: "Khám phá tính năng mới",
            description: "Trải nghiệm giao diện hiện đại với nhiều cải tiến vượt trội.",
            button: "Xem ngay",
        },
        {
            image: "https://picsum.photos/seed/card1/600/300",
            title: "Ưu đãi đặc biệt tháng 5",
            description: "Giảm đến 50% cho tất cả sản phẩm trong tuần này.",
            button: "Mua ngay",
        },
        {
            image: "https://picsum.photos/seed/card1/600/300",
            title: "Cộng đồng của chúng tôi",
            description: "Hơn 10,000 thành viên đang tham gia mỗi ngày.",
            button: "Tham gia",
        },
    ];

    return (
        <div className='mt-4'>
            <h2 className='text-center text-xl font-semibold mb-4'>Popular This Week</h2>
            <Swiper
                className="w-full"
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 0}}
                pagination={{ clickable: true }}
                loop={true}
                spaceBetween={30}
                slidesPerView={3}
                freeMode={true}
                speed={6500}
            >
                {cards.map((card, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-6 flex flex-col gap-4">
                                <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
                                <p className="text-sm text-gray-500">{card.description}</p>
                                <button className="self-start px-4 py-2 bg-black text-white text-sm rounded-lg hover:opacity-80 transition">
                                    {card.button}
                                </button>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default PopularThisWeek;