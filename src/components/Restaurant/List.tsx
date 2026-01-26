import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, X, ListFilter } from "lucide-react";
import {
  getRestaurants,
  getRecommendedRestaurants,
} from "@/services/restaurantService";

interface ListProps {
  activeCategory: string;
  searchQuery: string;
}

const List: React.FC<ListProps> = ({ activeCategory, searchQuery }) => {
  const [rawData, setRawData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const showFilterUI = activeCategory.toLowerCase().includes("all");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await (activeCategory === "Recommended"
          ? getRecommendedRestaurants()
          : getRestaurants());

        const root = response?.data;
        const payload = root?.data || root;

        let finalArray = [];

        if (activeCategory === "Recommended") {
          const recommendations = payload?.recommendations || [];
          finalArray = recommendations.map((resto: any) => ({
            ...resto,

            name: resto.name,
            star: resto.star || resto.rating || 4.9,
            place: resto.place || "Jakarta Selatan",
            distance: resto.distance || "2.4 km",
            isMenuType: false,
          }));
        } else {
          if (Array.isArray(payload)) {
            finalArray = payload;
          } else if (
            payload?.restaurants &&
            Array.isArray(payload.restaurants)
          ) {
            finalArray = payload.restaurants;
          } else {
            finalArray = [];
          }
        }

        setRawData(finalArray);
        setVisibleCount(5);
      } catch (error) {
        console.error("Gagal load data:", error);
        setRawData([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [activeCategory]);

  const filteredData = rawData.filter((item) => {
    const search = searchQuery.toLowerCase();
    const name = (item?.foodName || item?.name || "").toLowerCase();
    const place = (item?.restaurantPlace || item?.place || "").toLowerCase();
    const matchesSearch = name.includes(search) || place.includes(search);

    if (
      searchQuery === "" &&
      activeCategory !== "Recommended" &&
      item.isMenuType
    ) {
      return false;
    }
    return matchesSearch;
  });

  const displayData = filteredData.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="p-20 text-center font-black text-gray-300 animate-pulse tracking-widest uppercase text-xs">
        Memuat Restoran...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 md:px-30 md:gap-8 px-4 pt-6 pb-12 transition-all duration-500">
      {/* --- HEADER LIST --- */}
      <div className="w-full flex justify-between items-center ">
        <div>
          <h2 className="font-extrabold text-[24px]/[38px] md:text-[32px]/[42px] ">
            {showFilterUI ? "All Restaurant" : activeCategory}
          </h2>
        </div>

        {filteredData.length > visibleCount && (
          <button
            onClick={() => setVisibleCount(filteredData.length)}
            className={`text-[#C12116] font-black text-[16px] cursor-pointer ${
              showFilterUI ? "hidden" : "block"
            }`}
          >
            See All
          </button>
        )}
      </div>

      {/* --- BODY AREA --- */}
      <div className="flex flex-col md:flex-row w-full md:flex gap-10 items-start">
        {showFilterUI && (
          <aside className="hidden md:block w-66.5 p-3 rounded-xl shadow-xl">
            <FilterContent />
          </aside>
        )}

        <div className="w-full flex flex-col items-center">
          {showFilterUI && (
            <button
              onClick={() => setIsFilterOpen(true)}
              className="md:hidden w-full flex justify-between items-center p-5 rounded-3xl mb-6 shadow-sm border border-gray-100 active:scale-95 transition-all"
            >
              <span className="font-extrabold text-[16px]">FILTER</span>
              <div>
                <ListFilter size={20} />
              </div>
            </button>
          )}

          {/* GRID ITEM */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3  md:gap-10 gap-4">
            {displayData.length > 0 ? (
              displayData.map((item, index) => {
                const isRecommended = activeCategory === "Recommended";

                return (
                  <Link
                    key={item?.id || index}
                    to={
                      isRecommended
                        ? `/restaurant/${item.id}`
                        : `/restaurant/${item.id}`
                    }
                    className="w-full md:max-w-92.5 group"
                  >
                    <div className="p-3 rounded-2xl md:p-4  flex items-center gap-2 hover:scale-105 shadow-lg group-hover:shadow-md active:scale-[0.98] transition-all duration-300">
                      <div className="w-22.5 md:min-w-18 md:w-30 md:min-h-30 h-22.5 rounded-xl overflow-hidden">
                        <img
                          src={
                            item?.image ||
                            item?.photo ||
                            item?.logo ||
                            "https://placehold.co/200"
                          }
                          alt={item?.name}
                          className="h-full object-cover transition-transform duration-500 group-hover:scale-90 rounded-xl"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <h3 className="font-extrabold text-[16px] md:text-[18px]">
                          {item?.name || "Unnamed Restaurant"}
                        </h3>
                        <div className="flex gap-1">
                          <Star
                            className="text-[#FFAB0D] fill-[#FFAB0D]"
                            size={17}
                          />
                          <span className="font-medium text-[14px] md:text-[16px]">
                            {item?.star || item?.rating || "4.9"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 font-medium text-[14px] md:text-[16px]">
                          <span className="truncate">
                            {item?.place || "Location"} •{" "}
                            {item?.distance || "2.4 km"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="text-center py-20 font-bold text-gray-300 uppercase tracking-widest text-xs">
                No data
              </div>
            )}
          </div>

          {rawData.length > visibleCount && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className={`w-40 h-10 border mt-4 border-neutral-300 font-bold text-[14px] rounded-full hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer shadow-lg ${
                showFilterUI ? "hidden" : "block"
              }`}
            >
              Show More
            </button>
          )}
        </div>
      </div>

      {/* MOBILE OVERLAY FILTER */}
      {isFilterOpen && (
        <div className="absolute inset-0 z-50  md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="absolute left-0 top-0 w-75.25 h-200 bg-white px-4 py-7 flex flex-col gap-3">
            <div className="flex justify-between items-center ">
              <h2 className="text-[16px] font-bold uppercase ">Filter</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="absolute -right-12 w-8 h-8 rounded-full bg-white flex items-center justify-center"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 ">
              <FilterContent />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- KOMPONEN FILTER
const FilterContent = () => (
  <div className="space-y-12">
    <section className="flex flex-col gap-6">
      <h3 className="text-[16px] font-extrabold">FILTER</h3>
      <h3 className="text-[14px] font-extrabold mb-3">Distance</h3>
      <div className="space-y-5">
        {["Nearby", "1km - 3km", "Di atas 5km"].map((dist) => (
          <label
            key={dist}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input type="checkbox" className="w-5 h-5 accent-[#C12116]" />
            <span className="text-sm">{dist}</span>
          </label>
        ))}
      </div>
    </section>

    <section>
      <h3 className="text-[14px] font-extrabold mb-3">Price</h3>
      <div className="flex flex-col gap-2">
        {["Min", "Max"].map((label) => (
          <div
            key={label}
            className="rounded-lg border border-neutral-200 flex items-center"
          >
            <span className="text-[14px] font-neutral rounded-sm flex items-center justify-center w-9 h-9 bg-neutral-300 mr-4">
              Rp
            </span>
            <input
              type="number"
              placeholder={label === "Min" ? "Minimum Price" : "Maximum Price"}
              className="bg-transparent text-sm font-bold w-full"
            />
          </div>
        ))}
      </div>
    </section>

    <section>
      <h3 className="text-[14px] font-extrabold mb-3">Rating</h3>
      <div className="flex flex-col gap-3">
        {[5, 4, 3, 2, 1].map((star) => (
          <button
            key={star}
            className="flex  bg-gray-50 rounded-xl border border-gray-100 gap-1"
          >
            <input type="checkbox" className="w-5 h-5 accent-[#C12116]" />
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[14px]">{star}</span>
          </button>
        ))}
      </div>
    </section>
  </div>
);

export default List;
