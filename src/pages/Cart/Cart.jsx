import {
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import { useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";

import { getProductById } from "../../api/product.api";
import { toast } from "react-toastify";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import CartItem from "../../components/CartItem";
import CouponBox from "../../components/CouponBox";

import { useCart } from "../../context/CartContext";

export default function Cart() {
  const {
  cart,

  pricing,
  pricingLoading,

  updateQuantity,
  removeFromCart,
} = useCart();


useEffect(() => {
  console.log(cart);
}, [cart]);

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
  return (
    <>
      <Navbar alwaysCapsule />

      <main className="min-h-screen bg-[#F8F6F1] pt-36 pb-24">

        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          {/* Heading */}

          <div className="mb-12">

            <span
              className="
                inline-flex
                rounded-full
                bg-[#E9E3D8]
                px-5
                py-2

                text-xs

                tracking-[0.18em]

                text-[#174C35]

                font-medium
              "
            >
              SHOPPING BAG
            </span>

            <h1
              className="
                mt-5

                text-5xl

                text-[#174C35]
              "
              style={{
                fontFamily: "Fraunces, serif",
              }}
            >
              Your Cart
            </h1>

            <p className="mt-4 text-[#667085]">
              Review your items before proceeding to checkout.
            </p>

          </div>

          {cart.length === 0 ? (

            <div
              className="
                rounded-[36px]

                bg-white

                border
                border-[#ECE7DB]

                p-16

                text-center
              "
            >

              <ShoppingBag
                size={72}
                className="
                  mx-auto
                  text-[#174C35]
                "
              />

              <h2
                className="
                  mt-8

                  text-4xl

                  text-[#174C35]
                "
                style={{
                  fontFamily: "Fraunces, serif",
                }}
              >
                Your cart is empty
              </h2>

              <p
                className="
                  mt-4

                  text-[#667085]
                "
              >
                Looks like you haven't added anything yet.
              </p>

              <Link
                to="/products"
                className="
                  mt-8

                  inline-flex

                  items-center
                  gap-3

                  rounded-full

                  bg-[#174C35]

                  px-8
                  py-4

                  text-white

                  font-semibold

                  transition-all
                  duration-300

                  hover:bg-[#123A2B]
                "
              >
                Continue Shopping

                <ArrowRight size={18} />
              </Link>

            </div>

          ) : (

            <div
              className="
                grid

                gap-10

                lg:grid-cols-[2fr_1fr]
              "
            >
                              {/* Left Column */}

              <div className="space-y-6">

                {cart.map((item) => (

                  <CartItem
                    key={item.id}

                    item={item}

                    updateQuantity={updateQuantity}

                    removeFromCart={removeFromCart}
                  />

                ))}

              </div>

              {/* Right Column */}

              <div
                className="
                  h-fit

                  sticky

                  top-32

                  rounded-[32px]

                  bg-white

                  border
                  border-[#ECE7DB]

                  p-8

                  shadow-sm
                "
              >

                <h2
                  className="
                    text-3xl

                    text-[#174C35]
                  "
                  style={{
                    fontFamily: "Fraunces, serif",
                  }}
                >
                  Order Summary
                </h2>

                <p className="mt-2 text-[#667085]">
                  Secure checkout powered by PopFresh.
                </p>

                {/* Coupon */}

                <div className="mt-8">

                  <CouponBox />

                </div>

                {/* Price Summary */}

                <div className="mt-8 space-y-5">

                  <div className="flex justify-between">

                    <span className="text-[#667085]">
                      Subtotal
                    </span>

                    <span className="font-semibold text-[#174C35]">
                      ₹{pricing.subtotal}
                    </span>

                  </div>

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
    {pricingLoading ? (
      <div
        className="
          h-5
          w-16
          rounded
          animate-pulse
          bg-[#E8E2D6]
        "
      />
    ) : pricing.shipping === 0 ? (
      "FREE"
    ) : (
      `₹${pricing.shipping}`
    )}
  </span>

</div>

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

<div className="border-t border-dashed border-[#E5E5E5]" />

                  <div className="flex justify-between items-center">

                    <span
                      className="text-2xl text-[#174C35]"
                      style={{
                        fontFamily: "Fraunces, serif",
                      }}
                    >
                      Total
                    </span>

                    <span className="text-3xl font-bold text-[#174C35]">
                     {pricingLoading
  ? "Calculating..."
  : `₹${pricing.total}`}
                    </span>

                  </div>
                  </div>
                                  {/* Buttons */}

                <div className="mt-10 space-y-4">

                 <button
  disabled={pricingLoading}
 onClick={async () => {

  const valid = await validateCart();

  if (!valid) return;

  navigate("/checkout/shipping");

}}
  className={`
    flex
    w-full
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
        : "bg-[#174C35] text-white hover:bg-[#123A2B]"
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

                  <Link
                    to="/products"
                    className="
                      block

                      rounded-full

                      border
                      border-[#174C35]

                      py-4

                      text-center

                      font-semibold

                      text-[#174C35]

                      transition-all
                      duration-300

                      hover:bg-[#174C35]
                      hover:text-white
                    "
                  >
                    Continue Shopping
                  </Link>

                </div>

              </div>

            </div>

          )}

        </div>

      </main>

      <Footer />

    </>
  );
}