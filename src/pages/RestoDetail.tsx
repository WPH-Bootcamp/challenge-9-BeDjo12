import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Share2, Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import api from "@/services/api/axios";
import Footer from "@/components/Navbar/Footer";

const RestoDetail = () => {
  const { id } = useParams();

  const [resto, setResto] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeMenuCategory, setActiveMenuCategory] = useState("All Menu");
  const [currentSlide, setCurrentSlide] = useState(0);

  // 1. Deklarasikan State keranjang dulu
  const [cartQuantities, setCartQuantities] = useState<{
    [key: string]: number;
  }>({});

  // 2. Baru hitung totalnya di bawahnya
  const totalCartItems = Object.values(cartQuantities).reduce(
    (a, b) => a + b,
    0,
  );

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/api/resto/${id}?limitMenu=10&limitReview=6`,
        );
        if (response.data && response.data.data) {
          setResto(response.data.data);
        }
      } catch (error) {
        console.error("Gagal mengambil detail:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  const incrementQty = (menuId: string) => {
    setCartQuantities((prev) => ({
      ...prev,
      [menuId]: (prev[menuId] || 0) + 1,
    }));
  };

  const decrementQty = (menuId: string) => {
    setCartQuantities((prev) => {
      const currentQty = prev[menuId] || 0;
      if (currentQty <= 1) {
        const newState = { ...prev };
        delete newState[menuId];
        return newState;
      }
      return { ...prev, [menuId]: currentQty - 1 };
    });
  };

  const filteredMenus =
    resto?.menus?.filter((menu: any) => {
      if (activeMenuCategory === "All Menu") return true;
      return menu.type?.toLowerCase() === activeMenuCategory.toLowerCase();
    }) || [];

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen font-black text-gray-400">
        LOADING...
      </div>
    );
  if (!resto)
    return (
      <div className="flex justify-center items-center h-screen font-bold">
        Restoran tidak ditemukan
      </div>
    );

  return (
    <div className="min-h-screen">
      <Navbar cartCount={totalCartItems} />
      {/* Hero Section */}
      <div className="w-full relative top-0 border">
        <div className="relative w-full aspect-4/3 overflow-hidden shadow-sm bg-gray-200">
          <img
            src={
              resto.images && resto.images.length > 0
                ? resto.images[currentSlide]
                : resto.logo
            }
            className="w-full h-full object-cover transition-all duration-500"
            alt={resto.name}
          />

          {/* Indikator Slider berdasarkan jumlah array images */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {resto.images?.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-[#C62828]"
                    : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Brand Info */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-white rounded-full p-2 shadow-md flex items-center justify-center border border-gray-100">
              <img
                src={resto.logo}
                className="w-full h-full object-contain"
                alt="Logo"
              />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                {resto.name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Star size={18} className="text-yellow-500 fill-yellow-500" />
                <span className="text-lg font-bold text-gray-800">
                  {resto.star}
                </span>
                <span className="text-gray-400 font-bold">•</span>
                <p className="text-sm font-bold text-gray-500">{resto.place}</p>
              </div>
            </div>
          </div>
          <button className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
            <Share2 size={22} />
          </button>
        </div>
      </div>

      {/* Menu Section */}
      <div className="px-8 mt-10">
        <h2 className="text-xl font-black  mb-6">Menu</h2>
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
          {["All Menu", "Food", "Drink"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveMenuCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all border ${
                activeMenuCategory === cat
                  ? "bg-[#C62828] text-white border-[#C62828]"
                  : "bg-white text-gray-400 border-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredMenus.map((menu: any) => {
            const qty = cartQuantities[menu.id] || 0;
            return (
              <div
                key={menu.id}
                className="bg-white rounded-xl p-3 shadow-sm border border-gray-50 flex flex-col"
              >
                <div className="w-full aspect-square rounded-xl overflow-hidden mb-3">
                  <img
                    src={menu.image}
                    className="w-full h-full object-cover"
                    alt={menu.foodName}
                  />
                </div>
                <h3 className="font-bold text-sm text-gray-800 line-clamp-1">
                  {menu.foodName}
                </h3>
                <p className="text-[#C62828] font-black text-sm mt-1">
                  Rp {menu.price?.toLocaleString()}
                </p>

                <div className="mt-3 h-10">
                  {qty === 0 ? (
                    <button
                      onClick={() => incrementQty(menu.id)}
                      className="w-full h-full bg-[#C62828] text-white rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                    >
                      <Plus size={16} />{" "}
                      <span className="text-xs font-bold">Add</span>
                    </button>
                  ) : (
                    <div className="w-full h-full flex items-center justify-between px-1">
                      <button
                        onClick={() => decrementQty(menu.id)}
                        className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold">{qty}</span>
                      <button
                        onClick={() => incrementQty(menu.id)}
                        className="w-9 h-9 bg-[#C62828] text-white rounded-full flex items-center justify-center"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Section */}
      <div className="px-8 mt-16">
        <h2 className="text-xl font-black text-gray-900 mb-6">Review</h2>
        <div className="space-y-6">
          {resto.reviews?.map((rev: any, i: number) => (
            <div key={i} className="border-b border-gray-50 pb-6">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={
                    rev.user?.avatar ||
                    `https://i.pravatar.cc/100?u=${rev.user?.id}`
                  }
                  className="w-10 h-10 rounded-full object-cover"
                  alt="User"
                />
                <div>
                  <h4 className="font-bold text-sm">{rev.user?.name}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={12}
                    className={
                      idx < rev.star
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200"
                    }
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Bar */}
      {Object.keys(cartQuantities).length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#121212] rounded-3xl p-4 shadow-2xl z-50 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden">
              {/* Menampilkan gambar item pertama di cart */}
              <img
                src={resto.menus.find((m: any) => cartQuantities[m.id])?.image}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">
                Total Items
              </p>
              <p className="font-bold">
                {Object.values(cartQuantities).reduce((a, b) => a + b, 0)} Items
              </p>
            </div>
          </div>
          <button className="bg-[#C62828] px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all">
            Checkout
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default RestoDetail;
