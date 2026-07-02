import { Minus, Plus } from "lucide-react";
import { toast } from "react-toastify";

export default function QuantitySelector({
  quantity,
  setQuantity,
  min = 1,
  max = 99,
  disabled = false,
}) {

  const decrease = () => {

    if (disabled) {
      toast.info(
        "Sorry! This product is currently out of stock."
      );
      return;
    }

    if (quantity <= min) {
      return;
    }

    setQuantity(quantity - 1);

  };

  const increase = () => {

    if (disabled) {
      toast.info(
        "Sorry! This product is currently out of stock."
      );
      return;
    }

    if (quantity >= max) {

      toast.info(
        `Only ${max} item${max > 1 ? "s" : ""} available in stock.`
      );

      return;
    }

    setQuantity(quantity + 1);

  };

  return (
    <div
      className={`
        inline-flex
        items-center
        overflow-hidden
        rounded-2xl
        border
        border-[#E5E5E5]
        bg-white
        shadow-sm
        transition

        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : ""
        }
      `}
    >
      {/* Minus */}

      <button
        type="button"
        onClick={decrease}
        className={`
          flex
          h-12
          w-12
          items-center
          justify-center
          transition-all
          duration-200

          ${
            disabled || quantity <= min
              ? "opacity-40"
              : "hover:bg-[#F8F6F1]"
          }
        `}
      >
        <Minus size={18} />
      </button>

      {/* Quantity */}

      <div
        className="
          flex
          h-12
          min-w-[60px]
          items-center
          justify-center
          border-x
          border-[#ECECEC]
          text-lg
          font-semibold
          text-[#174C35]
        "
      >
        {quantity}
      </div>

      {/* Plus */}

      <button
        type="button"
        onClick={increase}
        className={`
          flex
          h-12
          w-12
          items-center
          justify-center
          transition-all
          duration-200

          ${
            disabled || quantity >= max
              ? "opacity-40"
              : "hover:bg-[#F8F6F1]"
          }
        `}
      >
        <Plus size={18} />
      </button>
    </div>
  );
}