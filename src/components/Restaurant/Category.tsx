import React from "react";
import icon1 from "@/assets/AllFood.svg";
import icon2 from "@/assets/Location.svg";
import icon3 from "@/assets/Discount.svg";
import icon4 from "@/assets/BestSeller.svg";
import icon5 from "@/assets/Delivery.svg";
import icon6 from "@/assets/Lunch.svg";

interface CategoryProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const Category: React.FC<CategoryProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const categories = [
    { id: "All", name: "All Restaurant", icon: icon1 },
    { id: "Nearby", name: "Nearby", icon: icon2 },
    { id: "Discount", name: "Discount", icon: icon3 },
    { id: "Best Seller", name: "Best Seller", icon: icon4 },
    { id: "Delivery", name: "Delivery", icon: icon5 },
    { id: "Recommended", name: "Lunch", icon: icon6 }, // Menggantikan Lunch
  ];

  return (
    <div className="flex flex-wrap w-full gap-5 px-4 py-6 md:gap-0 md:px-30 md:py-12 justify-center md:justify-around ">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="flex flex-col items-center gap-1 w-26.5 md:w-40.25 md:gap-1.5 cursor-pointer group"
          onClick={() => onCategoryChange(cat.id)}
        >
          <div
            className={`w-full h-25 rounded-2xl flex items-center justify-center shadow-md  transition-all duration-300 ${
              activeCategory === cat.id
                ? "bg-neutral-50 shadow-xl scale-105"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <img src={cat.icon} alt="icon" className="md:w-16.25 md:h-16.25 " />
          </div>
          <span
            className={`text-[14px] font-bold text-center transition-colors ${
              activeCategory === cat.id
                ? "text-neutral-800 font-extrabold"
                : "text-neutral-950"
            }`}
          >
            {cat.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Category;
