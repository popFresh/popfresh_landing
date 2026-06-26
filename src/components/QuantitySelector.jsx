import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  quantity,
  setQuantity,
  min = 1,
  max = 99,
}) {
  const decrease = () => {
    if (quantity > min) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < max) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div
      className="
        inline-flex
        items-center
        overflow-hidden

        rounded-2xl

        border
        border-[#E5E5E5]

        bg-white

        shadow-sm
      "
    >
      {/* Minus */}
      <button
        onClick={decrease}
        disabled={quantity <= min}
        className="
          flex
          h-12
          w-12
          items-center
          justify-center

          transition-all
          duration-200

          hover:bg-[#F8F6F1]

          disabled:cursor-not-allowed
          disabled:opacity-40
        "
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
        onClick={increase}
        disabled={quantity >= max}
        className="
          flex
          h-12
          w-12
          items-center
          justify-center

          transition-all
          duration-200

          hover:bg-[#F8F6F1]

          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <Plus size={18} />
      </button>
    </div>
  );
}