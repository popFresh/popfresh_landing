import { AnimatePresence, motion } from "framer-motion";
import {
  ShoppingBag,
  X,
  ArrowRight,
} from "lucide-react";

import { useEffect } from "react";
import { getProductById } from "../api/product.api";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

import CartItem from "./CartItem";
import CouponBox from "./CouponBox";

export default function CartDrawer({
  open,
  onClose,
}) {

    const navigate = useNavigate();

    const validateCart = async () => {

  for (const item of cart) {

    try {

      const product = await getProductById(item.id);

      if (!product.isActive) {

        removeFromCart(item.id);

        toast.info(
          `${product.name} has been removed from your cart because it is no longer available.`
        );

        return false;

      }

      if (product.stock <= 0) {

        removeFromCart(item.id);

        toast.info(
          `${product.name} has been removed from your cart because it is out of stock.`
        );

        return false;

      }

    } catch (err) {

      removeFromCart(item.id);

      toast.info(
        `${item.name} has been removed from your cart because it is no longer available.`
      );

      return false;

    }

  }

  return true;

};

const {
  cart,
  totalItems,

  pricing,
  pricingLoading,

  updateQuantity,
  removeFromCart,
} = useCart();
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="
              fixed
              inset-0
              z-[999]
              bg-black/40
              backdrop-blur-sm
            "
          />

          {/* Drawer */}

          <motion.aside
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
            }}
            className="
              fixed
              right-0
              top-0
              z-[1000]

              h-screen
              w-full
              sm:w-[430px]

              bg-[#F6F3EC]

              shadow-[0_20px_80px_rgba(0,0,0,0.25)]

              flex
              flex-col
            "
          >
            {/* Header */}

            <div
              className="
                flex
                items-center
                justify-between

                px-6
                py-6

                border-b
                border-[#E8E2D6]
            "
            >
              <div className="flex items-center gap-3">
                <ShoppingBag
                  className="text-[#174C35]"
                  size={24}
                />

                <div>
                  <h2
                    className="text-2xl text-[#174C35]"
                    style={{
                      fontFamily: "Fraunces, serif",
                    }}
                  >
                    Shopping Bag
                  </h2>

                  <p className="text-sm text-[#667085]">
                    {totalItems} item
                    {totalItems !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="
                  h-11
                  w-11

                  rounded-full

                  bg-white

                  border
                  border-[#E8E2D6]

                  flex
                  items-center
                  justify-center

                  hover:bg-[#174C35]
                  hover:text-white

                  transition-all
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}

            {cart.length === 0 ? (
              <div
                className="
                  flex-1

                  flex
                  flex-col

                  items-center
                  justify-center

                  px-10
                  text-center
                "
              >
                <ShoppingBag
                  size={70}
                  className="
                    text-[#D6D0C3]
                  "
                />

                <h3
                  className="
                    mt-6

                    text-3xl

                    text-[#174C35]
                  "
                  style={{
                    fontFamily: "Fraunces, serif",
                  }}
                >
                  Your cart is empty
                </h3>

                <p
                  className="
                    mt-4

                    text-[#667085]

                    leading-7
                  "
                >
                  Looks like you haven't added
                  anything yet.
                </p>

                <Link
                  to="/products"
                  onClick={onClose}
                  className="
                    mt-8

                    inline-flex
                    items-center
                    gap-3

                    rounded-full

                    bg-[#174C35]

                    px-7
                    py-4

                    text-white

                    font-semibold
                  "
                >
                  Explore Products

                  <ArrowRight size={18} />
                </Link>
              </div>
            ) : (
                
              <>
                              {/* Cart Items */}

                <div
                  className="
                    flex-1
                    overflow-y-auto
                    px-6
                    py-6
                    space-y-5
                  "
                >
                  {cart.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      updateQuantity={updateQuantity}
                      removeFromCart={removeFromCart}
                    />
                  ))}

                  {/* Coupon */}

                  <CouponBox />

                 </div>

                {/* Footer */}

                <div
                  className="
                    border-t
                    border-[#E8E2D6]

                    bg-white

                    px-6
                    py-6

                    space-y-4
                  "
                >
                  {/* Subtotal */}

                  <div className="flex justify-between">
                    <span className="text-[#667085]">
                      Subtotal
                    </span>

                    <span className="font-semibold text-[#174C35]">
                      ₹{pricing.subtotal}
                    </span>
                  </div>

                  {/* Shipping */}

                  <div className="flex justify-between">
                    <span className="text-[#667085]">
                      Shipping
                    </span>

                    <span
  className={`font-semibold ${
    !pricingLoading && pricing.shipping === 0
      ? "text-green-600"
      : "text-[#174C35]"
  }`}
>
  {pricingLoading
    ? "Calculating..."
    : pricing.shipping === 0
    ? "FREE"
    : `₹${pricing.shipping}`}
</span>
                  </div>

                  {/* Divider */}

                  

                  {/* Total */}

                  {/* Discount */}

{!pricingLoading && pricing.discount > 0 && (
  <div className="flex justify-between">
    <span className="text-[#667085]">
      Discount
    </span>

    <span className="font-semibold text-green-600">
      -₹{pricing.discount}
    </span>
  </div>
)}

{/* Divider */}

<div className="border-t border-dashed border-[#E5E5E5]" />

{/* Total */}

<div className="flex justify-between items-center">

  <span
    className="text-xl text-[#174C35]"
    style={{
      fontFamily: "Fraunces, serif",
    }}
  >
    Total
  </span>

  <span
    className="text-2xl font-bold"
    style={{
      color: "#174C35",
    }}
  >
    {pricingLoading
      ? "Calculating..."
      : `₹${pricing.total}`}
  </span>

</div>
                                    {/* Buttons */}

                  <div className="pt-2 space-y-3">
                    {/* <Link
  to="/checkout/shipping"
  onClick={(e) => {
    if (pricingLoading) {
      e.preventDefault();
    } else {
      onClose();
    }
  }}
  className={`
    w-full
    flex
    items-center
    justify-center
    gap-3
    rounded-full
    py-4
    font-semibold
    transition-all
    duration-300

    ${
      pricingLoading
        ? "pointer-events-none bg-gray-400 cursor-not-allowed"
        : "bg-[#174C35] hover:bg-[#123826] hover:shadow-lg text-white"
    }
  `}
>
  {pricingLoading
    ? "Calculating..."
    : "Proceed to Shipping"}

  {!pricingLoading && (
    <ArrowRight size={18} />
  )}
</Link> */}
<button
  disabled={pricingLoading}
  onClick={async () => {

  const valid = await validateCart();

  if (!valid) return;

  onClose();

  navigate("/checkout/shipping");

}}
  className={`
    w-full
    flex
    items-center
    justify-center
    gap-3
    rounded-full
    py-4
    font-semibold
    transition-all
    duration-300

    ${
      pricingLoading
  ? "bg-gray-400 text-white cursor-not-allowed opacity-70"
  : "bg-[#174C35] text-white hover:bg-[#123826] hover:shadow-lg"
    }
  `}
>
  {pricingLoading
    ? "Calculating..."
    : "Proceed to Shipping"}

  {!pricingLoading && (
    <ArrowRight size={18} />
  )}
</button>

                    <button
                      onClick={onClose}
                      className="
                        w-full

                        rounded-full

                        border
                        border-[#174C35]

                        py-4

                        font-semibold

                        text-[#174C35]

                        transition-all
                        duration-300

                        hover:bg-[#174C35]
                        hover:text-white
                      "
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}