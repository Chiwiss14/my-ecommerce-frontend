"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// ✅ All slick-carousel imports must be here
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ✅ Dynamically import the Slider component with ssr: false
const SliderDynamic = dynamic(() => import("react-slick"), {
  ssr: false,
});

const SliderBanner = () => {
  const bannerImages = [
    {
      id: 1,
      tag: "Limited Time Offer!",
      headline: "Unleash Your Productivity - Discover the Latest Gadgets!",
      subheadline:
        "From Smartphones to Smartwatches, find your perfect tech companion.",
      imageUrl: "/assets/banners/header_playstation_image.png",
      altText: "Collection of modern tech gadgets",
      buttonPrimary: { text: "Shop Now", link: "/products/gadgets" },
      buttonSecondary: { text: "Learn More", link: "/about/tech" },
    },
    {
      id: 2,
      tag: "New Arrivals!",
      headline: "Step Up Your Style - Explore Our Fashion Collection!",
      subheadline: "Trendy apparel, shoes, and accessories for every occasion.",
      imageUrl: "/assets/banners/headphone_image.png",
      altText: "Stylish fashion apparel",
      buttonPrimary: { text: "Browse Fashion", link: "//products/fashion" },
      buttonSecondary: { text: "View All Categories", link: "/categories" },
    },
    {
      id: 3,
      tag: "Exclusive Deals!",
      headline: "Home Essentials - Upgrade Your Living Space!",
      subheadline: "everything you need for a comfortable and stylish home.",
      imageUrl: "/assets/banners/recliner-chair-sofa.jpg",
      altText: "Cozy home interior with essentials",
      buttonPrimary: { text: "Shop Home Decor", link: "/products/home" },
      buttonSecondary: {
        text: "Discover Collections",
        link: "/collections/home",
      },
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto my-5 overflow-hidden rounded-lg bg-[#E6E9F2] min-h-[350px] aspect-[16/7] md:min-h-[400px] lg:min-h-[500px]">
           {" "}
      <SliderDynamic {...settings}>
               {" "}
        {bannerImages.map((slide) => (
          <div
            key={slide.id}
            className="relative !flex items-center justify-between p-6 md:p-10 lg:p-16 h-full box-border"
          >
                       {" "}
            <div className="flex-1 pr-0 md:pr-8 text-center md:text-left z-10 w-full md:w-auto">
                           {" "}
              <span className="inline-block bg-quickbuyAccent text-indigo-600 px-2.5 py-1.5 rounded-md text-sm font-semibold mb-1 md:mb-2">
                                {slide.tag}             {" "}
              </span>
                           {" "}
              <h1 className="text-1xl md:text-3xl lg:text-5xl font-semibold text-quickbuyDark leading-tight mb-1 md:mb-2">
                                {slide.headline}             {" "}
              </h1>
                           {" "}
              <p className="text-base md:text-lg text-quickbuyGray mb-4 md:mb-6">
                                {slide.subheadline}             {" "}
              </p>
                           {" "}
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center md:justify-start">
                               {" "}
                <Link
                  href={slide.buttonPrimary.link}
                  className="inline-block bg-quickbuyPrimary text-indigo px-4 py-2 rounded-lg font-bold transition duration-300 shadow-md text-center text-sm md:text-base
                  hover:bg-orange-700 hover:scale-105 hover:shadow-lg w-full md:w-auto"
                >
                                      {slide.buttonPrimary.text}               {" "}
                </Link>
                               {" "}
                <Link
                  href={slide.buttonSecondary.link}
                  className="inline-block bg-transparent text-quickbuyPrimary border-2 border-quickbuyPrimary px-3 py-1 rounded-lg font-bold transition duration-300 text-center text-xs md:text-sm
                  hover:bg-quickbuyPrimary hover:text-black hover:scale-105 hover:shadow-lg hover:border-transparent w-full md:w-auto"
                >
                                      {slide.buttonSecondary.text} &rarr;      
                           {" "}
                </Link>
                             {" "}
              </div>
                         {" "}
            </div>
                       {" "}
            <div className="relative flex-1 flex justify-center items-center h-[150px]  md:h-[300px] lg:h-[400px] mt-4 md:mt-0">
                           {" "}
              <Image
                src={slide.imageUrl}
                alt={slide.altText}
                fill
                priority={slide.id === 1}
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
                         {" "}
            </div>
                     {" "}
          </div>
        ))}
             {" "}
      </SliderDynamic>
         {" "}
    </div>
  );
};

export default SliderBanner;
