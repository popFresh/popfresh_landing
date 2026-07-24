
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PeriPeri from "../assets/popFresh_periPeri.png";
import Cheese from "../assets/popFresh_cheese.png";
import Tomato from "../assets/popFresh_tangyTomato.png";
import Pudina from "../assets/popFresh_pudina.png";

const flavours = [
  {
    name: "Peri Peri",
    slug: "peri-peri",
    title: "Peri Peri Roasted Makhana",
    badge: "FIERY. BOLD. ADDICTIVE.",
    image: PeriPeri,
    bg: "#F8E6DF",
    accent: "#E86B2F",
    description:
      "Slow-roasted makhanas tossed in a smoky African chilli blend with a citrusy kick. The snack that bites back.",
    stats: [
      { label: "Gluten Free" },
      { label: "High Source of Fibre" },
      { label: "Rich in Antioxidants" },
    ],
  },

  {
    name: "Cheese",
    slug: "cheese",
    title: "Cheese Roasted Makhana",
    badge: "RICH. CREAMY. IRRESISTIBLE.",
    image: Cheese,
    bg: "#FBF2DE",
    accent: "#D7A326",
    description:
      "A luxurious cheese seasoning wrapped around every crunchy bite. Comfort food without the guilt.",
    stats: [
      { label: "Gluten Free" },
      { label: "High Source of Fibre" },
      { label: "Rich in Antioxidants" },
    ],
  },

  {
    name: "Tangy Tomato",
    slug: "tangy-tomato",
    title: "Tangy Tomato Roasted Makhana",
    badge: "ZESTY. TANGY. FUN.",
    image: Tomato,
    bg: "#FBE6E2",
    accent: "#D94E43",
    description:
      "A punchy blend of ripe tomato, herbs and spices that delivers the perfect sweet-and-tangy balance.",
    stats: [
      { label: "Gluten Free" },
      { label: "High Source of Fibre" },
      { label: "Rich in Antioxidants" },
    ],
  },

  {
    name: "Pudina",
    slug: "pudina",
    title: "Pudina Roasted Makhana",
    badge: "FRESH. COOL. CRUNCHY.",
    image: Pudina,
    bg: "#EAF4EB",
    accent: "#3D8C57",
    description:
      "Refreshing mint and subtle spices come together for a flavour that feels light, crisp and addictive.",
    stats: [
      { label: "Gluten Free" },
      { label: "High Source of Fibre" },
      { label: "Rich in Antioxidants" },
    ],
  },
];

export default function Flavours() {
  return (
    <section className="bg-[#F6F3EC] py-24 lg:py-32">
      <div className="max-w-[1500px] mx-auto px-6">
        {/* Header */}

        <div className="text-center mb-24">
          <span
            className="
              inline-flex
              px-5
              py-2
              rounded-full
              bg-[#E9E3D8]
              text-[#184C35]
              text-xs
              tracking-[0.18em]
              font-medium
            "
          >
            OUR FLAVOURS
          </span>

          <h2
            className="
              mt-6
              text-[#184C35]
              text-4xl
              md:text-6xl
              leading-tight
            "
            style={{ fontFamily: "serif" }}
          >
            Crafted for every craving
          </h2>

          <p className="mt-5 text-[#667085] max-w-2xl mx-auto">
            Four signature flavours. One impossibly satisfying crunch.
          </p>
        </div>

        {/* Flavour Cards */}

        <div className="space-y-20">
          {flavours.map((flavour, index) => (
            <motion.div
              key={flavour.name}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="
                overflow-hidden
                rounded-[42px]
                shadow-[0_10px_40px_rgba(0,0,0,0.04)]
              "
              style={{
                background: flavour.bg,
              }}
            >
              <div
                className={`
                  grid
                  lg:grid-cols-[52%_48%]
                  min-h-[680px]
                  items-stretch
                  ${index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""}
                `}
              >
                {/* IMAGE */}

                <div className="h-full p-8">
                  <div className="h-full w-full overflow-hidden rounded-[32px]">
                    <motion.img
                      src={flavour.image}
                      alt={flavour.title}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.35 }}
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />
                  </div>
                </div>

                {/* CONTENT */}

                <div className="flex flex-col justify-center px-10 lg:px-14 py-12">
                  <span
                    className="
                      inline-flex
                      w-fit
                      px-4
                      py-2
                      rounded-full
                      text-white
                      text-xs
                      tracking-wide
                      font-medium
                    "
                    style={{
                      background: flavour.accent,
                    }}
                  >
                    {flavour.badge}
                  </span>

                  <h3
                    className="
                      mt-6
                      text-[#184C35]
                      text-4xl
                      lg:text-[52px]
                      leading-tight
                    "
                    style={{ fontFamily: "serif" }}
                  >
                    {flavour.title}
                  </h3>

                  <p
                    className="
                      mt-6
                      text-[#667085]
                      text-lg
                      leading-8
                    "
                  >
                    {flavour.description}
                  </p>

                  {/* Ingredients */}

                  <div className="mt-8">
                    <p className="text-sm font-semibold text-[#667085] uppercase mb-4">
                      Ingredients
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-2 bg-white/70 rounded-full text-sm">
                        Roasted Makhana
                      </span>

                      <span className="px-4 py-2 bg-white/70 rounded-full text-sm">
                        Iodised Salt
                      </span>

                      <span className="px-4 py-2 bg-white/70 rounded-full text-sm">
                        Natural Flavours
                      </span>

                      <span className="px-4 py-2 bg-white/70 rounded-full text-sm">
                        Seasoning
                      </span>
                    </div>
                  </div>

                  {/* Stats */}

                  <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 mt-10">
  {flavour.stats.map((stat) => (
    <div
      key={stat.label}
      className="
        bg-white/85
        rounded-[24px]
        py-6
        px-4
        flex
        items-center
        justify-center
        text-center
        min-h-[110px]
      "
    >
      <span
        className="
          text-[#184C35]
          text-[11px]
          md:text-sm
          font-medium
          leading-tight
        "
      >
        {stat.label}
      </span>
    </div>
  ))}
</div>

                  {/* CTA */}
                  <Link
                    to={`/products/${flavour.slug}`}
                    className="
                    group
                    mt-10
                    w-fit
                    inline-flex
                    items-center
                    gap-3
                    px-10
                    py-5
                    rounded-full
                    text-white
                    font-medium
                    hover:-translate-y-1
                    transition-all
                    duration-300
                "
                    style={{
                      background: flavour.accent,
                    }}
                  >
                    Shop {flavour.name}
                    <ArrowRight
                      size={18}
                      className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    "
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
