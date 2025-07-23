import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "@/components/Header";
import SliderBanner from "@/components/SliderBanner";
import FeaturedProduct from "@/components/FeaturedProduct";
import ProductGrid from "@/components/ProductGrid";
import products from "../data/products";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <div className="px-6 md:px-16 lg:px-32">
        <SliderBanner />
        <ProductGrid products={products} />
        <FeaturedProduct />
        <Banner />
      </div>
      

    </div>
  );
}
