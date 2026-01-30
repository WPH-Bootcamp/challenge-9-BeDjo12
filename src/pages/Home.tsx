import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Category from "@/components/Restaurant/Category";
import List from "@/components/Restaurant/List";
import Footer from "@/components/Navbar/Footer";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("Recommended");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full max-h-360 min-h-screen bg-[#F5F5F5] flex flex-col items-center pb-10">
      <Navbar />
      <div className="w-full flex flex-col">
        <Hero onSearch={setSearchQuery} />

        <Category
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <List activeCategory={activeCategory} searchQuery={searchQuery} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
