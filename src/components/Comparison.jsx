import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const traditional = [
  "Fried in refined oil",
  "Heavy and greasy",
  "Oily aftertaste",
  "Empty calories",
];

const popFresh = [
  "Slow roasted",
  "Light and airy",
  "Protein rich",
  "Guilt free snacking",
];

export default function Comparison() {
  return (
    <section className="bg-[#F6F3EC] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Badge */}

        <div className="flex justify-center">
          <span
            className="
              px-5
              py-2
              rounded-full
              bg-[#E9E3D7]
              text-[#032F23]
              text-xs
              tracking-[0.2em]
            "
          >
            THE BETTER CHOICE
          </span>
        </div>

        {/* Heading */}

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            text-center
            text-[#032F23]
            text-4xl
            md:text-5xl
            mt-6
            leading-tight
          "
          style={{ fontFamily: "serif" }}
        >
          Traditional Snacks vs Pop Fresh
        </motion.h2>

        <p
          className="
            text-center
            text-[#6B7280]
            max-w-2xl
            mx-auto
            mt-5
            leading-8
          "
        >
          A cleaner, lighter and more satisfying alternative to everyday fried
          snacks.
        </p>

        {/* Comparison Cards */}

        <div className="grid lg:grid-cols-2 gap-8 mt-14">
          {/* Traditional */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="
              bg-white
              border
              border-[#E5DED1]
              rounded-[32px]
              p-8
              shadow-[0_10px_30px_rgba(0,0,0,0.04)]
            "
          >
            <p className="text-xs tracking-[0.25em] text-[#8B8B8B] uppercase">
              Traditional Snacks
            </p>

            <h3
              className="text-3xl text-[#666] mt-4 mb-8"
              style={{ fontFamily: "serif" }}
            >
              The old way
            </h3>

            <div className="space-y-5">
              {traditional.map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div
                    className="
                      w-9
                      h-9
                      rounded-full
                      bg-[#F3EEE6]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <X size={16} className="text-[#8A8A8A]" />
                  </div>

                  <span className="text-[#666]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pop Fresh */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="
              relative
              overflow-hidden
              rounded-[32px]
              p-8
              bg-[#032F23]
              shadow-[0_20px_50px_rgba(3,47,35,0.18)]
            "
          >
            {/* Glow */}

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,181,106,0.12),transparent_60%)]" />

            <p className="text-xs tracking-[0.25em] text-[#D4B56A] uppercase relative z-10">
              POP FRESH
            </p>

            <h3
              className="text-3xl text-white mt-4 mb-8 relative z-10"
              style={{ fontFamily: "serif" }}
            >
              The smarter snack
            </h3>

            <div className="space-y-5 relative z-10">
              {popFresh.map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div
                    className="
                      w-9
                      h-9
                      rounded-full
                      bg-[#D4B56A]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Check size={16} className="text-[#032F23]" />
                  </div>

                  <span className="text-white">{item}</span>
                </div>
              ))}
            </div>

            {/* Bottom Highlight */}

            <div
              className="
                mt-10
                pt-6
                border-t
                border-[#D4B56A]/20
                text-[#D4B56A]
                text-sm
                tracking-wide
                relative
                z-10
              "
            >
              ✓ 70% lighter than typical fried snacks
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
