"use client";

import React from "react";
import Slider from "react-slick";



const SliderBanner = () => {
    const bannerImages = [
        {
            id: 1,
            url: "/assets/banners/header_playstation_image.png",
            caption: "Big Deals Everyday",
        },
        {
            id: 2,
            url: "/assets/banners/header_playstation_image.png",
            caption: "Shop Smart, Live Better",
        },
        {
            id: 3,
            url: "/assets/banners/header_playstation_image.png",
            caption: "Hottest Electronics & Gadgets",
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <div className="w-full overflow-hidden">
            <Slider {...settings}>
                {bannerImages.map((slide) => (
                    <div key={slide.id} className="relative h-[400px] md:h-[550px]">
                        <img
                            src={"assets/banners/header_playstation_image.png"}
                            alt={`Banner ${slide.id}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <h2 className="text-white text-2xl md:text-4xl font-bold text-center">
                                {slide.caption}
                            </h2>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SliderBanner;