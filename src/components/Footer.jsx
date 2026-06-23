import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import logo from "../assets/pop_logo_color_new2.png";

const Footer = () => {
  return (
    <footer className="bg-[#032F23] text-[#F5F1E8] pt-24 pb-10 px-6 md:px-12 border-t border-[#D4B56A]/15">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-14">
        {/* Brand */}

        <div>
          <img
            src={logo}
            alt="Pop Fresh"
            className="h-20 w-auto object-contain"
          />

          <p className="mt-6 text-[#B8C1B8] leading-8 text-lg max-w-sm">
            Premium roasted makhana crafted for modern snacking. Clean
            ingredients, bold flavours, and a crunch you'll keep coming back to.
          </p>

          {/* Social Icons */}

          <div className="flex gap-4 mt-8">
            <a
              href="https://www.instagram.com/popfresh_official/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-11 h-11
                flex items-center justify-center
                rounded-full
                border border-[#D4B56A]/30
                text-[#D4B56A]
                transition-all duration-300
                hover:bg-[#D4B56A]
                hover:text-[#032F23]
                hover:-translate-y-1
              "
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="mailto:info@popfresh.in"
              className="
                w-11 h-11
                flex items-center justify-center
                rounded-full
                border border-[#D4B56A]/30
                text-[#D4B56A]
                transition-all duration-300
                hover:bg-[#D4B56A]
                hover:text-[#032F23]
                hover:-translate-y-1
              "
            >
              <Mail size={18} />
            </a>

            <a
              href="tel:+917353129759"
              className="
                w-11 h-11
                flex items-center justify-center
                rounded-full
                border border-[#D4B56A]/30
                text-[#D4B56A]
                transition-all duration-300
                hover:bg-[#D4B56A]
                hover:text-[#032F23]
                hover:-translate-y-1
              "
            >
              <Phone size={18} />
            </a>
          </div>
        </div>

        {/* Shop */}

        <div>
          <h3 className="text-[#D4B56A] text-xs tracking-[0.3em] mb-6">SHOP</h3>

          <ul className="space-y-4 text-[#B8C1B8]">
            <li>
              <Link
                to="/products"
                className="hover:text-white transition-colors"
              >
                All Products
              </Link>
            </li>

            <li>
              <a href="#" className="hover:text-white transition-colors">
                Best Sellers
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-white transition-colors">
                Combo Packs
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-white transition-colors">
                Gift Boxes
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}

        <div>
          <h3 className="text-[#D4B56A] text-xs tracking-[0.3em] mb-6">
            SUPPORT
          </h3>

          <ul className="space-y-4 text-[#B8C1B8]">
            <li>
              <Link
                to="/contact"
                className="hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </li>

            <li>
              <Link
                to="/faq"
                className="hover:text-white transition-colors"
              >
                FAQs
              </Link>
            </li>

            <li>
              <Link
                to="/shipping-policy"
                className="hover:text-white transition-colors"
              >
                Shipping Policy
              </Link>
            </li>

            <li>
              <Link
                to="/return-refund-policy"
                className="hover:text-white transition-colors"
              >
                Return & Refund Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}

        <div>
          <h3 className="text-[#D4B56A] text-xs tracking-[0.3em] mb-6">
            STAY UPDATED
          </h3>

          <p className="text-[#B8C1B8] mb-5 leading-7">
            Get offers, new flavour launches and healthy snacking tips.
          </p>

          <div className="flex overflow-hidden rounded-full border border-[#D4B56A]/25">
            <input
              type="email"
              placeholder="Enter your email"
              className="
                flex-1
                bg-transparent
                px-5
                py-4
                outline-none
                text-sm
                placeholder:text-[#B8C1B8]
              "
            />

            <button
              className="
                px-6
                bg-[#D4B56A]
                text-[#032F23]
                font-semibold
                text-sm
                transition-all duration-300
                hover:bg-[#E3C57D]
              "
            >
              JOIN
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}

      <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-[#D4B56A]/15">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#B8C1B8]">
          <p>© 2026 Pop Fresh. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link
                to="/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>

            <span className="text-[#D4B56A]">•</span>

            <Link
                to="/terms-of-service"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>

            <span className="text-[#D4B56A]">•</span>

            <Link
                to="/return-refund-policy"
                className="hover:text-white transition-colors"
              >
                Return & Refund Policy
              </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
