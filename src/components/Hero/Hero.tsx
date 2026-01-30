import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import burgerHero from "@/assets/Image.svg";

interface HeroProps {
  onSearch: (value: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [localSearch, setLocalSearch] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && localSearch.trim() !== "") {
      const element = document.getElementById("restaurant-list");
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full flex items-center justify-center px-5.5 h-164 md:h-206.75">
      <img
        src={burgerHero}
        alt="Culinary Experience"
        className="absolute top-0 left-0 w-full h-full object-cover object-center"
      />
      <div className="flex flex-col gap-6 md:gap-10 justify-center items-center p-4 z-20">
        <div className="flex flex-col gap-1 md:gap-2 items-center text-center">
          <h1 className="text-white font-extrabold text-[36px]/[44px] md:text-[48px]/[60px] ">
            Explore Culinary Experiences
          </h1>
          <p className="text-white text-[18px]/[32px] md:text-[24px]/[36px] font-bold ">
            Search and refine your choice to discover the perfect restaurant.
          </p>
        </div>

        <div className="relative border w-full max-w-151 h-12 md:h-14 flex pl-8 md:pl-10 items-center rounded-full  bg-white ">
          <Search
            className="absolute w-5 h-5 left-4 top-3.5 md:left-6 md:top-4 text-neutral-600"
            
          />
          <Input
            type="text"
            placeholder="Search restaurants, food and drink"
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              onSearch(e.target.value); // Tetap update list di bawah secara real-time
            }}
            onKeyDown={handleKeyDown} // Tambahkan listener Enter
            className="w-full border-none bg-transparent placeholder:text-[14px]/[28px] placeholder:md:text-[16px]/[30px] text-black placeholder:text-neutral-600  focus-visible:ring-0 shadow-none"
          />
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-full z-10 border-white bg-linear-to-t from-black/80 to-transparent"></div>

    </div>
  );
};

export default Hero;
