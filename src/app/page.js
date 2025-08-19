"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "@/components/Header";
import SliderBanner from "@/components/SliderBanner";
import FeaturedProduct from "@/components/FeaturedProduct";
import ProductGrid from "@/components/ProductGrid";
import products from "../data/products";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="home">
      <Header />
      <SliderBanner />
      <FeaturedProduct products={products} />
      <ProductGrid products={products} />
      <Banner />
      <Footer />
    </div>
  );
}
