import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { logout } from "@/features/authSlice";
import type { RootState, AppDispatch } from "@/features/store";
import Logo from "./Logo";
import { FaBagShopping } from "react-icons/fa6";
import { IoMdLogIn } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";

// chekout
interface NavbarProps {
  cartCount?: number;
}
const Navbar = ({ cartCount = 0 }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // State untuk deteksi scroll

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  // Fungsi untuk memantau posisi scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav
      className={`w-full h-14 md:h-20 md:px-30 fixed top-0 z-50 px-4 flex justify-between items-center transition-all duration-300 ${
        isScrolled ? "bg-white" : "bg-transparent"
      }`}
    >
      {/* Logo / Brand */}
      <Link to="/">
        <div className="flex gap-3.75 items-center">
          <div className="w-10 h-10 md:w-10.5 md:h-10.5">
            <Logo />
          </div>
          <p
            className={`transition-all text-[32px]/[42px] font-extrabold duration-300 hidden md:block ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            Foody
          </p>
        </div>
      </Link>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="relative p-2">
          {/* Ikon Keranjang Belanja */}
          <div className="w-7 h-7 md:w-8 md:h-8 p-1">
            <FaBagShopping
              className={`w-full h-full transition-all duration-300 ${
                isScrolled ? "text-black" : "text-white"
              }`}
            />
          </div>

          {/* Badge Angka Merah (Hanya muncul jika > 0) */}
          {cartCount > 0 && (
            <div className="absolute top-2 right-1 w-5 h-5 bg-[#C12116] text-[12px] text-white font-black border rounded-full flex items-center justify-center animate-in zoom-in duration-300">
              {cartCount}
            </div>
          )}
        </div>

        {/* Profile Avatar & Dropdown */}
        <div className="relative flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 md:w-12 md:h-12 cursor-pointer rounded-full overflow-hidden"
          >
            <img
              src={user?.avatar || "https://i.pravatar.cc/150?u=johndoe"}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsMenuOpen(false)}
              ></div>
              <div className="absolute right-0 top-16 w-49.25 bg-white rounded-2xl z-20 overflow-hidden flex flex-col items-start py-4 px-4 gap-3 animate-in fade-in zoom-in duration-200 origin-top-right">
                {/* User Header */}
                <div className="flex items-start gap-2">
                  <div className="w-9 h-9 rounded-full overflow-hidden">
                    <img
                      src={
                        user?.avatar || "https://i.pravatar.cc/150?u=johndoe"
                      }
                      className="w-full h-full object-cover"
                      alt="Profile"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[18px]/[32px] ">
                      {user?.name || "John Doe"}
                    </span>
                  </div>
                </div>
                <div className="w-full border-b border-neutral-200"></div>
                {/* Menu Items */}

                <button className="w-full cursor-pointer flex items-center gap-2 text-neutral-900 hover:bg-gray-50  transition-all group">
                  <MapPin
                    size={20}
                    className="text-neutral-900 group-hover:text-[#C62828]"
                  />
                  <span className="text-[14px]/[28px] font-medium">
                    Delivery Address
                  </span>
                </button>
                <button className="w-full cursor-pointer flex items-center gap-2 text-neutral-900 hover:bg-gray-50  transition-all group">
                  <IoDocumentTextOutline
                    size={20}
                    className="text-gray-400 group-hover:text-[#C62828]"
                  />
                  <span className="text-[14px]/[28px] font-medium">
                    My Orders
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full cursor-pointer flex items-center gap-2 text-neutral-900 hover:bg-gray-50  transition-all group"
                >
                  <IoMdLogIn size={20} className="rotate-180" />
                  <span className="text-[14px]/[28px] font-medium">Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
        <p
          className={`text-[18px]/[32px] font-semibold transition-all duration-300 hidden md:block ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          {" "}
          {user?.name || "John Doe"}
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
