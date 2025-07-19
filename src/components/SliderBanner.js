"use client";

import React from "react";
import Image from 'next/image'; // For optimized images in Next.js
import Link from 'next/link';

import dynamic from 'next/dynamic';
// Correct: Define SliderDynamic once and use it below
const SliderDynamic = dynamic(() => import('react-slick'), {
  
});





const SliderBanner = () => {
    const bannerImages = [
        {
            id: 1,
            tag: 'Limited Time Offer!',
            headline: 'Unleash Your Productivity - Discover the Latest Gadgets!',
            subheadline: 'From Smartphones to Smartwatches, find your perfect tech companion.',
            imageUrl: '/assets/banners/header_playstation_image.png',
            altText: 'Collection of modern tech gadgets',
            buttonPrimary: { text: 'Shop Now', link: '/products/gadgets' },
            buttonSecondary: { text: 'Learn More', link: '/about/tech' },
        },
        {
            id: 2,
            tag: 'New Arrivals!',
            headline: 'Step Up Your Style - Explore Our Fashion Collection!',
            subheadline: 'Trendy apparel, shoes, and accessories for every occasion.',
            imageUrl: '/assets/banners/headphone_image.png',
            altText: 'Stylish fashion apparel',
            buttonPrimary: { text: 'Browse Fashion', link: '/products/fashion' },
            buttonSecondary: { text: 'View All Categories', link: '/categories' },
        },
        {
            id: 3,
            tag: 'Exclusive Deals!',
            headline: 'Home Essentials - Upgrade Your Living Space!',
            subheadline: 'Find everything you need for a comfortable and stylish home.',
            imageUrl: '/assets/banners/recliner-chair-sofa.jpg',
            altText: 'Cozy home interior with essentials',
            buttonPrimary: { text: 'Shop Home Decor', link: '/products/home' },
            buttonSecondary: { text: 'Discover Collections', link: '/collections/home' },
        },
    ];


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000, // 5 seconds
        arrows: false,
    };

    return (
    <div className="relative w-full max-w-7xl mx-auto my-5 overflow-hidden rounded-lg bg-quickbuyLightGray min-h-[350px] aspect-[16/7] md:min-h-[400px] lg:min-h-[500px]">
      <SliderDynamic {...settings}>
        {bannerImages.map((slide) => (
          <div key={slide.id} className="relative !flex items-center justify-between p-6 md:p-10 lg:p-16 h-full box-border">
            {/* Using !flex to override slick's default inline-block */}
            <div className="flex-1 pr-4 md:pr-8 text-left z-10">
              <span className="inline-block bg-quickbuyAccent text-white px-2.5 py-1.5 rounded-md text-sm font-semibold mb-3 md:mb-4">
                {slide.tag}
              </span>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-quickbuyDark leading-tight mb-3 md:mb-4">
                {slide.headline}
              </h1>
              <p className="text-base md:text-lg text-quickbuyGray mb-6 md:mb-8">
                {slide.subheadline}
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <Link href={slide.buttonPrimary.link} className="inline-block bg-quickbuyPrimary text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition duration-300 shadow-md text-center">
                    {slide.buttonPrimary.text}
                </Link>
                <Link href={slide.buttonSecondary.link} className="inline-block bg-transparent text-quickbuyPrimary border-2 border-quickbuyPrimary px-6 py-3 rounded-lg font-bold hover:bg-quickbuyPrimary hover:text-white transition duration-300 text-center">
                    {slide.buttonSecondary.text} &rarr;
                </Link>
              </div>
            </div>
            <div className="relative flex-1 flex justify-center items-center h-[200px] md:h-[300px] lg:h-[400px]">
              <Image
                src={slide.imageUrl}
                alt={slide.altText}
                fill // Use fill to make image expand to parent
                priority={slide.id === 1} // Prioritize loading the first image
                className="object-contain" // Or object-cover, depending on how you want the image to fit
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize image loading
              />
            </div>
          </div>
        ))}
      </SliderDynamic>
    </div>
  );
};

export default SliderBanner;