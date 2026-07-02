import { Trash2, Minus, Plus } from "lucide-react";

export default function CartItem({
  item,
  updateQuantity,
  removeFromCart,
}) 
    
{
  return (
    <div
      className="
        flex
        gap-4
        p-4
        rounded-3xl
        bg-[#F8F6F1]
        border
        border-[#ECE7DB]
      "
    >
      {/* Product Image */}

      <div
        className="
          h-24
          w-24
          rounded-2xl
          bg-white
          flex
          items-center
          justify-center
          overflow-hidden
          shrink-0
        "
      >
        <img
          src={item.images[0]}
          alt={item.title}
          className="
            h-20
            object-contain
          "
        />
      </div>

      {/* Details */}

      <div className="flex flex-1 flex-col">
        <h3
          className="
            text-[18px]
            leading-snug
            text-[#174C35]
          "
          style={{
            fontFamily: "Fraunces, serif",
          }}
        >
          {item.title}
        </h3>

        <p className="mt-1 text-sm text-[#667085]">
          {item.weight}
        </p>

        {/* Price */}

        <div className="mt-2 flex items-center gap-2">
          <span
            className="
              text-xl
              font-bold
            "
            style={{
              color: item.theme.accent,
            }}
          >
            ₹{item.sellingPrice}
          </span>

          <span
            className="
              text-sm
              line-through
              text-gray-400
            "
          >
            ₹{item.mrp}
          </span>
        </div>

        {/* Bottom */}

        <div className="mt-4 flex items-center justify-between">
          {/* Quantity */}

          <div
            className="
              flex
              items-center
              rounded-full
              border
              border-[#E5E7EB]
              overflow-hidden
              bg-white
            "
          >
            <button
              onClick={() =>
                updateQuantity(
                  item.id,
                  item.quantity - 1
                )
              }
              className="
                w-10
                h-10
                flex
                items-center
                justify-center
                hover:bg-[#F3F4F6]
                transition
              "
            >
              <Minus size={16} />
            </button>

            <span
              className="
                w-10
                text-center
                font-medium
                text-[#174C35]
              "
            >
              {item.quantity}
            </span>

            <button
  onClick={() =>
    updateQuantity(
      item.id,
      item.quantity + 1
    )
  }
  className="
    w-10
    h-10
    flex
    items-center
    justify-center
    hover:bg-[#F3F4F6]
    transition
  "
>
  <Plus size={16} />
</button>
          </div>

          {/* Remove */}

          <button
            onClick={() =>
              removeFromCart(item.id)
            }
            className="
              flex
              items-center
              gap-2
              text-red-500
              hover:text-red-600
              transition
            "
          >
            <Trash2 size={18} />

            <span className="text-sm">
              Remove
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}