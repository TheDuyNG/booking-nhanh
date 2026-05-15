import MarqueeModule from "react-fast-marquee";

const Marquee = MarqueeModule.default || MarqueeModule;

const AdsBanner = ({
    items = [],
    direction = "left",
    style = {},
}) => {

    return (
        <div className="" style={style}>
            <Marquee
                direction={direction}
                autoFill={true}
            >
                {items.map((item, index) => (
                    <div key={index} className="mx-4">
                        {item}
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default AdsBanner;