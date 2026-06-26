import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartIcon({ onClick }) {
  const { totalItems } = useCart();

  if (totalItems === 0) return null;

  return (
    <button
      onClick={onClick}
      className="
        relative
        flex
        items-center
        justify-center

        h-12
        w-12

        rounded-full

        bg-white/90
        backdrop-blur-xl

        border
        border-[#E5DCC7]

        shadow-lg

        transition-all
        duration-300

        hover:scale-105
        hover:shadow-xl
      "
    >
      {/* Icon */}

      <ShoppingBag
        size={22}
        className="text-[#174C35]"
      />

      {/* Badge */}

      <span
        className="
          absolute

          -top-2
          -right-2

          min-w-[22px]
          h-[22px]

          px-1

          rounded-full

          bg-[#E4C06A]

          text-[#174C35]

          text-[11px]

          font-bold

          flex
          items-center
          justify-center

          shadow-md
        "
      >
        {totalItems}
      </span>
    </button>
  );
}