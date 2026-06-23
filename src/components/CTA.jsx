import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Makhana from "./Makhana";

const makhanas = [
  { top: "12%", left: "14%", size: 34, delay: 0 },
  { top: "18%", right: "18%", size: 28, delay: 1 },
  { top: "50%", right: "12%", size: 40, delay: 2 },
  { top: "72%", left: "18%", size: 30, delay: 1.5 },
  { top: "78%", right: "24%", size: 26, delay: 2.5 },
  { top: "40%", left: "72%", size: 36, delay: 0.8 },
];

export default function CTA() {
  return (
    <section className="bg-[#F6F3EC] px-4 sm:px-6 py-14 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div
          className="
            relative
            overflow-hidden
            rounded-[28px]
            md:rounded-[42px]
            px-5
            sm:px-8
            md:px-16
            py-10
            md:py-20
          "
        >
          {/* Background */}

          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_center,#6B9770_0%,#0B6A46_45%,#003726_100%)]
            "
          />

          {/* Glow Overlay */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]" />

          {/* Floating Makhanas */}

          {makhanas.map((item, index) => (
            <motion.div
              key={index}
              className="absolute z-10 opacity-80 md:opacity-90"
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
              }}
              animate={{
                y: [0, -14, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay,
              }}
            >
              <div className="scale-75 md:scale-100">
                <Makhana size={item.size} />
              </div>
            </motion.div>
          ))}

          {/* Gold Particles */}

          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#D4B56A]"
              style={{
                width: i % 2 ? 3 : 5,
                height: i % 2 ? 3 : 5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.25,
              }}
            />
          ))}

          {/* Content */}

          <div className="relative z-20 text-center max-w-3xl mx-auto">
            {/* Badge */}

            <div
              className="
                inline-flex
                items-center
                rounded-full
                px-3
                sm:px-4
                py-2
                text-[10px]
                sm:text-xs
                tracking-[0.15em]
                bg-white/10
                text-[#E8C76A]
                backdrop-blur-md
              "
            >
              READY WHEN YOU ARE
            </div>

            {/* Heading */}

            <h2
              className="
                mt-6
                md:mt-8
                text-white
                text-3xl
                sm:text-4xl
                md:text-6xl
                leading-tight
              "
              style={{ fontFamily: "serif" }}
            >
              Ready to Pop Fresh?
            </h2>

            {/* Description */}

            <p
              className="
                mt-5
                md:mt-6
                text-sm
                sm:text-base
                md:text-lg
                leading-7
                md:leading-8
                text-white/80
                max-w-2xl
                mx-auto
              "
            >
              Discover healthier snacking without compromising on taste. Crafted
              with premium ingredients, bold flavours and the perfect crunch in
              every bite.
            </p>

            {/* Buttons */}

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8 md:mt-10">
              {/* Products CTA */}

              <motion.div
                whileHover={{
                  scale: 1.04,
                  y: -4,
                  boxShadow: "0px 20px 40px rgba(212,181,106,0.35)",
                }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/products"
                  className="
                    group
                    w-full
                    sm:w-auto
                    inline-flex
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-[#D4B56A]
                    px-6
                    sm:px-8
                    py-3.5
                    md:py-4
                    font-semibold
                    text-sm
                    md:text-base
                    text-[#032F23]
                  "
                >
                  TAKE THE FIRST CRUNCH
                  <ArrowRight
                    size={18}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </Link>
              </motion.div>

              {/* Contact CTA */}

              <motion.div
                whileHover={{
                  scale: 1.04,
                  y: -4,
                }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/contact"
                  className="
                    group
                    w-full
                    sm:w-auto
                    inline-flex
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    border
                    border-[#D4B56A]/40
                    bg-white/10
                    backdrop-blur-md
                    px-6
                    sm:px-8
                    py-3.5
                    md:py-4
                    font-semibold
                    text-sm
                    md:text-base
                    text-white
                    transition-all
                    duration-300
                    hover:bg-white/15
                  "
                >
                  LET'S TALK
                  <ArrowRight
                    size={18}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </Link>
              </motion.div>
            </div>

            {/* Trust Indicators */}

            <div
              className="
                flex
                flex-wrap
                justify-center
                gap-3
                sm:gap-6
                mt-8
                md:mt-12
                text-[11px]
                sm:text-sm
                tracking-[0.15em]
                text-[#DADAD2]
              "
            >
              <span>100% VEGAN</span>
              <span>•</span>
              <span>HIGH PROTEIN</span>
              <span>•</span>
              <span>NEVER FRIED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
