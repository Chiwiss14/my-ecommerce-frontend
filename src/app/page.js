"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "@/components/Header";
 
// ✅ Dynamically import SliderBanner with SSR disabled
const DynamicSliderBanner = dynamic(
  () => import('@/components/SliderBanner'),
  { ssr: false }
);
import FeaturedProduct from "@/components/FeaturedProduct";
import ProductGrid from "@/components/ProductGrid";
import products from "../data/products";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="home">
      <Header />
      <DynamicSliderBanner /> {/* ✅ Use the dynamically imported component */}
      {/* <SliderBanner /> */}
      <FeaturedProduct products={products} />
      <ProductGrid />
      <Banner />
      <Footer />
    </div>
  );
}
