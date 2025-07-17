import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "@/components/Header";
import SliderBanner from "@/components/SliderBanner";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <SliderBanner />
       <img src="/assets/banners/headphone_image.png" alt="Banner" />
    </div>
  );
}
