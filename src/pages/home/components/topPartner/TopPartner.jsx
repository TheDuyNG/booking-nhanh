import AdsBanner from "../../../../components/ads-banner/AdsBanner";

const TopPartner = () => {
    return (

        <div className='top-partner'>
            <h1 className="text-center mt-2">
                <span className=" text-2xl font-bold">Top Partner</span>
            </h1>
            <div>
                <AdsBanner
                    items={[
                        <div className="flex items-center gap-2">
                            <img src="https://i.pravatar.cc/32?u=1" className="w-8 h-8 rounded-full" />
                            <span className="text-sm font-medium">TingXi Tan</span>
                        </div>,
                        <div className="flex items-center gap-2">
                            <img src="https://i.pravatar.cc/32?u=2" className="w-8 h-8 rounded-full" />
                            <span className="text-sm font-medium">Derek Zheng</span>
                        </div>,
                        <div className="flex items-center gap-2">
                            <img src="https://i.pravatar.cc/32?u=3" className="w-8 h-8 rounded-full" />
                            <span className="text-sm font-medium">Gabriel Chua</span>
                        </div>,
                    ]}
                />
            </div>


            <div className='mt-2'>
                <AdsBanner
                    items={[
                        <div className="flex items-center gap-2 bg-blue-100 p-1 rounded">
                            <img src="https://i.pravatar.cc/32?u=1" className="w-8 h-8 rounded-full" />
                            <span className="text-sm font-medium">TingXi Tan</span>
                        </div>,
                        <div className="flex items-center gap-2 bg-blue-100 p-1 rounded">
                            <img src="https://i.pravatar.cc/32?u=2" className="w-8 h-8 rounded-full" />
                            <span className="text-sm font-medium">Derek Zheng</span>
                        </div>,
                        <div className="flex items-center gap-2 bg-blue-100 p-1 rounded">
                            <img src="https://i.pravatar.cc/32?u=3" className="w-8 h-8 rounded-full" />
                            <span className="text-sm font-medium">Gabriel Chua</span>
                        </div>,
                    ]}
                    direction='right'
                />
            </div>
        </div>

    )

}

export default TopPartner;