import React from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Logo from "/Clippathgroup.svg";

// Jika Anda tidak menggunakan lucide-react, Anda bisa mengganti bagian ikon
// dengan SVG atau library ikon pilihan Anda (seperti FontAwesome).

const Footer = () => {
  return (
    <footer className="bg-[#0b0e14] w-full text-white py-12 px-6 md:px-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10">
        {/* Kolom Kiri: Brand & Deskripsi */}
        <div className="flex-1 max-w-sm">
          <div className="flex items-center gap-2 mb-6">
            <img src={Logo} alt="" />
            <h2 className="text-3xl font-bold tracking-tight">Foody</h2>
          </div>

          <p className="text-gray-300 leading-relaxed mb-8 text-sm md:text-base">
            Enjoy homemade flavors & chef's signature dishes, freshly prepared
            every day. Order online or visit our nearest branch.
          </p>

          <div>
            <h4 className="font-bold mb-4">Follow on Social Media</h4>
            <div className="flex gap-3">
              <SocialIcon>
                <Facebook size={20} />
              </SocialIcon>
              <SocialIcon>
                <Instagram size={20} />
              </SocialIcon>
              <SocialIcon>
                <Linkedin size={20} />
              </SocialIcon>
              {/* Custom TikTok Icon */}
              <SocialIcon>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a8.117 8.117 0 01-1.89-1.51v6.26c.19 5.95-5.85 10.55-11.45 8.18-3.3-1.39-5.18-5.18-4.1-8.58 1.11-3.56 4.91-5.84 8.57-5.07V12.3c-2.01-.51-4.15.4-4.94 2.3-.81 1.94.02 4.33 1.91 5.23 1.88.91 4.3-.23 4.88-2.27.1-.35.13-.71.13-1.07V0h.04z" />
                </svg>
              </SocialIcon>
            </div>
          </div>
        </div>

        {/* Bagian Link (Kanan pada MD, Bawah pada SM) */}
        <div className="flex flex-row flex-wrap gap-16 md:gap-24 lg:gap-32">
          {/* Group: Explore */}
          <div>
            <h3 className="text-lg font-bold mb-6">Explore</h3>
            <ul className="space-y-4 text-gray-300 text-sm md:text-base">
              <li>
                <a href="#" className="hover:text-white transition">
                  All Food
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Nearby
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Discount
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Best Seller
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Lunch
                </a>
              </li>
            </ul>
          </div>

          {/* Group: Help */}
          <div>
            <h3 className="text-lg font-bold mb-6">Help</h3>
            <ul className="space-y-4 text-gray-300 text-sm md:text-base">
              <li>
                <a href="#" className="hover:text-white transition">
                  How to Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Payment Methods
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Track My Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:bg-white hover:text-black cursor-pointer transition-all duration-300">
    {children}
  </div>
);

export default Footer;
