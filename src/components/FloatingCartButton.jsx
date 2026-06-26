import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

import CartDrawer from "./CartDrawer";

import { useCart } from "../context/CartContext";

export default function FloatingCartButton() {
  const [open, setOpen] = useState(false);

  const { totalItems } = useCart();

  // Don't show if cart is empty
  if (totalItems === 0) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        <motion.button
          onClick={() => setOpen(true)}
          initial={{
            opacity: 0,
            scale: 0.8,
            x: 30,
          }}
          animate={{
            opacity: 1,
            scale: [1, 1.04, 1],
            y: [0, -8, 0],
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            x: 30,
          }}
          transition={{
            opacity: {
              duration: 0.3,
            },

            scale: {
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            },

            y: {
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          whileHover={{
            scale: 1.08,
            rotate: -3,
            
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="
  fixed

  top-[110px]
  right-10

  md:top-[110px]
  md:right-14

  z-[998]

  group
"
        >
          {/* Glow */}

          <motion.span
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.35, 0.8, 0.35],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute

              inset-0

              rounded-full

              bg-[#E4C06A]/35

              blur-2xl
            "
          />

                    {/* Floating Cart */}

<div
  className="
    relative

    h-18
    w-18

    rounded-full

    bg-[#FBF9F4]/90

    backdrop-blur-xl

    border
    border-[#E4C06A]/50

    shadow-[0_15px_40px_rgba(0,0,0,0.18),inset_0_1px_3px_rgba(255,255,255,0.35)]

    flex
    items-center
    justify-center

    cursor-pointer

    overflow-hidden

    transition-all
    duration-300

    group-hover:shadow-[0_20px_50px_rgba(228,192,106,0.40)]
  "
>
  {/* Shine */}

  <div
    className="
      absolute
      inset-0

      bg-gradient-to-br

      from-white/70
      via-transparent
      to-transparent
    "
  />

  {/* Cart Icon */}

  <motion.div
    animate={{
      rotate: [0, -6, 6, -6, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="relative"
  >
    <ShoppingBag
      size={23}
      strokeWidth={2.4}
      className="
        text-[#174C35]
        drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]
      "
    />
  </motion.div>

  {/* Badge */}

  <motion.div
    key={totalItems}
    initial={{
      scale: 0.6,
    }}
    animate={{
      scale: [1, 1.25, 1],
    }}
    transition={{
      duration: 0.35,
    }}
    className="
absolute

top-2
right-1.5

flex
items-center
justify-center

h-6
w-6

rounded-full

bg-gradient-to-br
from-[#F5D98B]
to-[#D4AF37]

text-[11px]
font-bold

text-[#174C35]

border-2
border-[#F8F3E7]

shadow-lg
"
      
  >
    {totalItems}
  </motion.div>
</div>

        </motion.button>
      </AnimatePresence>

            {/* Cart Drawer */}

      <CartDrawer
        open={open}
        onClose={() => setOpen(false)}
      />

    </>
  );
}