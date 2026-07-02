import { useState } from "react";
import {
  CheckCircle2,
  Tag,
  X,
} from "lucide-react";

import { useCart } from "../context/CartContext";

export default function CouponBox() {
  const {
    appliedCoupon,
    pricing,
    applyCoupon,
    removeCoupon,
    pricingLoading,
  } = useCart();

  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState("");

  const handleApply = async () => {
  if (!coupon.trim()) {
    setError("Enter a coupon code");
    return;
  }

  setError("");

  try {
    const result = await applyCoupon(coupon);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setCoupon("");
  } catch {
    setError("Something went wrong.");
  }
};
  const handleRemove = async () => {
    setError("");
    await removeCoupon();
  };

  return (
    <div
      className="
        rounded-3xl
        bg-[#F8F6F1]
        border
        border-[#ECE7DB]
        p-5
      "
    >
      <div className="flex items-center gap-3 mb-4">
        <Tag
          size={20}
          className="text-[#174C35]"
        />

        <h3
          className="text-lg text-[#174C35]"
          style={{
            fontFamily: "Fraunces, serif",
          }}
        >
          Apply Coupon
        </h3>
      </div>

      {appliedCoupon ? (
        <div
          className="
            flex
            items-center
            justify-between

            rounded-2xl

            bg-green-50

            border
            border-green-200

            px-4
            py-3
          "
        >
          <div className="flex items-center gap-2">
            <CheckCircle2
              size={18}
              className="text-green-600"
            />

            <div>
              <div className="font-medium text-green-700">
                {appliedCoupon}
              </div>

              <div className="text-sm text-green-600">
                Saved ₹{pricing.discount}
              </div>
            </div>
          </div>

          <button
            onClick={handleRemove}
            className="
              rounded-full
              p-2

              hover:bg-green-100
            "
          >
            <X
              size={16}
              className="text-green-700"
            />
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-3">
            <input
              type="text"
              value={coupon}
              onChange={(e) => {
  setCoupon(e.target.value.toUpperCase());
  setError("");
}}
              placeholder="Enter coupon code"
              className="
                flex-1

                rounded-full

                border
                border-[#D7D7D7]

                bg-white

                px-5
                py-3

                outline-none

                focus:border-[#174C35]
              "
            />

            <button
              onClick={handleApply}
              disabled={pricingLoading}
              className="
                rounded-full

                bg-[#174C35]

                px-6

                text-white
                font-semibold

                transition

                hover:opacity-90

                disabled:opacity-60
              "
            >
              {pricingLoading
                ? "Applying..."
                : "Apply"}
            </button>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-500">
              {error}
            </p>
          )}
        </>
      )}
    </div>
  );
}