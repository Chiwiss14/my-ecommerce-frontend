"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// Import slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Dynamically import react-slick
const SliderDynamic = dynamic(() => import("react-slick"), { ssr: false });

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
      buttonPrimary: { text: "Browse Fashion", link: "/products/fashion" }, 
      buttonSecondary: { text: "View All Categories", link: "/categories" },
    },
    {
      id: 3,
      tag: "Exclusive Deals!",
      headline: "Home Essentials - Upgrade Your Living Space!",
      subheadline: "Everything you need for a comfortable and stylish home.",
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
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto my-5 overflow-hidden rounded-lg bg-[#E6E9F2] min-h-[350px] aspect-[16/7] md:min-h-[400px] lg:min-h-[500px]">
      <SliderDynamic {...settings}>
        {bannerImages.map((slide) => (
          <div
            key={slide.id}
            className="relative flex items-center justify-between p-6 md:p-10 lg:p-16 h-full box-border"
          >
            {/* Left Content */}
            <div className="flex-1 pr-0 md:pr-8 text-center md:text-left z-10">
              <span className="inline-block bg-quickbuyAccent text-indigo-600 px-2.5 py-1.5 rounded-md text-sm font-semibold mb-2">
                {slide.tag}
              </span>

              <h1 className="text-xl md:text-3xl lg:text-5xl font-semibold text-quickbuyDark leading-tight mb-3">
                {slide.headline}
              </h1>

              <p className="text-base md:text-lg text-quickbuyGray mb-6">
                {slide.subheadline}
              </p>

              <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center md:justify-start">
                <Link
                  href={slide.buttonPrimary.link}
                  className="inline-block bg-quickbuyPrimary text-white px-4 py-2 rounded-lg font-bold transition duration-300 shadow-md text-center text-sm md:text-base hover:bg-orange-700 hover:scale-105 hover:shadow-lg"
                >
                  {slide.buttonPrimary.text}
                </Link>

                <Link
                  href={slide.buttonSecondary.link}
                  className="inline-block bg-transparent text-quickbuyPrimary border-2 border-quickbuyPrimary px-3 py-1 rounded-lg font-bold transition duration-300 text-center text-xs md:text-sm hover:bg-quickbuyPrimary hover:text-black hover:scale-105 hover:shadow-lg hover:border-transparent"
                >
                  {slide.buttonSecondary.text} →
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex-1 flex justify-center items-center h-[200px] md:h-[320px] lg:h-[420px] mt-4 md:mt-0">
              <Image
                src={slide.imageUrl}
                alt={slide.altText}
                fill
                priority={slide.id === 1}
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        ))}
      </SliderDynamic>
    </div>
  );
};

export default SliderBanner;
