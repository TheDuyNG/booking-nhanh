import React from 'react';
import AdsBanner from '../../components/ads-banner/AdsBanner';
import PopularThisWeek from './components/popularThisWeek/PopularThisWeek';
import TopPartner from './components/topPartner/TopPartner';

const HomePage = () => {

    return (
        <div>
            <AdsBanner
                items={["TingXi Tan", "Derek Zheng", "Gabriel Chua"]}
                style={{ backgroundColor: "#f0f0f0", padding: "10px 0" }}
            />

            <div>
                <PopularThisWeek />
            </div>


            <div className='mt-4'>
                <TopPartner />
            </div>

        </div>
    );
};

export default HomePage;