import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "@/components/Header";
import SliderBanner from "@/components/SliderBanner";
import FeaturedProduct from "@/components/FeaturedProduct";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <SliderBanner />
      <FeaturedProduct/>
    </div>
  );
}
