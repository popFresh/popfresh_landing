import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Truck } from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function OrderSuccess() {
  const { state } = useLocation();

  const order = state;

  return (
    <>
      <Navbar alwaysCapsule />

      <main className="relative overflow-hidden bg-[#F6F3EC] pt-36 pb-20">

        {/* Background */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FFFFFF_0%,#F6F3EC_60%,#EFE7DB_100%)]" />

        {/* Green Glow */}

        <div className="absolute -left-24 top-10 h-[320px] w-[320px] rounded-full bg-[#174C35]/10 blur-[120px]" />

        {/* Gold Glow */}

        <div className="absolute -right-20 bottom-0 h-[340px] w-[340px] rounded-full bg-[#D4B56A]/15 blur-[130px]" />

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            relative
            mx-auto
            max-w-5xl
            rounded-[36px]
            border
            border-[#ECE8DF]
            bg-white
            p-10
            shadow-[0_25px_70px_rgba(0,0,0,0.08)]
          "
        >

          {/* Success */}

          <div className="text-center">

            <div className="flex justify-center">

              <div className="rounded-full bg-[#F4E7C3] p-3">

                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#174C35]">

                  <CheckCircle2
                    size={50}
                    className="text-[#D4B56A]"
                  />

                </div>

              </div>

            </div>

            <span
              className="
                mt-8
                inline-block
                rounded-full
                bg-[#174C35]
                px-5
                py-2
                text-xs
                font-semibold
                tracking-[0.25em]
                text-[#D4B56A]
              "
            >
              ORDER CONFIRMED
            </span>

            <h1
              className="mt-8 text-5xl text-[#174C35]"
              style={{
                fontFamily: "Fraunces, serif",
              }}
            >
              Thank You For Your Order!
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-[#667085]">

              <strong className="text-[#174C35]">

                We're just as excited as you are.

              </strong>

              <br />

              Your order has been confirmed successfully and our
              team has already started preparing your freshly
              roasted makhanas.

              <br />
              <br />
              Your delicious crunch will reach your doorstep within
              <strong> 6–8 working days.</strong>

            </p>

          </div>

          {/* Grid */}

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
                      {/* Receipt Card */}

          <div
            className="
              rounded-[28px]
              border
              border-[#ECE8DF]
              bg-[#FCFBF8]
              p-8
            "
          >

            <p className="text-xs uppercase tracking-[0.25em] text-[#98A2B3]">
              Order Receipt
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-[#174C35]">
              {order?.receipt || "PF-100001"}
            </h2>

            <div className="mt-8 space-y-5">

              <div className="flex items-center justify-between">

                <span className="text-[#667085]">
                  Payment Status
                </span>

                <span
                  className="
                    rounded-full
                    bg-[#EAF5EE]
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-[#174C35]
                  "
                >
                  Paid
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-[#667085]">
                  Order Status
                </span>

                <span
                  className="
                    rounded-full
                    bg-[#FFF7E5]
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-[#B88917]
                  "
                >
                  Confirmed
                </span>

              </div>

              <div className="flex items-center justify-between">

                

              </div>

            </div>

          </div>

          {/* Delivery Card */}

          <div
            className="
              rounded-[28px]
              bg-[#297655]
              p-8
              text-white
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#D4B56A]
                "
              >

                <Truck
                  size={30}
                  className="text-[#174C35]"
                />

              </div>

              <div>

                <p className="text-sm uppercase tracking-[0.18em] text-[#D4B56A]">
                  Estimated Delivery
                </p>

                <h2
                  className="mt-2 text-3xl"
                  style={{
                    fontFamily: "Fraunces, serif",
                  }}
                >
                  6–8 Days
                </h2>

              </div>

            </div>

            <div className="mt-8 space-y-5">

              <div className="flex items-start gap-3">

                <div className="mt-2 h-2 w-2 rounded-full bg-[#D4B56A]" />

                <p className="leading-7 text-white/80">

                  Freshly roasted and packed only after
                  your order is confirmed.

                </p>

              </div>

              <div className="flex items-start gap-3">

                <div className="mt-2 h-2 w-2 rounded-full bg-[#D4B56A]" />

                <p className="leading-7 text-white/80">

                  You'll receive Email and WhatsApp updates as your
                  order moves from packing to shipping.

                </p>

              </div>

              <div className="flex items-start gap-3">

                <div className="mt-2 h-2 w-2 rounded-full bg-[#D4B56A]" />

                <p className="leading-7 text-white/80">

                  Sit back, relax and get ready to enjoy
                  your favourite Pop Fresh flavours.

                </p>

              </div>

            </div>

          </div>

          {/* Buttons */}

          <div className="col-span-full mt-2 flex flex-col gap-4 sm:flex-row">

            <Link
              to="/products"
              className="
                flex-1
                rounded-full
                bg-[#174C35]
                py-4
                text-center
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-[#123A29]
              "
            >
              Continue Shopping
            </Link>

            <Link
              to="/track-order"
              className="
                flex-1
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
              Track My Order
            </Link>

          </div>
                    {/* Support */}

          <div
            className="
              col-span-full
              mt-2
              rounded-[28px]
              border
              border-[#ECE8DF]
              bg-[#F8F6F1]
              px-8
              py-7
            "
          >

            <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">

              <div>

                <h3
                  className="text-2xl text-[#174C35]"
                  style={{
                    fontFamily: "Fraunces, serif",
                  }}
                >
                  Need Assistance?
                </h3>

                <p className="mt-3 max-w-xl leading-7 text-[#667085]">

                  We'll keep you updated throughout your order journey.
                  If you have any questions regarding your order,
                  shipping or delivery, we're always happy to help.

                </p>

              </div>

              <a
                href="mailto:hello@popfresh.in"
                className="
                  shrink-0
                  rounded-full
                  bg-[#174C35]
                  px-7
                  py-4
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#123A29]
                "
              >
                hello@popfresh.in
              </a>

            </div>

          </div>

          {/* Bottom */}

<div className="col-span-full pt-2 text-center">

  <p
    className="text-xl text-[#174C35]"
    style={{
      fontFamily: "Fraunces, serif",
    }}
  >
    Healthy Snacking. Bold Flavours. Perfect Crunch.
  </p>

  <p className="mt-3 text-[#667085]">
    Thank you for choosing Pop Fresh.
    We can't wait for you to enjoy every bite.
  </p>

</div>

{/* CLOSE THE GRID */}
</div>

{/* CLOSE THE CARD */}
</motion.div>

</main>

<Footer />

</>

);
}

         