"use client";

import { usePathname } from "next/navigation";
import HeroTypes from "./HeroTypes";
import SlateContainer from "@/components/templates/SlateContainer/SlateContainer";

const heroData: HeroTypes = {
  beverages: {
    title: "Beverage Menu",
    description: "Enjoy our handcrafted beverages",
  },
  food: {
    title: "Food Menu",
    description: "Enjoy freshly baked pastries made daily",
  },
};

const Hero = () => {
  const pathname = usePathname();
  const cleanedPathname = pathname.slice(1);

  let heroContent;

  if (heroData[cleanedPathname]) {
    heroContent = (
      <SlateContainer>
        <div className="h-full flex flex-col md:flex-row justify-evenly self-center">
          <h1 className="m-1 text-4xl font-bold self-center">
            {heroData[cleanedPathname].title}
          </h1>
          <p className="text-xl font-bold self-center">
            {heroData[cleanedPathname].description}
          </p>
        </div>
      </SlateContainer>
    );
  }

  return <>{heroContent}</>;
};

export default Hero;
