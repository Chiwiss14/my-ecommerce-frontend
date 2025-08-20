"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import FeaturedProduct from "@/components/FeaturedProduct";
import ProductGrid from "@/components/ProductGrid";
import products from "../data/products";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

// ✅ Dynamically import the SliderBanner component with SSR disabled
const DynamicSliderBanner = dynamic(() => import("@/components/SliderBanner"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="home">
            <Header />
            <DynamicSliderBanner />
            <FeaturedProduct products={products} />
            <ProductGrid products={products} />
            <Banner />
            <Footer />   {" "}
    </div>
  );
}
