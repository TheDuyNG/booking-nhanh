import React from 'react';
import AdsBanner from '../../components/ads-banner/AdsBanner';
import PopularThisWeek from './components/popularThisWeek/PopularThisWeek';
import TopPartner from './components/topPartner/TopPartner';
import { slides } from './Helper';
import Carousel from '../../components/carousel/Carousel'

const HomePage = () => {
    const bannerImage = "/0070ffcde6521052fada0d648ed9dc14.jpg";
    return (
        <div>
            <AdsBanner
                items={["TingXi Tan", "Derek Zheng", "Gabriel Chua"]}
                style={{ backgroundColor: "#f0f0f0", padding: "10px 0" }}
            />

            <section className='mx-28 my-6 bg-amber-100 rounded-lg p-6'>
                <div className='flex flex-col md:flex-row items-center gap-8'>
                    <div className='md:flex-1'>
                        <h1 className='text-3xl md:text-4xl font-bold mb-4'>
                            Discover the best KTV experience with us!
                        </h1>
                        <p className='text-lg text-gray-700 mb-4'>Book top venues, get exclusive deals, and enjoy live performances.</p>

                        <ul className='mb-6 space-y-2'>
                            <li className='flex items-center text-gray-700'><span className='w-2 h-2 bg-amber-500 rounded-full mr-3'/>Curated venues</li>
                            <li className='flex items-center text-gray-700'><span className='w-2 h-2 bg-amber-500 rounded-full mr-3'/>Best prices & promotions</li>
                            <li className='flex items-center text-gray-700'><span className='w-2 h-2 bg-amber-500 rounded-full mr-3'/>Verified reviews</li>
                        </ul>

                        <div className='flex gap-3'>
                            <button className='bg-amber-600 text-white px-4 py-2 rounded-md shadow'>Book Now</button>
                            <button className='border border-amber-600 text-amber-600 px-4 py-2 rounded-md'>Explore</button>
                        </div>
                    </div>

                    <div className='w-full md:w-96'>
                        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                            <img src={bannerImage} alt="KTV Experience" className='w-full h-56 md:h-48 object-cover' />
                            <div className='p-4'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <h3 className='font-semibold'>Top Rated Venue</h3>
                                        <p className='text-sm text-gray-500'>Rated 4.8 • 120+ reviews</p>
                                    </div>
                                    <div className='text-amber-600 font-bold'>Save 20%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div>
                <PopularThisWeek />
            </div>


            <div className='mt-4'>
                <TopPartner />
            </div>

            <div>
                <Carousel/>
            </div>
        </div>
    );
};

export default HomePage;