import { useEffect, useRef, useState } from "react";

import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

import PeriPeri from "../assets/popFresh_periPeri.png";
import Cheese from "../assets/popFresh_cheese.png";
import Tomato from "../assets/popFresh_tangyTomato.png";
import Pudina from "../assets/popFresh_pudina.png";

/* =========================================================
   MAKHANA SVG
========================================================= */

function Makhana({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        overflow: "visible",
        display: "block",
      }}
    >
      <defs>
        <linearGradient
          id="makhanaGradient"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#FFF1C9" />
          <stop offset="45%" stopColor="#E8C47B" />
          <stop offset="100%" stopColor="#C99B4D" />
        </linearGradient>

        <filter id="makhanaShadow">
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="6"
            floodOpacity="0.15"
          />
        </filter>
      </defs>

      <g filter="url(#makhanaShadow)">
        <path
          d="
            M100 20
            C138 15 172 40 180 78
            C189 118 166 156 130 174
            C96 191 54 178 29 144
            C8 115 8 72 35 42
            C52 24 76 17 100 20Z
          "
          fill="url(#makhanaGradient)"
        />

        <circle cx="65" cy="65" r="4" fill="#6F5430" />
        <circle cx="135" cy="58" r="3.5" fill="#6F5430" />
        <circle cx="110" cy="120" r="4" fill="#6F5430" />
        <circle cx="75" cy="128" r="3.5" fill="#6F5430" />
        <circle cx="98" cy="92" r="2.5" fill="#6F5430" />

        <ellipse
          cx="72"
          cy="55"
          rx="24"
          ry="12"
          fill="white"
          opacity="0.28"
          transform="rotate(-20 72 55)"
        />
      </g>
    </svg>
  );
}

/* =========================================================
   FLAVOURS DATA
========================================================= */

const flavours = [
  {
    number: "01",
    name: "Peri Peri",
    slug: "peri-peri",
    shortName: "Peri Peri",
    title: "Peri Peri Roasted Makhana",
    badge: "FIERY. BOLD. ADDICTIVE.",
    image: PeriPeri,
    bg: "#F7E6DE",
    accent: "#E86B2F",
    accentSoft: "#F2B08B",
    description:
      "Slow-roasted makhanas tossed in a smoky African chilli blend with a citrusy kick. The snack that bites back.",
  },

  {
    number: "02",
    name: "Cheese",
    slug: "cheese",
    shortName: "Cheese",
    title: "Cheese Roasted Makhana",
    badge: "RICH. CREAMY. IRRESISTIBLE.",
    image: Cheese,
    bg: "#F8F0D9",
    accent: "#D7A326",
    accentSoft: "#EBCB73",
    description:
      "A luxurious cheese seasoning wrapped around every crunchy bite. Comfort food without the guilt.",
  },

  {
    number: "03",
    name: "Tangy Tomato",
    slug: "tangy-tomato",
    shortName: "Tangy Tomato",
    title: "Tangy Tomato Roasted Makhana",
    badge: "ZESTY. TANGY. FUN.",
    image: Tomato,
    bg: "#F7E4E0",
    accent: "#D94E43",
    accentSoft: "#ECA39D",
    description:
      "A punchy blend of ripe tomato, herbs and spices that delivers the perfect sweet-and-tangy balance.",
  },

  {
    number: "04",
    name: "Pudina",
    slug: "pudina",
    shortName: "Pudina",
    title: "Pudina Roasted Makhana",
    badge: "FRESH. COOL. CRUNCHY.",
    image: Pudina,
    bg: "#E7F0E8",
    accent: "#3D8C57",
    accentSoft: "#9BC3A5",
    description:
      "Refreshing mint and subtle spices come together for a flavour that feels light, crisp and addictive.",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function Flavours() {
  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  /* =======================================================
     SCROLL
  ======================================================= */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    mass: 0.4,
  });

  /* =======================================================
     ORBIT ROTATION
  ======================================================= */

  const orbitRotation = useTransform(
    smoothProgress,
    [0, 1],
    [0, -360]
  );

  const innerOrbitRotation = useTransform(
    smoothProgress,
    [0, 1],
    [0, 180]
  );

  /* =======================================================
     HEADER MOVEMENT
  ======================================================= */

  const headerY = useTransform(
    smoothProgress,
    [0, 0.15],
    [0, -35]
  );

  const headerOpacity = useTransform(
    smoothProgress,
    [0, 0.12],
    [1, 0.55]
  );

  /* =======================================================
     ACTIVE FLAVOUR
  ======================================================= */

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      flavours.length - 1,
      Math.floor(latest * flavours.length)
    );

    setActiveIndex(nextIndex);
  });

  const activeFlavour = flavours[activeIndex];

  /* =======================================================
     BACKGROUND
  ======================================================= */

  const [background, setBackground] = useState(flavours[0].bg);

  useEffect(() => {
    setBackground(activeFlavour.bg);
  }, [activeFlavour]);

  /* =======================================================
     ORBIT MAKHANA POSITIONS
     
     4 INNER + 3 OUTER
     
     Angles intentionally varied so they don't look
     perfectly evenly distributed.
  ======================================================= */

  const innerMakhanaAngles = [18, 112, 207, 305];
  const outerMakhanaAngles = [55, 178, 302];

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        height: "455vh",
      }}
    >
      {/* =====================================================
          INTRO / HEADING
      ===================================================== */}

      <div
        className="
          relative
          z-20
          flex
          min-h-[330px]
          w-full
          flex-col
          items-center
          justify-center
          bg-[#F8F5EF]
          px-5
          pt-24
          pb-16
          text-center

          sm:min-h-[360px]
          sm:px-6
          sm:pt-28
          sm:pb-20

          md:min-h-[390px]

          lg:min-h-[430px]
          lg:px-8
          lg:pt-36
          lg:pb-24
        "
      >
        {/* Small label */}

        <div
          className="
            inline-flex
            items-center
            justify-center
            rounded-full
            bg-[#EAE5DA]
            px-5
            py-2.5
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.28em]
            text-[#184C35]

            sm:px-6
            sm:text-[10px]
          "
        >
          OUR FLAVOURS
        </div>

        {/* Main heading */}

        <h2
          className="
            mt-6
            max-w-[1000px]
            text-[2.65rem]
            leading-[1]
            tracking-[-0.04em]
            text-[#184C35]

            sm:mt-7
            sm:text-5xl

            md:text-6xl

            lg:mt-8
            lg:text-[76px]
          "
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 500,
          }}
        >
          Crafted for every craving
        </h2>

        {/* Subtitle */}

        <p
          className="
            mt-5
            max-w-[650px]
            px-2
            text-sm
            leading-6
            text-[#667085]

            sm:mt-6
            sm:px-0
            sm:text-base

            lg:mt-7
            lg:text-lg
          "
        >
          Four signature flavours. One impossibly satisfying crunch.
        </p>
      </div>

      {/* =====================================================
          STICKY FLAVOUR EXPERIENCE
      ===================================================== */}

      <div
        className="
          sticky
          top-0
          flex
          h-[100svh]
          min-h-[620px]
          w-full
          items-center
          overflow-hidden

          lg:min-h-0
        "
        style={{
          background,
          transition: "background-color 900ms ease",
        }}
      >
        {/* ===================================================
            AMBIENT BACKGROUND
        =================================================== */}

        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{
            background: `
              radial-gradient(
                circle at 52% 48%,
                ${activeFlavour.accentSoft}45 0%,
                transparent 34%
              ),
              radial-gradient(
                circle at 15% 75%,
                ${activeFlavour.accentSoft}20 0%,
                transparent 30%
              ),
              radial-gradient(
                circle at 90% 25%,
                ${activeFlavour.accentSoft}18 0%,
                transparent 28%
              )
            `,
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
        />

        {/* Grain */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.025]
            mix-blend-multiply
          "
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.35'/%3E%3C/svg%3E\")",
          }}
        />

        {/* ===================================================
            MAIN CONTAINER
        =================================================== */}

        <div
          className="
            relative
            mx-auto
            flex
            h-full
            w-full
            max-w-[1500px]
            flex-col
            px-5
            pt-16
            pb-5

            sm:px-7
            sm:pt-20

            md:px-8

            lg:px-12
            lg:pt-28
            lg:pb-0
          "
        >
          {/* =================================================
              TOP LABEL
          ================================================= */}

          <motion.div
            style={{
              y: headerY,
              opacity: headerOpacity,
            }}
            className="
              absolute
              left-5
              top-5
              z-30

              sm:left-7
              sm:top-6

              md:left-8

              lg:left-12
              lg:top-10
            "
          />

          {/* =================================================
              DESKTOP
          ================================================= */}

          <div
            className="
              relative
              hidden
              h-full
              min-h-[600px]
              items-center
              lg:flex
            "
          >
            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <div
              className="
                relative
                z-20
                w-[28%]
                pr-6

                xl:pr-10
              "
            >
              <p
                className="
                  mb-7
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#7A8493]

                  xl:mb-8
                "
              >
                Choose your mood
              </p>

              <div className="space-y-4 xl:space-y-5">
                {flavours.map((flavour, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <div
                      key={flavour.name}
                      className="
                        flex
                        items-center
                        gap-3
                        transition-all
                        duration-500

                        xl:gap-4
                      "
                      style={{
                        opacity: isActive ? 1 : 0.28,
                        transform: isActive
                          ? "translateX(8px)"
                          : "translateX(0)",
                      }}
                    >
                      <span
                        className="
                          w-6
                          text-[11px]
                          font-medium

                          xl:w-7
                          xl:text-xs
                        "
                        style={{
                          color: isActive
                            ? activeFlavour.accent
                            : "#667085",
                        }}
                      >
                        {flavour.number}
                      </span>

                      <span
                        className="
                          h-px
                          transition-all
                          duration-500
                        "
                        style={{
                          backgroundColor: isActive
                            ? activeFlavour.accent
                            : "#667085",
                          width: isActive ? "38px" : "22px",
                        }}
                      />

                      <span
                        className="
                          text-xl
                          transition-colors
                          duration-500

                          xl:text-2xl
                        "
                        style={{
                          color: isActive
                            ? "#184C35"
                            : "#667085",
                          fontFamily: "serif",
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        {flavour.shortName}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Scroll instruction */}

              <div
                className="
                  mt-14
                  flex
                  items-center
                  gap-4

                  xl:mt-20
                "
              >
                <div
                  className="h-10 w-px"
                  style={{
                    backgroundColor: `${activeFlavour.accent}55`,
                  }}
                />

                <p className="text-xs leading-5 text-[#667085]">
                  Scroll to discover
                  <br />
                  every flavour.
                </p>
              </div>
            </div>

            {/* =================================================
                CENTRE ORBIT
            ================================================= */}

            <div
              className="
                relative
                flex
                h-[560px]
                w-[44%]
                items-center
                justify-center

                xl:h-[650px]
              "
            >
              {/* Outer orbit */}

              <motion.div
                className="
                  absolute
                  h-[470px]
                  w-[470px]
                  rounded-full
                  border
                  border-black/[0.09]

                  xl:h-[560px]
                  xl:w-[560px]
                "
                style={{
                  rotate: orbitRotation,
                }}
              />

              {/* Inner orbit */}

              <motion.div
                className="
                  absolute
                  h-[350px]
                  w-[350px]
                  rounded-full
                  border
                  border-black/[0.08]

                  xl:h-[410px]
                  xl:w-[410px]
                "
                style={{
                  rotate: innerOrbitRotation,
                }}
              />

              {/* Soft glow */}

              <motion.div
                className="
                  absolute
                  h-[310px]
                  w-[310px]
                  rounded-full
                  blur-[80px]

                  xl:h-[390px]
                  xl:w-[390px]
                  xl:blur-[95px]
                "
                animate={{
                  backgroundColor: `${activeFlavour.accent}25`,
                }}
                transition={{
                  duration: 0.9,
                }}
              />

              {/* =================================================
                  3 MAKHANAS ON OUTER RING
              ================================================= */}

              <motion.div
                className="
                  pointer-events-none
                  absolute
                  h-[470px]
                  w-[470px]

                  xl:h-[560px]
                  xl:w-[560px]
                "
                style={{
                  rotate: orbitRotation,
                }}
              >
                {outerMakhanaAngles.map((angle, index) => (
                  <div
                    key={`outer-${index}`}
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      flex
                      items-center
                      justify-center
                    "
                    style={{
                      width: "58px",
                      height: "58px",
                      transform: `
                        translate(-50%, -50%)
                        rotate(${angle}deg)
                        translateY(-235px)
                      `,
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                        rotate: [0, 4, 0],
                      }}
                      transition={{
                        duration: 3.5 + index * 0.35,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Makhana size={44} />
                    </motion.div>
                  </div>
                ))}
              </motion.div>

              {/* =================================================
                  4 MAKHANAS ON INNER RING
              ================================================= */}

              <motion.div
                className="
                  pointer-events-none
                  absolute
                  h-[350px]
                  w-[350px]

                  xl:h-[410px]
                  xl:w-[410px]
                "
                style={{
                  rotate: innerOrbitRotation,
                }}
              >
                {innerMakhanaAngles.map((angle, index) => (
                  <div
                    key={`inner-${index}`}
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      flex
                      items-center
                      justify-center
                    "
                    style={{
                      width: "56px",
                      height: "56px",
                      transform: `
                        translate(-50%, -50%)
                        rotate(${angle}deg)
                        translateY(-175px)
                      `,
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -4, 0],
                        rotate: [0, -3, 0],
                      }}
                      transition={{
                        duration: 3.2 + index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Makhana size={42} />
                    </motion.div>
                  </div>
                ))}
              </motion.div>

              {/* =================================================
                  PRODUCT
              ================================================= */}

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFlavour.name}
                  initial={{
                    opacity: 0,
                    scale: 0.88,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.92,
                    y: -20,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    relative
                    z-10
                    flex
                    h-[350px]
                    w-[350px]
                    items-center
                    justify-center

                    xl:h-[430px]
                    xl:w-[430px]
                  "
                >
                  <motion.img
                    src={activeFlavour.image}
                    alt={activeFlavour.title}
                    className="
                      max-h-full
                      max-w-full
                      object-contain
                      drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]
                    "
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* =================================================
                RIGHT CONTENT
            ================================================= */}

            <div
              className="
                relative
                z-20
                w-[28%]
                pl-6

                xl:pl-10
              "
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFlavour.name}
                  initial={{
                    opacity: 0,
                    x: 30,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Counter */}

                  <div
                    className="
                      mb-5
                      flex
                      items-end
                      justify-between

                      xl:mb-7
                    "
                  >
                    <span
                      className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.25em]

                        xl:text-[10px]
                      "
                      style={{
                        color: activeFlavour.accent,
                      }}
                    >
                      Flavour
                    </span>

                    <span
                      className="
                        font-serif
                        text-3xl
                        text-[#184C35]/20

                        xl:text-4xl
                      "
                    >
                      {activeFlavour.number}

                      <span className="ml-1 text-xs font-sans xl:text-sm">
                        /04
                      </span>
                    </span>
                  </div>

                  {/* Badge */}

                  <span
                    className="
                      inline-flex
                      max-w-full
                      rounded-full
                      px-3
                      py-2
                      text-[8px]
                      font-semibold
                      tracking-[0.15em]
                      text-white

                      xl:px-4
                      xl:text-[10px]
                      xl:tracking-[0.18em]
                    "
                    style={{
                      backgroundColor: activeFlavour.accent,
                    }}
                  >
                    {activeFlavour.badge}
                  </span>

                  {/* Title */}

                  <h3
                    className="
                      mt-5
                      text-4xl
                      leading-[0.95]
                      text-[#184C35]

                      xl:mt-6
                      xl:text-5xl

                      2xl:text-6xl
                    "
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                    }}
                  >
                    {activeFlavour.name}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-lg
                      text-[#184C35]/55

                      xl:text-xl
                    "
                    style={{
                      fontFamily: "serif",
                    }}
                  >
                    Roasted Makhana
                  </p>

                  {/* Description */}

                  <p
                    className="
                      mt-5
                      text-[13px]
                      leading-6
                      text-[#667085]

                      xl:mt-7
                      xl:text-[15px]
                      xl:leading-7
                    "
                  >
                    {activeFlavour.description}
                  </p>

                  {/* Ingredients */}

                  <div
                    className="
                      mt-5
                      flex
                      flex-wrap
                      gap-1.5

                      xl:mt-7
                      xl:gap-2
                    "
                  >
                    {[
                      "Roasted Makhana",
                      "Iodised Salt",
                      "Natural Flavours",
                      "Seasoning",
                    ].map((ingredient) => (
                      <span
                        key={ingredient}
                        className="
                          rounded-full
                          border
                          border-black/[0.06]
                          bg-white/55
                          px-2.5
                          py-1.5
                          text-[9px]
                          font-medium
                          text-[#184C35]

                          xl:px-3
                          xl:py-2
                          xl:text-[11px]
                        "
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}

                  <div
                    className="
                      my-5
                      h-px
                      bg-black/[0.07]

                      xl:my-7
                    "
                  />

                  {/* Benefits */}

                  <div className="flex flex-wrap gap-x-4 gap-y-2 xl:gap-x-5">
                    {[
                      "Gluten Free",
                      "High Source of Fibre",
                      "Rich in Antioxidants",
                    ].map((item) => (
                      <div
                        key={item}
                        className="
                          flex
                          items-center
                          gap-2
                          text-[9px]
                          font-medium
                          text-[#184C35]

                          xl:text-[11px]
                        "
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            backgroundColor:
                              activeFlavour.accent,
                          }}
                        />

                        {item}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}

                  <Link
                    to={`/products/${activeFlavour.slug}`}
                    className="
                      group
                      mt-6
                      inline-flex
                      items-center
                      gap-3
                      rounded-full
                      px-6
                      py-3.5
                      text-xs
                      font-semibold
                      text-white
                      transition-all
                      duration-300
                      hover:-translate-y-1

                      xl:mt-8
                      xl:px-7
                      xl:py-4
                      xl:text-sm
                    "
                    style={{
                      backgroundColor:
                        activeFlavour.accent,
                    }}
                  >
                    Shop {activeFlavour.name}

                    <ArrowUpRight
                      size={17}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                      "
                    />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* =================================================
              MOBILE + TABLET VERSION
          ================================================= */}

          <div
            className="
              flex
              h-full
              w-full
              flex-col
              lg:hidden
            "
          >
            {/* Mobile heading */}

            <div
              className="
                flex
                items-end
                justify-between
                pt-2

                sm:pt-3
              "
            >
              <div>
                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.28em]
                    text-[#667085]

                    sm:text-[9px]
                  "
                >
                  Our flavours
                </p>

                <h2
                  className="
                    mt-1.5
                    text-[1.9rem]
                    leading-none
                    text-[#184C35]

                    sm:mt-2
                    sm:text-4xl
                  "
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                  }}
                >
                  Pick your mood.
                </h2>
              </div>

              <div className="text-right">
                <span
                  className="
                    font-serif
                    text-3xl
                    text-[#184C35]/20

                    sm:text-4xl
                  "
                >
                  {activeFlavour.number}
                </span>

                <span className="text-[10px] text-[#184C35]/40 sm:text-xs">
                  /04
                </span>
              </div>
            </div>

            {/* =================================================
                MOBILE ORBIT
            ================================================= */}

            <div
              className="
                relative
                mx-auto
                flex
                h-[290px]
                w-full
                max-w-[390px]
                shrink-0
                items-center
                justify-center

                sm:h-[300px]
                sm:max-w-[430px]

                md:h-[330px]
                md:max-w-[500px]
              "
            >
              {/* Outer orbit */}

              <motion.div
                className="
                  absolute
                  h-[235px]
                  w-[235px]
                  rounded-full
                  border
                  border-black/[0.08]

                  sm:h-[275px]
                  sm:w-[275px]

                  md:h-[300px]
                  md:w-[300px]
                "
                style={{
                  rotate: orbitRotation,
                }}
              />

              {/* Inner orbit */}

              <motion.div
                className="
                  absolute
                  h-[165px]
                  w-[165px]
                  rounded-full
                  border
                  border-black/[0.06]

                  sm:h-[195px]
                  sm:w-[195px]

                  md:h-[215px]
                  md:w-[215px]
                "
              />

              {/* Glow */}

              <motion.div
                className="
                  absolute
                  h-40
                  w-40
                  rounded-full
                  blur-[50px]

                  sm:h-48
                  sm:w-48
                  sm:blur-[60px]
                "
                animate={{
                  backgroundColor: `${activeFlavour.accent}30`,
                }}
              />

              {/* =================================================
                  3 MOBILE OUTER MAKHANAS
              ================================================= */}

              <motion.div
                className="
                  pointer-events-none
                  absolute
                  h-[235px]
                  w-[235px]

                  sm:h-[275px]
                  sm:w-[275px]

                  md:h-[300px]
                  md:w-[300px]
                "
                style={{
                  rotate: orbitRotation,
                }}
              >
                {outerMakhanaAngles.map((angle, index) => (
                  <div
                    key={`mobile-outer-${index}`}
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      flex
                      items-center
                      justify-center
                    "
                    style={{
                      width: "48px",
                      height: "48px",
                      transform: `
                        translate(-50%, -50%)
                        rotate(${angle}deg)
                        translateY(-117px)
                      `,
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -4, 0],
                      }}
                      transition={{
                        duration: 3 + index * 0.25,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Makhana size={34} />
                    </motion.div>
                  </div>
                ))}
              </motion.div>

              {/* =================================================
                  4 MOBILE INNER MAKHANAS
              ================================================= */}

              <motion.div
                className="
                  pointer-events-none
                  absolute
                  h-[165px]
                  w-[165px]

                  sm:h-[195px]
                  sm:w-[195px]

                  md:h-[215px]
                  md:w-[215px]
                "
                style={{
                  rotate: innerOrbitRotation,
                }}
              >
                {innerMakhanaAngles.map((angle, index) => (
                  <div
                    key={`mobile-inner-${index}`}
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      flex
                      items-center
                      justify-center
                    "
                    style={{
                      width: "46px",
                      height: "46px",
                      transform: `
                        translate(-50%, -50%)
                        rotate(${angle}deg)
                        translateY(-82.5px)
                      `,
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -3, 0],
                      }}
                      transition={{
                        duration: 3.2 + index * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Makhana size={32} />
                    </motion.div>
                  </div>
                ))}
              </motion.div>

              {/* Product */}

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeFlavour.name}
                  src={activeFlavour.image}
                  alt={activeFlavour.title}
                  initial={{
                    opacity: 0,
                    scale: 0.85,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    y: -15,
                  }}
                  transition={{
                    duration: 0.55,
                  }}
                  className="
                    relative
                    z-10
                    h-[210px]
                    w-[210px]
                    object-contain
                    drop-shadow-[0_25px_25px_rgba(0,0,0,0.14)]

                    sm:h-[245px]
                    sm:w-[245px]

                    md:h-[270px]
                    md:w-[270px]
                  "
                />
              </AnimatePresence>
            </div>

            {/* Mobile selector */}

            <div
              className="
                mt-1
                flex
                shrink-0
                justify-center
                gap-2

                sm:mt-2
                md:mt-3
              "
            >
              {flavours.map((flavour, index) => (
                <div
                  key={flavour.name}
                  className="
                    h-1
                    rounded-full
                    transition-all
                    duration-500
                  "
                  style={{
                    width:
                      index === activeIndex
                        ? "30px"
                        : "9px",
                    backgroundColor:
                      index === activeIndex
                        ? activeFlavour.accent
                        : "#184C35",
                    opacity:
                      index === activeIndex
                        ? 1
                        : 0.15,
                  }}
                />
              ))}
            </div>

            {/* =================================================
                MOBILE CONTENT
            ================================================= */}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFlavour.name}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="
                  mt-4
                  min-h-0
                  flex-1
                  overflow-y-auto
                  pb-3
                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden

                  sm:mt-5
                  md:mt-6
                "
              >
                {/* Badge */}

                <span
                  className="
                    inline-flex
                    max-w-full
                    rounded-full
                    px-3
                    py-1.5
                    text-[8px]
                    font-semibold
                    tracking-[0.15em]
                    text-white

                    sm:px-4
                    sm:py-2
                    sm:text-[9px]
                    sm:tracking-[0.18em]
                  "
                  style={{
                    backgroundColor:
                      activeFlavour.accent,
                  }}
                >
                  {activeFlavour.badge}
                </span>

                {/* Title */}

                <h3
                  className="
                    mt-4
                    text-[2.45rem]
                    leading-[0.95]
                    text-[#184C35]

                    sm:mt-5
                    sm:text-5xl

                    md:text-[3.25rem]
                  "
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                  }}
                >
                  {activeFlavour.name}
                </h3>

                <p
                  className="
                    mt-1.5
                    text-lg
                    text-[#184C35]/50

                    sm:mt-2
                    sm:text-xl
                  "
                  style={{
                    fontFamily: "serif",
                  }}
                >
                  Roasted Makhana
                </p>

                {/* Description */}

                <p
                  className="
                    mt-4
                    max-w-[650px]
                    text-[13px]
                    leading-6
                    text-[#667085]

                    sm:mt-5
                    sm:text-[15px]
                    sm:leading-7
                  "
                >
                  {activeFlavour.description}
                </p>

                {/* Ingredients */}

                <div
                  className="
                    mt-4
                    flex
                    flex-wrap
                    gap-1.5

                    sm:mt-6
                    sm:gap-2
                  "
                >
                  {[
                    "Roasted Makhana",
                    "Iodised Salt",
                    "Natural Flavours",
                    "Seasoning",
                  ].map((ingredient) => (
                    <span
                      key={ingredient}
                      className="
                        rounded-full
                        bg-white/60
                        px-2.5
                        py-1.5
                        text-[9px]
                        font-medium
                        text-[#184C35]

                        sm:px-3
                        sm:py-2
                        sm:text-[10px]
                      "
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>

                {/* CTA */}

                <Link
                  to={`/products/${activeFlavour.slug}`}
                  className="
                    group
                    mt-5
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    px-6
                    py-3.5
                    text-xs
                    font-semibold
                    text-white

                    sm:mt-7
                    sm:py-4
                    sm:text-sm
                  "
                  style={{
                    backgroundColor:
                      activeFlavour.accent,
                  }}
                >
                  Shop {activeFlavour.name}

                  <ArrowUpRight
                    size={17}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                    "
                  />
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Mobile scroll hint */}

            <div
              className="
                flex
                shrink-0
                items-center
                justify-center
                gap-3
                pb-1
                pt-2

                sm:pt-3
              "
            >
              <ChevronDown
                size={14}
                className="animate-bounce text-[#184C35]/40"
              />

              <span
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-[#667085]

                  sm:text-[9px]
                "
              >
                Keep scrolling
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================
            DESKTOP BOTTOM SCROLL INDICATOR
        =================================================== */}

        <div
          className="
            absolute
            bottom-5
            left-1/2
            hidden
            -translate-x-1/2
            items-center
            gap-3

            lg:flex
          "
        >
          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[#667085]
            "
          >
            Scroll to explore
          </span>

          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border
              border-black/[0.1]
            "
          >
            <ChevronDown
              size={14}
              className="animate-bounce text-[#184C35]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


// import { useEffect, useRef, useState } from "react";

// import {
//   motion,
//   AnimatePresence,
//   useMotionValueEvent,
//   useScroll,
//   useSpring,
//   useTransform,
// } from "framer-motion";

// import { ArrowUpRight, ChevronDown } from "lucide-react";
// import { Link } from "react-router-dom";

// import PeriPeri from "../assets/popFresh_periPeri.png";
// import Cheese from "../assets/popFresh_cheese.png";
// import Tomato from "../assets/popFresh_tangyTomato.png";
// import Pudina from "../assets/popFresh_pudina.png";

// /* =========================================================
//    MAKHANA SVG
// ========================================================= */

// function Makhana({ size = 40 }) {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 200 200"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       style={{
//         overflow: "visible",
//         display: "block",
//       }}
//     >
//       <defs>
//         <linearGradient
//           id="makhanaGradient"
//           x1="0"
//           y1="0"
//           x2="1"
//           y2="1"
//         >
//           <stop offset="0%" stopColor="#FFF1C9" />
//           <stop offset="45%" stopColor="#E8C47B" />
//           <stop offset="100%" stopColor="#C99B4D" />
//         </linearGradient>

//         <filter id="makhanaShadow">
//           <feDropShadow
//             dx="0"
//             dy="6"
//             stdDeviation="6"
//             floodOpacity="0.15"
//           />
//         </filter>
//       </defs>

//       <g filter="url(#makhanaShadow)">
//         <path
//           d="
//             M100 20
//             C138 15 172 40 180 78
//             C189 118 166 156 130 174
//             C96 191 54 178 29 144
//             C8 115 8 72 35 42
//             C52 24 76 17 100 20Z
//           "
//           fill="url(#makhanaGradient)"
//         />

//         <circle cx="65" cy="65" r="4" fill="#6F5430" />
//         <circle cx="135" cy="58" r="3.5" fill="#6F5430" />
//         <circle cx="110" cy="120" r="4" fill="#6F5430" />
//         <circle cx="75" cy="128" r="3.5" fill="#6F5430" />
//         <circle cx="98" cy="92" r="2.5" fill="#6F5430" />

//         <ellipse
//           cx="72"
//           cy="55"
//           rx="24"
//           ry="12"
//           fill="white"
//           opacity="0.28"
//           transform="rotate(-20 72 55)"
//         />
//       </g>
//     </svg>
//   );
// }

// /* =========================================================
//    FLAVOURS DATA
// ========================================================= */

// const flavours = [
//   {
//     number: "01",
//     name: "Peri Peri",
//     slug: "peri-peri",
//     shortName: "Peri Peri",
//     title: "Peri Peri Roasted Makhana",
//     badge: "FIERY. BOLD. ADDICTIVE.",
//     image: PeriPeri,
//     bg: "#F7E6DE",
//     accent: "#E86B2F",
//     accentSoft: "#F2B08B",
//     description:
//       "Slow-roasted makhanas tossed in a smoky African chilli blend with a citrusy kick. The snack that bites back.",
//   },

//   {
//     number: "02",
//     name: "Cheese",
//     slug: "cheese",
//     shortName: "Cheese",
//     title: "Cheese Roasted Makhana",
//     badge: "RICH. CREAMY. IRRESISTIBLE.",
//     image: Cheese,
//     bg: "#F8F0D9",
//     accent: "#D7A326",
//     accentSoft: "#EBCB73",
//     description:
//       "A luxurious cheese seasoning wrapped around every crunchy bite. Comfort food without the guilt.",
//   },

//   {
//     number: "03",
//     name: "Tangy Tomato",
//     slug: "tangy-tomato",
//     shortName: "Tangy Tomato",
//     title: "Tangy Tomato Roasted Makhana",
//     badge: "ZESTY. TANGY. FUN.",
//     image: Tomato,
//     bg: "#F7E4E0",
//     accent: "#D94E43",
//     accentSoft: "#ECA39D",
//     description:
//       "A punchy blend of ripe tomato, herbs and spices that delivers the perfect sweet-and-tangy balance.",
//   },

//   {
//     number: "04",
//     name: "Pudina",
//     slug: "pudina",
//     shortName: "Pudina",
//     title: "Pudina Roasted Makhana",
//     badge: "FRESH. COOL. CRUNCHY.",
//     image: Pudina,
//     bg: "#E7F0E8",
//     accent: "#3D8C57",
//     accentSoft: "#9BC3A5",
//     description:
//       "Refreshing mint and subtle spices come together for a flavour that feels light, crisp and addictive.",
//   },
// ];

// /* =========================================================
//    COMPONENT
// ========================================================= */

// export default function Flavours() {
//   const sectionRef = useRef(null);

//   const [activeIndex, setActiveIndex] = useState(0);

//   /* =======================================================
//      SCROLL
//   ======================================================= */

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"],
//   });

//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 90,
//     damping: 25,
//     mass: 0.4,
//   });

//   /* =======================================================
//      ORBIT ROTATION
//   ======================================================= */

//   const orbitRotation = useTransform(
//     smoothProgress,
//     [0, 1],
//     [0, -360]
//   );

//   const innerOrbitRotation = useTransform(
//     smoothProgress,
//     [0, 1],
//     [0, 180]
//   );

//   /* =======================================================
//      HEADER MOVEMENT
//   ======================================================= */

//   const headerY = useTransform(
//     smoothProgress,
//     [0, 0.15],
//     [0, -35]
//   );

//   const headerOpacity = useTransform(
//     smoothProgress,
//     [0, 0.12],
//     [1, 0.55]
//   );

//   /* =======================================================
//      ACTIVE FLAVOUR
//   ======================================================= */

//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     const nextIndex = Math.min(
//       flavours.length - 1,
//       Math.floor(latest * flavours.length)
//     );

//     setActiveIndex(nextIndex);
//   });

//   const activeFlavour = flavours[activeIndex];

//   /* =======================================================
//      BACKGROUND
//   ======================================================= */

//   const [background, setBackground] = useState(flavours[0].bg);

//   useEffect(() => {
//     setBackground(activeFlavour.bg);
//   }, [activeFlavour]);

//   /* =======================================================
//      ORBIT MAKHANA POSITIONS
//   ======================================================= */

//   // Outer ring = exactly 3 makhanas
//   const outerOrbitAngles = [25, 155, 285];

//   // Inner ring = exactly 4 makhanas
//   // Uneven/random-looking positions
//   const innerOrbitAngles = [35, 128, 218, 310];

//   return (
//     <section
//       ref={sectionRef}
//       className="relative w-full"
//       style={{
//         height: "455vh",
//       }}
//     >
//       {/* =====================================================
//           INTRO / HEADING
//       ===================================================== */}

//       <div
//         className="
//           relative
//           z-20
//           flex
//           min-h-[330px]
//           w-full
//           flex-col
//           items-center
//           justify-center
//           bg-[#F8F5EF]
//           px-5
//           pt-24
//           pb-16
//           text-center

//           sm:min-h-[360px]
//           sm:px-6
//           sm:pt-28
//           sm:pb-20

//           md:min-h-[390px]

//           lg:min-h-[430px]
//           lg:px-8
//           lg:pt-36
//           lg:pb-24
//         "
//       >
//         {/* Small label */}

//         <div
//           className="
//             inline-flex
//             items-center
//             justify-center
//             rounded-full
//             bg-[#EAE5DA]
//             px-5
//             py-2.5
//             text-[9px]
//             font-semibold
//             uppercase
//             tracking-[0.28em]
//             text-[#184C35]

//             sm:px-6
//             sm:text-[10px]
//           "
//         >
//           OUR FLAVOURS
//         </div>

//         {/* Main heading */}

//         <h2
//           className="
//             mt-6
//             max-w-[1000px]
//             text-[2.65rem]
//             leading-[1]
//             tracking-[-0.04em]
//             text-[#184C35]

//             sm:mt-7
//             sm:text-5xl

//             md:text-6xl

//             lg:mt-8
//             lg:text-[76px]
//           "
//           style={{
//             fontFamily: "'Fraunces', Georgia, serif",
//             fontWeight: 500,
//           }}
//         >
//           Crafted for every craving
//         </h2>

//         {/* Subtitle */}

//         <p
//           className="
//             mt-5
//             max-w-[650px]
//             px-2
//             text-sm
//             leading-6
//             text-[#667085]

//             sm:mt-6
//             sm:px-0
//             sm:text-base

//             lg:mt-7
//             lg:text-lg
//           "
//         >
//           Four signature flavours. One impossibly satisfying crunch.
//         </p>
//       </div>

//       {/* =====================================================
//           STICKY FLAVOUR EXPERIENCE
//       ===================================================== */}

//       <div
//         className="
//           sticky
//           top-0
//           flex
//           h-[100svh]
//           min-h-[620px]
//           w-full
//           items-center
//           overflow-hidden

//           lg:min-h-0
//         "
//         style={{
//           background,
//           transition: "background-color 900ms ease",
//         }}
//       >
//         {/* ===================================================
//             AMBIENT BACKGROUND
//         =================================================== */}

//         <motion.div
//           className="pointer-events-none absolute inset-0"
//           animate={{
//             background: `
//               radial-gradient(
//                 circle at 52% 48%,
//                 ${activeFlavour.accentSoft}45 0%,
//                 transparent 34%
//               ),
//               radial-gradient(
//                 circle at 15% 75%,
//                 ${activeFlavour.accentSoft}20 0%,
//                 transparent 30%
//               ),
//               radial-gradient(
//                 circle at 90% 25%,
//                 ${activeFlavour.accentSoft}18 0%,
//                 transparent 28%
//               )
//             `,
//           }}
//           transition={{
//             duration: 1.2,
//             ease: "easeInOut",
//           }}
//         />

//         {/* Grain */}

//         <div
//           className="
//             pointer-events-none
//             absolute
//             inset-0
//             opacity-[0.025]
//             mix-blend-multiply
//           "
//           style={{
//             backgroundImage:
//               "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.35'/%3E%3C/svg%3E\")",
//           }}
//         />

//         {/* ===================================================
//             MAIN CONTAINER
//         =================================================== */}

//         <div
//           className="
//             relative
//             mx-auto
//             flex
//             h-full
//             w-full
//             max-w-[1500px]
//             flex-col
//             px-5
//             pt-16
//             pb-5

//             sm:px-7
//             sm:pt-20

//             md:px-8

//             lg:px-12
//             lg:pt-28
//             lg:pb-0
//           "
//         >
//           {/* =================================================
//               TOP LABEL
//           ================================================= */}

//           <motion.div
//             style={{
//               y: headerY,
//               opacity: headerOpacity,
//             }}
//             className="
//               absolute
//               left-5
//               top-5
//               z-30

//               sm:left-7
//               sm:top-6

//               md:left-8

//               lg:left-12
//               lg:top-10
//             "
//           ></motion.div>

//           {/* =================================================
//               DESKTOP
//           ================================================= */}

//           <div
//             className="
//               relative
//               hidden
//               h-full
//               min-h-[600px]
//               items-center
//               lg:flex
//             "
//           >
//             {/* =================================================
//                 LEFT SIDE
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 z-20
//                 w-[28%]
//                 pr-6

//                 xl:pr-10
//               "
//             >
//               <p
//                 className="
//                   mb-7
//                   text-[10px]
//                   font-semibold
//                   uppercase
//                   tracking-[0.3em]
//                   text-[#7A8493]

//                   xl:mb-8
//                 "
//               >
//                 Choose your mood
//               </p>

//               <div className="space-y-4 xl:space-y-5">
//                 {flavours.map((flavour, index) => {
//                   const isActive = index === activeIndex;

//                   return (
//                     <div
//                       key={flavour.name}
//                       className="
//                         flex
//                         items-center
//                         gap-3
//                         transition-all
//                         duration-500

//                         xl:gap-4
//                       "
//                       style={{
//                         opacity: isActive ? 1 : 0.28,
//                         transform: isActive
//                           ? "translateX(8px)"
//                           : "translateX(0)",
//                       }}
//                     >
//                       <span
//                         className="
//                           w-6
//                           text-[11px]
//                           font-medium

//                           xl:w-7
//                           xl:text-xs
//                         "
//                         style={{
//                           color: isActive
//                             ? activeFlavour.accent
//                             : "#667085",
//                         }}
//                       >
//                         {flavour.number}
//                       </span>

//                       <span
//                         className="
//                           h-px
//                           transition-all
//                           duration-500
//                         "
//                         style={{
//                           backgroundColor: isActive
//                             ? activeFlavour.accent
//                             : "#667085",
//                           width: isActive ? "38px" : "22px",
//                         }}
//                       />

//                       <span
//                         className="
//                           text-xl
//                           transition-colors
//                           duration-500

//                           xl:text-2xl
//                         "
//                         style={{
//                           color: isActive
//                             ? "#184C35"
//                             : "#667085",
//                           fontFamily: "serif",
//                           fontWeight: isActive ? 600 : 400,
//                         }}
//                       >
//                         {flavour.shortName}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Scroll instruction */}

//               <div
//                 className="
//                   mt-14
//                   flex
//                   items-center
//                   gap-4

//                   xl:mt-20
//                 "
//               >
//                 <div
//                   className="h-10 w-px"
//                   style={{
//                     backgroundColor: `${activeFlavour.accent}55`,
//                   }}
//                 />

//                 <p className="text-xs leading-5 text-[#667085]">
//                   Scroll to discover
//                   <br />
//                   every flavour.
//                 </p>
//               </div>
//             </div>

//             {/* =================================================
//                 CENTRE ORBIT
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 flex
//                 h-[560px]
//                 w-[44%]
//                 items-center
//                 justify-center

//                 xl:h-[650px]
//               "
//             >
//               {/* Outer orbit */}

//               <motion.div
//                 className="
//                   absolute
//                   h-[470px]
//                   w-[470px]
//                   rounded-full
//                   border
//                   border-black/[0.09]

//                   xl:h-[560px]
//                   xl:w-[560px]
//                 "
//                 style={{
//                   rotate: orbitRotation,
//                 }}
//               />

//               {/* Inner orbit */}

//               <motion.div
//                 className="
//                   absolute
//                   h-[350px]
//                   w-[350px]
//                   rounded-full
//                   border
//                   border-black/[0.08]

//                   xl:h-[410px]
//                   xl:w-[410px]
//                 "
//                 style={{
//                   rotate: innerOrbitRotation,
//                 }}
//               />

//               {/* Soft glow */}

//               <motion.div
//                 className="
//                   absolute
//                   h-[310px]
//                   w-[310px]
//                   rounded-full
//                   blur-[80px]

//                   xl:h-[390px]
//                   xl:w-[390px]
//                   xl:blur-[95px]
//                 "
//                 animate={{
//                   backgroundColor: `${activeFlavour.accent}25`,
//                 }}
//                 transition={{
//                   duration: 0.9,
//                 }}
//               />

//               {/* =================================================
//                   3 MAKHANAS ON OUTER ORBIT
//               ================================================= */}

//               <motion.div
//                 className="
//                   pointer-events-none
//                   absolute
//                   h-[470px]
//                   w-[470px]

//                   xl:h-[560px]
//                   xl:w-[560px]
//                 "
//                 style={{
//                   rotate: orbitRotation,
//                 }}
//               >
//                 {outerOrbitAngles.map((angle, index) => (
//                   <div
//                     key={index}
//                     className="
//                       absolute
//                       left-1/2
//                       top-1/2
//                       flex
//                       items-center
//                       justify-center
//                     "
//                     style={{
//                       width: "60px",
//                       height: "60px",
//                       transform: `
//                         translate(-50%, -50%)
//                         rotate(${angle}deg)
//                         translateY(-235px)
//                       `,
//                     }}
//                   >
//                     <motion.div
//                       animate={{
//                         y: [0, -4, 0],
//                         rotate: [0, 3, 0],
//                       }}
//                       transition={{
//                         duration: 3.5 + index * 0.25,
//                         repeat: Infinity,
//                         ease: "easeInOut",
//                       }}
//                       className="
//                         flex
//                         items-center
//                         justify-center
//                       "
//                     >
//                       <Makhana size={44} />
//                     </motion.div>
//                   </div>
//                 ))}
//               </motion.div>

//               {/* =================================================
//                   4 MAKHANAS ON INNER ORBIT
//               ================================================= */}

//               <motion.div
//                 className="
//                   pointer-events-none
//                   absolute
//                   h-[350px]
//                   w-[350px]

//                   xl:h-[410px]
//                   xl:w-[410px]
//                 "
//                 style={{
//                   rotate: innerOrbitRotation,
//                 }}
//               >
//                 {innerOrbitAngles.map((angle, index) => (
//                   <div
//                     key={index}
//                     className="
//                       absolute
//                       left-1/2
//                       top-1/2
//                       flex
//                       items-center
//                       justify-center
//                     "
//                     style={{
//                       width: "55px",
//                       height: "55px",
//                       transform: `
//                         translate(-50%, -50%)
//                         rotate(${angle}deg)
//                         translateY(-175px)
//                       `,
//                     }}
//                   >
//                     <motion.div
//                       animate={{
//                         y: [0, -4, 0],
//                         rotate: [0, -3, 0],
//                       }}
//                       transition={{
//                         duration: 3.2 + index * 0.3,
//                         repeat: Infinity,
//                         ease: "easeInOut",
//                       }}
//                       className="
//                         flex
//                         items-center
//                         justify-center
//                       "
//                     >
//                       <Makhana size={42} />
//                     </motion.div>
//                   </div>
//                 ))}
//               </motion.div>

//               {/* =================================================
//                   PRODUCT
//               ================================================= */}

//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeFlavour.name}
//                   initial={{
//                     opacity: 0,
//                     scale: 0.88,
//                     y: 25,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     scale: 1,
//                     y: 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     scale: 0.92,
//                     y: -20,
//                   }}
//                   transition={{
//                     duration: 0.65,
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                   className="
//                     relative
//                     z-10
//                     flex
//                     h-[350px]
//                     w-[350px]
//                     items-center
//                     justify-center

//                     xl:h-[430px]
//                     xl:w-[430px]
//                   "
//                 >
//                   <motion.img
//                     src={activeFlavour.image}
//                     alt={activeFlavour.title}
//                     className="
//                       max-h-full
//                       max-w-full
//                       object-contain
//                       drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]
//                     "
//                     animate={{
//                       y: [0, -8, 0],
//                       rotate: [0, 0.7, 0],
//                     }}
//                     transition={{
//                       duration: 5,
//                       repeat: Infinity,
//                       ease: "easeInOut",
//                     }}
//                   />
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* =================================================
//                 RIGHT CONTENT
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 z-20
//                 w-[28%]
//                 pl-6

//                 xl:pl-10
//               "
//             >
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeFlavour.name}
//                   initial={{
//                     opacity: 0,
//                     x: 30,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     x: 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     x: -20,
//                   }}
//                   transition={{
//                     duration: 0.55,
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                 >
//                   {/* Counter */}

//                   <div
//                     className="
//                       mb-5
//                       flex
//                       items-end
//                       justify-between

//                       xl:mb-7
//                     "
//                   >
//                     <span
//                       className="
//                         text-[9px]
//                         font-semibold
//                         uppercase
//                         tracking-[0.25em]

//                         xl:text-[10px]
//                       "
//                       style={{
//                         color: activeFlavour.accent,
//                       }}
//                     >
//                       Flavour
//                     </span>

//                     <span
//                       className="
//                         font-serif
//                         text-3xl
//                         text-[#184C35]/20

//                         xl:text-4xl
//                       "
//                     >
//                       {activeFlavour.number}

//                       <span className="ml-1 text-xs font-sans xl:text-sm">
//                         /04
//                       </span>
//                     </span>
//                   </div>

//                   {/* Badge */}

//                   <span
//                     className="
//                       inline-flex
//                       max-w-full
//                       rounded-full
//                       px-3
//                       py-2
//                       text-[8px]
//                       font-semibold
//                       tracking-[0.15em]
//                       text-white

//                       xl:px-4
//                       xl:text-[10px]
//                       xl:tracking-[0.18em]
//                     "
//                     style={{
//                       backgroundColor: activeFlavour.accent,
//                     }}
//                   >
//                     {activeFlavour.badge}
//                   </span>

//                   {/* Title */}

//                   <h3
//                     className="
//                       mt-5
//                       text-4xl
//                       leading-[0.95]
//                       text-[#184C35]

//                       xl:mt-6
//                       xl:text-5xl

//                       2xl:text-6xl
//                     "
//                     style={{
//                       fontFamily:
//                         "'Fraunces', Georgia, serif",
//                     }}
//                   >
//                     {activeFlavour.name}
//                   </h3>

//                   <p
//                     className="
//                       mt-2
//                       text-lg
//                       text-[#184C35]/55

//                       xl:text-xl
//                     "
//                     style={{
//                       fontFamily: "serif",
//                     }}
//                   >
//                     Roasted Makhana
//                   </p>

//                   {/* Description */}

//                   <p
//                     className="
//                       mt-5
//                       text-[13px]
//                       leading-6
//                       text-[#667085]

//                       xl:mt-7
//                       xl:text-[15px]
//                       xl:leading-7
//                     "
//                   >
//                     {activeFlavour.description}
//                   </p>

//                   {/* Ingredients */}

//                   <div
//                     className="
//                       mt-5
//                       flex
//                       flex-wrap
//                       gap-1.5

//                       xl:mt-7
//                       xl:gap-2
//                     "
//                   >
//                     {[
//                       "Roasted Makhana",
//                       "Iodised Salt",
//                       "Natural Flavours",
//                       "Seasoning",
//                     ].map((ingredient) => (
//                       <span
//                         key={ingredient}
//                         className="
//                           rounded-full
//                           border
//                           border-black/[0.06]
//                           bg-white/55
//                           px-2.5
//                           py-1.5
//                           text-[9px]
//                           font-medium
//                           text-[#184C35]

//                           xl:px-3
//                           xl:py-2
//                           xl:text-[11px]
//                         "
//                       >
//                         {ingredient}
//                       </span>
//                     ))}
//                   </div>

//                   {/* Divider */}

//                   <div
//                     className="
//                       my-5
//                       h-px
//                       bg-black/[0.07]

//                       xl:my-7
//                     "
//                   />

//                   {/* Benefits */}

//                   <div className="flex flex-wrap gap-x-4 gap-y-2 xl:gap-x-5">
//                     {[
//                       "Gluten Free",
//                       "High Source of Fibre",
//                       "Rich in Antioxidants",
//                     ].map((item) => (
//                       <div
//                         key={item}
//                         className="
//                           flex
//                           items-center
//                           gap-2
//                           text-[9px]
//                           font-medium
//                           text-[#184C35]

//                           xl:text-[11px]
//                         "
//                       >
//                         <span
//                           className="h-1.5 w-1.5 rounded-full"
//                           style={{
//                             backgroundColor:
//                               activeFlavour.accent,
//                           }}
//                         />

//                         {item}
//                       </div>
//                     ))}
//                   </div>

//                   {/* CTA */}

//                   <Link
//                     to={`/products/${activeFlavour.slug}`}
//                     className="
//                       group
//                       mt-6
//                       inline-flex
//                       items-center
//                       gap-3
//                       rounded-full
//                       px-6
//                       py-3.5
//                       text-xs
//                       font-semibold
//                       text-white
//                       transition-all
//                       duration-300
//                       hover:-translate-y-1

//                       xl:mt-8
//                       xl:px-7
//                       xl:py-4
//                       xl:text-sm
//                     "
//                     style={{
//                       backgroundColor:
//                         activeFlavour.accent,
//                     }}
//                   >
//                     Shop {activeFlavour.name}

//                     <ArrowUpRight
//                       size={17}
//                       className="
//                         transition-transform
//                         duration-300
//                         group-hover:translate-x-1
//                         group-hover:-translate-y-1
//                       "
//                     />
//                   </Link>
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* =================================================
//               MOBILE + TABLET VERSION
//           ================================================= */}

//           <div
//             className="
//               flex
//               h-full
//               w-full
//               flex-col
//               lg:hidden
//             "
//           >
//             {/* Mobile heading */}

//             <div
//               className="
//                 flex
//                 items-end
//                 justify-between
//                 pt-2

//                 sm:pt-3
//               "
//             >
//               <div>
//                 <p
//                   className="
//                     text-[8px]
//                     font-semibold
//                     uppercase
//                     tracking-[0.28em]
//                     text-[#667085]

//                     sm:text-[9px]
//                   "
//                 >
//                   Our flavours
//                 </p>

//                 <h2
//                   className="
//                     mt-1.5
//                     text-[1.9rem]
//                     leading-none
//                     text-[#184C35]

//                     sm:mt-2
//                     sm:text-4xl
//                   "
//                   style={{
//                     fontFamily:
//                       "'Fraunces', Georgia, serif",
//                   }}
//                 >
//                   Pick your mood.
//                 </h2>
//               </div>

//               <div className="text-right">
//                 <span
//                   className="
//                     font-serif
//                     text-3xl
//                     text-[#184C35]/20

//                     sm:text-4xl
//                   "
//                 >
//                   {activeFlavour.number}
//                 </span>

//                 <span className="text-[10px] text-[#184C35]/40 sm:text-xs">
//                   /04
//                 </span>
//               </div>
//             </div>

//             {/* =================================================
//                 MOBILE ORBIT
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 mx-auto
//                 flex
//                 h-[260px]
//                 w-full
//                 max-w-[390px]
//                 shrink-0
//                 items-center
//                 justify-center

//                 sm:h-[300px]
//                 sm:max-w-[430px]

//                 md:h-[330px]
//                 md:max-w-[500px]
//               "
//             >
//               {/* Outer orbit */}

//               <motion.div
//                 className="
//                   absolute
//                   h-[235px]
//                   w-[235px]
//                   rounded-full
//                   border
//                   border-black/[0.08]

//                   sm:h-[275px]
//                   sm:w-[275px]

//                   md:h-[300px]
//                   md:w-[300px]
//                 "
//                 style={{
//                   rotate: orbitRotation,
//                 }}
//               />

//               {/* Inner orbit */}

//               <motion.div
//                 className="
//                   absolute
//                   h-[165px]
//                   w-[165px]
//                   rounded-full
//                   border
//                   border-black/[0.06]

//                   sm:h-[195px]
//                   sm:w-[195px]

//                   md:h-[215px]
//                   md:w-[215px]
//                 "
//               />

//               {/* Glow */}

//               <motion.div
//                 className="
//                   absolute
//                   h-40
//                   w-40
//                   rounded-full
//                   blur-[50px]

//                   sm:h-48
//                   sm:w-48
//                   sm:blur-[60px]
//                 "
//                 animate={{
//                   backgroundColor:
//                     `${activeFlavour.accent}30`,
//                 }}
//               />

//               {/* =================================================
//                   3 MOBILE OUTER MAKHANAS
//               ================================================= */}

//               <motion.div
//                 className="
//                   pointer-events-none
//                   absolute
//                   h-[235px]
//                   w-[235px]

//                   sm:h-[275px]
//                   sm:w-[275px]

//                   md:h-[300px]
//                   md:w-[300px]
//                 "
//                 style={{
//                   rotate: orbitRotation,
//                 }}
//               >
//                 {outerOrbitAngles.map((angle, index) => (
//                   <div
//                     key={index}
//                     className="
//                       absolute
//                       left-1/2
//                       top-1/2
//                       flex
//                       items-center
//                       justify-center
//                     "
//                     style={{
//                       width: "48px",
//                       height: "48px",
//                       transform: `
//                         translate(-50%, -50%)
//                         rotate(${angle}deg)
//                         translateY(-117px)
//                       `,
//                     }}
//                   >
//                     <motion.div
//                       animate={{
//                         y: [0, -3, 0],
//                       }}
//                       transition={{
//                         duration: 3 + index * 0.2,
//                         repeat: Infinity,
//                         ease: "easeInOut",
//                       }}
//                     >
//                       <Makhana size={34} />
//                     </motion.div>
//                   </div>
//                 ))}
//               </motion.div>

//               {/* =================================================
//                   4 MOBILE INNER MAKHANAS
//               ================================================= */}

//               <motion.div
//                 className="
//                   pointer-events-none
//                   absolute
//                   h-[165px]
//                   w-[165px]

//                   sm:h-[195px]
//                   sm:w-[195px]

//                   md:h-[215px]
//                   md:w-[215px]
//                 "
//                 style={{
//                   rotate: innerOrbitRotation,
//                 }}
//               >
//                 {innerOrbitAngles.map((angle, index) => (
//                   <div
//                     key={index}
//                     className="
//                       absolute
//                       left-1/2
//                       top-1/2
//                       flex
//                       items-center
//                       justify-center
//                     "
//                     style={{
//                       width: "42px",
//                       height: "42px",
//                       transform: `
//                         translate(-50%, -50%)
//                         rotate(${angle}deg)
//                         translateY(-82px)
//                       `,
//                     }}
//                   >
//                     <motion.div
//                       animate={{
//                         y: [0, -3, 0],
//                       }}
//                       transition={{
//                         duration: 3 + index * 0.2,
//                         repeat: Infinity,
//                         ease: "easeInOut",
//                       }}
//                     >
//                       <Makhana size={32} />
//                     </motion.div>
//                   </div>
//                 ))}
//               </motion.div>

//               {/* Product */}

//               <AnimatePresence mode="wait">
//                 <motion.img
//                   key={activeFlavour.name}
//                   src={activeFlavour.image}
//                   alt={activeFlavour.title}
//                   initial={{
//                     opacity: 0,
//                     scale: 0.85,
//                     y: 20,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     scale: 1,
//                     y: 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     scale: 0.9,
//                     y: -15,
//                   }}
//                   transition={{
//                     duration: 0.55,
//                   }}
//                   className="
//                     relative
//                     z-10
//                     h-[210px]
//                     w-[210px]
//                     object-contain
//                     drop-shadow-[0_25px_25px_rgba(0,0,0,0.14)]

//                     sm:h-[245px]
//                     sm:w-[245px]

//                     md:h-[270px]
//                     md:w-[270px]
//                   "
//                 />
//               </AnimatePresence>
//             </div>

//             {/* Mobile selector */}

//             <div
//               className="
//                 mt-1
//                 flex
//                 shrink-0
//                 justify-center
//                 gap-2

//                 sm:mt-2
//                 md:mt-3
//               "
//             >
//               {flavours.map((flavour, index) => (
//                 <div
//                   key={flavour.name}
//                   className="
//                     h-1
//                     rounded-full
//                     transition-all
//                     duration-500
//                   "
//                   style={{
//                     width:
//                       index === activeIndex
//                         ? "30px"
//                         : "9px",
//                     backgroundColor:
//                       index === activeIndex
//                         ? activeFlavour.accent
//                         : "#184C35",
//                     opacity:
//                       index === activeIndex
//                         ? 1
//                         : 0.15,
//                   }}
//                 />
//               ))}
//             </div>

//             {/* =================================================
//                 MOBILE CONTENT
//             ================================================= */}

//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeFlavour.name}
//                 initial={{
//                   opacity: 0,
//                   y: 20,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 exit={{
//                   opacity: 0,
//                   y: -15,
//                 }}
//                 transition={{
//                   duration: 0.5,
//                 }}
//                 className="
//                   mt-4
//                   min-h-0
//                   flex-1
//                   overflow-y-auto
//                   pb-3
//                   [scrollbar-width:none]
//                   [&::-webkit-scrollbar]:hidden

//                   sm:mt-5
//                   md:mt-6
//                 "
//               >
//                 {/* Badge */}

//                 <span
//                   className="
//                     inline-flex
//                     max-w-full
//                     rounded-full
//                     px-3
//                     py-1.5
//                     text-[8px]
//                     font-semibold
//                     tracking-[0.15em]
//                     text-white

//                     sm:px-4
//                     sm:py-2
//                     sm:text-[9px]
//                     sm:tracking-[0.18em]
//                   "
//                   style={{
//                     backgroundColor:
//                       activeFlavour.accent,
//                   }}
//                 >
//                   {activeFlavour.badge}
//                 </span>

//                 {/* Title */}

//                 <h3
//                   className="
//                     mt-4
//                     text-[2.45rem]
//                     leading-[0.95]
//                     text-[#184C35]

//                     sm:mt-5
//                     sm:text-5xl

//                     md:text-[3.25rem]
//                   "
//                   style={{
//                     fontFamily:
//                       "'Fraunces', Georgia, serif",
//                   }}
//                 >
//                   {activeFlavour.name}
//                 </h3>

//                 <p
//                   className="
//                     mt-1.5
//                     text-lg
//                     text-[#184C35]/50

//                     sm:mt-2
//                     sm:text-xl
//                   "
//                   style={{
//                     fontFamily: "serif",
//                   }}
//                 >
//                   Roasted Makhana
//                 </p>

//                 {/* Description */}

//                 <p
//                   className="
//                     mt-4
//                     max-w-[650px]
//                     text-[13px]
//                     leading-6
//                     text-[#667085]

//                     sm:mt-5
//                     sm:text-[15px]
//                     sm:leading-7
//                   "
//                 >
//                   {activeFlavour.description}
//                 </p>

//                 {/* Ingredients */}

//                 <div
//                   className="
//                     mt-4
//                     flex
//                     flex-wrap
//                     gap-1.5

//                     sm:mt-6
//                     sm:gap-2
//                   "
//                 >
//                   {[
//                     "Roasted Makhana",
//                     "Iodised Salt",
//                     "Natural Flavours",
//                     "Seasoning",
//                   ].map((ingredient) => (
//                     <span
//                       key={ingredient}
//                       className="
//                         rounded-full
//                         bg-white/60
//                         px-2.5
//                         py-1.5
//                         text-[9px]
//                         font-medium
//                         text-[#184C35]

//                         sm:px-3
//                         sm:py-2
//                         sm:text-[10px]
//                       "
//                     >
//                       {ingredient}
//                     </span>
//                   ))}
//                 </div>

//                 {/* CTA */}

//                 <Link
//                   to={`/products/${activeFlavour.slug}`}
//                   className="
//                     group
//                     mt-5
//                     flex
//                     w-full
//                     items-center
//                     justify-center
//                     gap-3
//                     rounded-full
//                     px-6
//                     py-3.5
//                     text-xs
//                     font-semibold
//                     text-white

//                     sm:mt-7
//                     sm:py-4
//                     sm:text-sm
//                   "
//                   style={{
//                     backgroundColor:
//                       activeFlavour.accent,
//                   }}
//                 >
//                   Shop {activeFlavour.name}

//                   <ArrowUpRight
//                     size={17}
//                     className="
//                       transition-transform
//                       duration-300
//                       group-hover:translate-x-1
//                       group-hover:-translate-y-1
//                     "
//                   />
//                 </Link>
//               </motion.div>
//             </AnimatePresence>

//             {/* Mobile scroll hint */}

//             <div
//               className="
//                 flex
//                 shrink-0
//                 items-center
//                 justify-center
//                 gap-3
//                 pb-1
//                 pt-2

//                 sm:pt-3
//               "
//             >
//               <ChevronDown
//                 size={14}
//                 className="animate-bounce text-[#184C35]/40"
//               />

//               <span
//                 className="
//                   text-[8px]
//                   font-semibold
//                   uppercase
//                   tracking-[0.25em]
//                   text-[#667085]

//                   sm:text-[9px]
//                 "
//               >
//                 Keep scrolling
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* ===================================================
//             DESKTOP BOTTOM SCROLL INDICATOR
//         =================================================== */}

//         <div
//           className="
//             absolute
//             bottom-5
//             left-1/2
//             hidden
//             -translate-x-1/2
//             items-center
//             gap-3

//             lg:flex
//           "
//         >
//           <span
//             className="
//               text-[9px]
//               font-semibold
//               uppercase
//               tracking-[0.3em]
//               text-[#667085]
//             "
//           >
//             Scroll to explore
//           </span>

//           <div
//             className="
//               flex
//               h-8
//               w-8
//               items-center
//               justify-center
//               rounded-full
//               border
//               border-black/[0.1]
//             "
//           >
//             <ChevronDown
//               size={14}
//               className="animate-bounce text-[#184C35]"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// import { useEffect, useRef, useState } from "react";

// import {
//   motion,
//   AnimatePresence,
//   useMotionValueEvent,
//   useScroll,
//   useSpring,
//   useTransform,
// } from "framer-motion";

// import { ArrowUpRight, ChevronDown } from "lucide-react";
// import { Link } from "react-router-dom";

// import PeriPeri from "../assets/popFresh_periPeri.png";
// import Cheese from "../assets/popFresh_cheese.png";
// import Tomato from "../assets/popFresh_tangyTomato.png";
// import Pudina from "../assets/popFresh_pudina.png";

// /* =========================================================
//    MAKHANA SVG
// ========================================================= */

// function Makhana({ size = 40 }) {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 200 200"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       style={{
//         overflow: "visible",
//         display: "block",
//       }}
//     >
//       <defs>
//         <linearGradient
//           id="makhanaGradient"
//           x1="0"
//           y1="0"
//           x2="1"
//           y2="1"
//         >
//           <stop offset="0%" stopColor="#FFF1C9" />
//           <stop offset="45%" stopColor="#E8C47B" />
//           <stop offset="100%" stopColor="#C99B4D" />
//         </linearGradient>

//         <filter id="makhanaShadow">
//           <feDropShadow
//             dx="0"
//             dy="6"
//             stdDeviation="6"
//             floodOpacity="0.15"
//           />
//         </filter>
//       </defs>

//       <g filter="url(#makhanaShadow)">
//         <path
//           d="
//             M100 20
//             C138 15 172 40 180 78
//             C189 118 166 156 130 174
//             C96 191 54 178 29 144
//             C8 115 8 72 35 42
//             C52 24 76 17 100 20Z
//           "
//           fill="url(#makhanaGradient)"
//         />

//         <circle cx="65" cy="65" r="4" fill="#6F5430" />
//         <circle cx="135" cy="58" r="3.5" fill="#6F5430" />
//         <circle cx="110" cy="120" r="4" fill="#6F5430" />
//         <circle cx="75" cy="128" r="3.5" fill="#6F5430" />
//         <circle cx="98" cy="92" r="2.5" fill="#6F5430" />

//         <ellipse
//           cx="72"
//           cy="55"
//           rx="24"
//           ry="12"
//           fill="white"
//           opacity="0.28"
//           transform="rotate(-20 72 55)"
//         />
//       </g>
//     </svg>
//   );
// }

// /* =========================================================
//    FLAVOURS DATA
// ========================================================= */

// const flavours = [
//   {
//     number: "01",
//     name: "Peri Peri",
//     slug: "peri-peri",
//     shortName: "Peri Peri",
//     title: "Peri Peri Roasted Makhana",
//     badge: "FIERY. BOLD. ADDICTIVE.",
//     image: PeriPeri,
//     bg: "#F7E6DE",
//     accent: "#E86B2F",
//     accentSoft: "#F2B08B",
//     description:
//       "Slow-roasted makhanas tossed in a smoky African chilli blend with a citrusy kick. The snack that bites back.",
//   },

//   {
//     number: "02",
//     name: "Cheese",
//     slug: "cheese",
//     shortName: "Cheese",
//     title: "Cheese Roasted Makhana",
//     badge: "RICH. CREAMY. IRRESISTIBLE.",
//     image: Cheese,
//     bg: "#F8F0D9",
//     accent: "#D7A326",
//     accentSoft: "#EBCB73",
//     description:
//       "A luxurious cheese seasoning wrapped around every crunchy bite. Comfort food without the guilt.",
//   },

//   {
//     number: "03",
//     name: "Tangy Tomato",
//     slug: "tangy-tomato",
//     shortName: "Tangy Tomato",
//     title: "Tangy Tomato Roasted Makhana",
//     badge: "ZESTY. TANGY. FUN.",
//     image: Tomato,
//     bg: "#F7E4E0",
//     accent: "#D94E43",
//     accentSoft: "#ECA39D",
//     description:
//       "A punchy blend of ripe tomato, herbs and spices that delivers the perfect sweet-and-tangy balance.",
//   },

//   {
//     number: "04",
//     name: "Pudina",
//     slug: "pudina",
//     shortName: "Pudina",
//     title: "Pudina Roasted Makhana",
//     badge: "FRESH. COOL. CRUNCHY.",
//     image: Pudina,
//     bg: "#E7F0E8",
//     accent: "#3D8C57",
//     accentSoft: "#9BC3A5",
//     description:
//       "Refreshing mint and subtle spices come together for a flavour that feels light, crisp and addictive.",
//   },
// ];

// /* =========================================================
//    COMPONENT
// ========================================================= */

// export default function Flavours() {
//   const sectionRef = useRef(null);

//   const [activeIndex, setActiveIndex] = useState(0);

//   /* =======================================================
//      SCROLL
//   ======================================================= */

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"],
//   });

//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 90,
//     damping: 25,
//     mass: 0.4,
//   });

//   /* =======================================================
//      ORBIT ROTATION
//   ======================================================= */

//   const orbitRotation = useTransform(
//     smoothProgress,
//     [0, 1],
//     [0, -360]
//   );

//   const innerOrbitRotation = useTransform(
//     smoothProgress,
//     [0, 1],
//     [0, 180]
//   );

//   /* =======================================================
//      HEADER MOVEMENT
//   ======================================================= */

//   const headerY = useTransform(
//     smoothProgress,
//     [0, 0.15],
//     [0, -35]
//   );

//   const headerOpacity = useTransform(
//     smoothProgress,
//     [0, 0.12],
//     [1, 0.55]
//   );

//   /* =======================================================
//      ACTIVE FLAVOUR
//   ======================================================= */

//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     const nextIndex = Math.min(
//       flavours.length - 1,
//       Math.floor(latest * flavours.length)
//     );

//     setActiveIndex(nextIndex);
//   });

//   const activeFlavour = flavours[activeIndex];

//   /* =======================================================
//      BACKGROUND
//   ======================================================= */

//   const [background, setBackground] = useState(flavours[0].bg);

//   useEffect(() => {
//     setBackground(activeFlavour.bg);
//   }, [activeFlavour]);

//   /* =======================================================
//      ORBIT MAKHANA POSITIONS
//   ======================================================= */

//   const orbitMakhanaAngles = [0, 72, 144, 216, 288];

//   return (
//     <section
//       ref={sectionRef}
//       className="relative w-full"
//       style={{
//         height: "455vh",
//       }}
//     >
//       {/* =====================================================
//           INTRO / HEADING
//       ===================================================== */}

//       <div
//         className="
//           relative
//           z-20
//           flex
//           min-h-[330px]
//           w-full
//           flex-col
//           items-center
//           justify-center
//           bg-[#F8F5EF]
//           px-5
//           pt-24
//           pb-16
//           text-center

//           sm:min-h-[360px]
//           sm:px-6
//           sm:pt-28
//           sm:pb-20

//           md:min-h-[390px]

//           lg:min-h-[430px]
//           lg:px-8
//           lg:pt-36
//           lg:pb-24
//         "
//       >
//         {/* Small label */}

//         <div
//           className="
//             inline-flex
//             items-center
//             justify-center
//             rounded-full
//             bg-[#EAE5DA]
//             px-5
//             py-2.5
//             text-[9px]
//             font-semibold
//             uppercase
//             tracking-[0.28em]
//             text-[#184C35]

//             sm:px-6
//             sm:text-[10px]
//           "
//         >
//           OUR FLAVOURS
//         </div>

//         {/* Main heading */}

//         <h2
//           className="
//             mt-6
//             max-w-[1000px]
//             text-[2.65rem]
//             leading-[1]
//             tracking-[-0.04em]
//             text-[#184C35]

//             sm:mt-7
//             sm:text-5xl

//             md:text-6xl

//             lg:mt-8
//             lg:text-[76px]
//           "
//           style={{
//             fontFamily: "'Fraunces', Georgia, serif",
//             fontWeight: 500,
//           }}
//         >
//           Crafted for every craving
//         </h2>

//         {/* Subtitle */}

//         <p
//           className="
//             mt-5
//             max-w-[650px]
//             px-2
//             text-sm
//             leading-6
//             text-[#667085]

//             sm:mt-6
//             sm:px-0
//             sm:text-base

//             lg:mt-7
//             lg:text-lg
//           "
//         >
//           Four signature flavours. One impossibly satisfying crunch.
//         </p>
//       </div>

//       {/* =====================================================
//           STICKY FLAVOUR EXPERIENCE
//       ===================================================== */}

//       <div
//         className="
//           sticky
//           top-0
//           flex
//           h-[100svh]
//           min-h-[620px]
//           w-full
//           items-center
//           overflow-hidden

//           lg:min-h-0
//         "
//         style={{
//           background,
//           transition: "background-color 900ms ease",
//         }}
//       >
//         {/* ===================================================
//             AMBIENT BACKGROUND
//         =================================================== */}

//         <motion.div
//           className="pointer-events-none absolute inset-0"
//           animate={{
//             background: `
//               radial-gradient(
//                 circle at 52% 48%,
//                 ${activeFlavour.accentSoft}45 0%,
//                 transparent 34%
//               ),
//               radial-gradient(
//                 circle at 15% 75%,
//                 ${activeFlavour.accentSoft}20 0%,
//                 transparent 30%
//               ),
//               radial-gradient(
//                 circle at 90% 25%,
//                 ${activeFlavour.accentSoft}18 0%,
//                 transparent 28%
//               )
//             `,
//           }}
//           transition={{
//             duration: 1.2,
//             ease: "easeInOut",
//           }}
//         />

//         {/* Grain */}

//         <div
//           className="
//             pointer-events-none
//             absolute
//             inset-0
//             opacity-[0.025]
//             mix-blend-multiply
//           "
//           style={{
//             backgroundImage:
//               "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.35'/%3E%3C/svg%3E\")",
//           }}
//         />

//         {/* ===================================================
//             MAIN CONTAINER
//         =================================================== */}

//         <div
//           className="
//             relative
//             mx-auto
//             flex
//             h-full
//             w-full
//             max-w-[1500px]
//             flex-col
//             px-5
//             pt-16
//             pb-5

//             sm:px-7
//             sm:pt-20

//             md:px-8

//             lg:px-12
//             lg:pt-28
//             lg:pb-0
//           "
//         >
//           {/* =================================================
//               TOP LABEL
//           ================================================= */}

//           <motion.div
//             style={{
//               y: headerY,
//               opacity: headerOpacity,
//             }}
//             className="
//               absolute
//               left-5
//               top-5
//               z-30

//               sm:left-7
//               sm:top-6

//               md:left-8

//               lg:left-12
//               lg:top-10
//             "
//           >
//             {/* <div className="flex items-center gap-3">
//               <span
//                 className="
//                   h-1.5
//                   w-1.5
//                   rounded-full

//                   sm:h-2
//                   sm:w-2
//                 "
//                 style={{
//                   backgroundColor: activeFlavour.accent,
//                 }}
//               />

//               <span
//                 className="
//                   text-[8px]
//                   font-semibold
//                   uppercase
//                   tracking-[0.28em]
//                   text-[#667085]

//                   sm:text-[9px]

//                   lg:text-[10px]
//                   lg:tracking-[0.3em]
//                 "
//               >
//                 PopFresh / Flavours
//               </span>
//             </div> */}
//           </motion.div>

//           {/* =================================================
//               DESKTOP
//           ================================================= */}

//           <div
//             className="
//               relative
//               hidden
//               h-full
//               min-h-[600px]
//               items-center
//               lg:flex
//             "
//           >
//             {/* =================================================
//                 LEFT SIDE
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 z-20
//                 w-[28%]
//                 pr-6

//                 xl:pr-10
//               "
//             >
//               <p
//                 className="
//                   mb-7
//                   text-[10px]
//                   font-semibold
//                   uppercase
//                   tracking-[0.3em]
//                   text-[#7A8493]

//                   xl:mb-8
//                 "
//               >
//                 Choose your mood
//               </p>

//               <div className="space-y-4 xl:space-y-5">
//                 {flavours.map((flavour, index) => {
//                   const isActive = index === activeIndex;

//                   return (
//                     <div
//                       key={flavour.name}
//                       className="
//                         flex
//                         items-center
//                         gap-3
//                         transition-all
//                         duration-500

//                         xl:gap-4
//                       "
//                       style={{
//                         opacity: isActive ? 1 : 0.28,
//                         transform: isActive
//                           ? "translateX(8px)"
//                           : "translateX(0)",
//                       }}
//                     >
//                       <span
//                         className="
//                           w-6
//                           text-[11px]
//                           font-medium

//                           xl:w-7
//                           xl:text-xs
//                         "
//                         style={{
//                           color: isActive
//                             ? activeFlavour.accent
//                             : "#667085",
//                         }}
//                       >
//                         {flavour.number}
//                       </span>

//                       <span
//                         className="
//                           h-px
//                           transition-all
//                           duration-500
//                         "
//                         style={{
//                           backgroundColor: isActive
//                             ? activeFlavour.accent
//                             : "#667085",
//                           width: isActive ? "38px" : "22px",
//                         }}
//                       />

//                       <span
//                         className="
//                           text-xl
//                           transition-colors
//                           duration-500

//                           xl:text-2xl
//                         "
//                         style={{
//                           color: isActive
//                             ? "#184C35"
//                             : "#667085",
//                           fontFamily: "serif",
//                           fontWeight: isActive ? 600 : 400,
//                         }}
//                       >
//                         {flavour.shortName}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Scroll instruction */}

//               <div
//                 className="
//                   mt-14
//                   flex
//                   items-center
//                   gap-4

//                   xl:mt-20
//                 "
//               >
//                 <div
//                   className="h-10 w-px"
//                   style={{
//                     backgroundColor: `${activeFlavour.accent}55`,
//                   }}
//                 />

//                 <p className="text-xs leading-5 text-[#667085]">
//                   Scroll to discover
//                   <br />
//                   every flavour.
//                 </p>
//               </div>
//             </div>

//             {/* =================================================
//                 CENTRE ORBIT
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 flex
//                 h-[560px]
//                 w-[44%]
//                 items-center
//                 justify-center

//                 xl:h-[650px]
//               "
//             >
//               {/* Outer orbit */}

//               <motion.div
//                 className="
//                   absolute
//                   h-[470px]
//                   w-[470px]
//                   rounded-full
//                   border
//                   border-black/[0.09]

//                   xl:h-[560px]
//                   xl:w-[560px]
//                 "
//                 style={{
//                   rotate: orbitRotation,
//                 }}
//               />

//               {/* Inner orbit */}

//               <motion.div
//                 className="
//                   absolute
//                   h-[350px]
//                   w-[350px]
//                   rounded-full
//                   border
//                   border-black/[0.08]

//                   xl:h-[410px]
//                   xl:w-[410px]
//                 "
//                 style={{
//                   rotate: innerOrbitRotation,
//                 }}
//               />

//               {/* Soft glow */}

//               <motion.div
//                 className="
//                   absolute
//                   h-[310px]
//                   w-[310px]
//                   rounded-full
//                   blur-[80px]

//                   xl:h-[390px]
//                   xl:w-[390px]
//                   xl:blur-[95px]
//                 "
//                 animate={{
//                   backgroundColor: `${activeFlavour.accent}25`,
//                 }}
//                 transition={{
//                   duration: 0.9,
//                 }}
//               />

//               {/* =================================================
//                   5 MAKHANAS ON OUTER ORBIT
//               ================================================= */}

//               <motion.div
//                 className="
//                   pointer-events-none
//                   absolute
//                   h-[470px]
//                   w-[470px]

//                   xl:h-[560px]
//                   xl:w-[560px]
//                 "
//                 style={{
//                   rotate: orbitRotation,
//                 }}
//               >
//                 {orbitMakhanaAngles.map((angle, index) => {
//                   return (
//                     <div
//                       key={index}
//                       className="
//                         absolute
//                         left-1/2
//                         top-1/2
//                         flex
//                         items-center
//                         justify-center
//                       "
//                       style={{
//                         width: "52px",
//                         height: "52px",
//                         transform: `
//                           translate(-50%, -50%)
//                           rotate(${angle}deg)
//                           translateY(-235px)
//                         `,
//                       }}
//                     >
//                       <motion.div
//                         animate={{
//                           y: [0, -4, 0],
//                           rotate: [0, 3, 0],
//                         }}
//                         transition={{
//                           duration: 3.5 + index * 0.25,
//                           repeat: Infinity,
//                           ease: "easeInOut",
//                         }}
//                         className="
//                           flex
//                           items-center
//                           justify-center
//                         "
//                       >
//                         <Makhana size={38} />
//                       </motion.div>
//                     </div>
//                   );
//                 })}
//               </motion.div>

//               {/* =================================================
//                   PRODUCT
//               ================================================= */}

//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeFlavour.name}
//                   initial={{
//                     opacity: 0,
//                     scale: 0.88,
//                     y: 25,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     scale: 1,
//                     y: 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     scale: 0.92,
//                     y: -20,
//                   }}
//                   transition={{
//                     duration: 0.65,
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                   className="
//                     relative
//                     z-10
//                     flex
//                     h-[350px]
//                     w-[350px]
//                     items-center
//                     justify-center

//                     xl:h-[430px]
//                     xl:w-[430px]
//                   "
//                 >
//                   <motion.img
//                     src={activeFlavour.image}
//                     alt={activeFlavour.title}
//                     className="
//                       max-h-full
//                       max-w-full
//                       object-contain
//                       drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]
//                     "
//                     animate={{
//                       y: [0, -8, 0],
//                       rotate: [0, 0.7, 0],
//                     }}
//                     transition={{
//                       duration: 5,
//                       repeat: Infinity,
//                       ease: "easeInOut",
//                     }}
//                   />
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* =================================================
//                 RIGHT CONTENT
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 z-20
//                 w-[28%]
//                 pl-6

//                 xl:pl-10
//               "
//             >
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeFlavour.name}
//                   initial={{
//                     opacity: 0,
//                     x: 30,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     x: 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     x: -20,
//                   }}
//                   transition={{
//                     duration: 0.55,
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                 >
//                   {/* Counter */}

//                   <div
//                     className="
//                       mb-5
//                       flex
//                       items-end
//                       justify-between

//                       xl:mb-7
//                     "
//                   >
//                     <span
//                       className="
//                         text-[9px]
//                         font-semibold
//                         uppercase
//                         tracking-[0.25em]

//                         xl:text-[10px]
//                       "
//                       style={{
//                         color: activeFlavour.accent,
//                       }}
//                     >
//                       Flavour
//                     </span>

//                     <span
//                       className="
//                         font-serif
//                         text-3xl
//                         text-[#184C35]/20

//                         xl:text-4xl
//                       "
//                     >
//                       {activeFlavour.number}

//                       <span className="ml-1 text-xs font-sans xl:text-sm">
//                         /04
//                       </span>
//                     </span>
//                   </div>

//                   {/* Badge */}

//                   <span
//                     className="
//                       inline-flex
//                       max-w-full
//                       rounded-full
//                       px-3
//                       py-2
//                       text-[8px]
//                       font-semibold
//                       tracking-[0.15em]
//                       text-white

//                       xl:px-4
//                       xl:text-[10px]
//                       xl:tracking-[0.18em]
//                     "
//                     style={{
//                       backgroundColor: activeFlavour.accent,
//                     }}
//                   >
//                     {activeFlavour.badge}
//                   </span>

//                   {/* Title */}

//                   <h3
//                     className="
//                       mt-5
//                       text-4xl
//                       leading-[0.95]
//                       text-[#184C35]

//                       xl:mt-6
//                       xl:text-5xl

//                       2xl:text-6xl
//                     "
//                     style={{
//                       fontFamily:
//                         "'Fraunces', Georgia, serif",
//                     }}
//                   >
//                     {activeFlavour.name}
//                   </h3>

//                   <p
//                     className="
//                       mt-2
//                       text-lg
//                       text-[#184C35]/55

//                       xl:text-xl
//                     "
//                     style={{
//                       fontFamily: "serif",
//                     }}
//                   >
//                     Roasted Makhana
//                   </p>

//                   {/* Description */}

//                   <p
//                     className="
//                       mt-5
//                       text-[13px]
//                       leading-6
//                       text-[#667085]

//                       xl:mt-7
//                       xl:text-[15px]
//                       xl:leading-7
//                     "
//                   >
//                     {activeFlavour.description}
//                   </p>

//                   {/* Ingredients */}

//                   <div
//                     className="
//                       mt-5
//                       flex
//                       flex-wrap
//                       gap-1.5

//                       xl:mt-7
//                       xl:gap-2
//                     "
//                   >
//                     {[
//                       "Roasted Makhana",
//                       "Iodised Salt",
//                       "Natural Flavours",
//                       "Seasoning",
//                     ].map((ingredient) => (
//                       <span
//                         key={ingredient}
//                         className="
//                           rounded-full
//                           border
//                           border-black/[0.06]
//                           bg-white/55
//                           px-2.5
//                           py-1.5
//                           text-[9px]
//                           font-medium
//                           text-[#184C35]

//                           xl:px-3
//                           xl:py-2
//                           xl:text-[11px]
//                         "
//                       >
//                         {ingredient}
//                       </span>
//                     ))}
//                   </div>

//                   {/* Divider */}

//                   <div
//                     className="
//                       my-5
//                       h-px
//                       bg-black/[0.07]

//                       xl:my-7
//                     "
//                   />

//                   {/* Benefits */}

//                   <div className="flex flex-wrap gap-x-4 gap-y-2 xl:gap-x-5">
//                     {[
//                       "Gluten Free",
//                       "High Source of Fibre",
//                       "Rich in Antioxidants",
//                     ].map((item) => (
//                       <div
//                         key={item}
//                         className="
//                           flex
//                           items-center
//                           gap-2
//                           text-[9px]
//                           font-medium
//                           text-[#184C35]

//                           xl:text-[11px]
//                         "
//                       >
//                         <span
//                           className="h-1.5 w-1.5 rounded-full"
//                           style={{
//                             backgroundColor:
//                               activeFlavour.accent,
//                           }}
//                         />

//                         {item}
//                       </div>
//                     ))}
//                   </div>

//                   {/* CTA */}

//                   <Link
//                     to={`/products/${activeFlavour.slug}`}
//                     className="
//                       group
//                       mt-6
//                       inline-flex
//                       items-center
//                       gap-3
//                       rounded-full
//                       px-6
//                       py-3.5
//                       text-xs
//                       font-semibold
//                       text-white
//                       transition-all
//                       duration-300
//                       hover:-translate-y-1

//                       xl:mt-8
//                       xl:px-7
//                       xl:py-4
//                       xl:text-sm
//                     "
//                     style={{
//                       backgroundColor:
//                         activeFlavour.accent,
//                     }}
//                   >
//                     Shop {activeFlavour.name}

//                     <ArrowUpRight
//                       size={17}
//                       className="
//                         transition-transform
//                         duration-300
//                         group-hover:translate-x-1
//                         group-hover:-translate-y-1
//                       "
//                     />
//                   </Link>
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* =================================================
//               MOBILE + TABLET VERSION
//           ================================================= */}

//           <div
//             className="
//               flex
//               h-full
//               w-full
//               flex-col
//               lg:hidden
//             "
//           >
//             {/* Mobile heading */}

//             <div
//               className="
//                 flex
//                 items-end
//                 justify-between
//                 pt-2

//                 sm:pt-3
//               "
//             >
//               <div>
//                 <p
//                   className="
//                     text-[8px]
//                     font-semibold
//                     uppercase
//                     tracking-[0.28em]
//                     text-[#667085]

//                     sm:text-[9px]
//                   "
//                 >
//                   Our flavours
//                 </p>

//                 <h2
//                   className="
//                     mt-1.5
//                     text-[1.9rem]
//                     leading-none
//                     text-[#184C35]

//                     sm:mt-2
//                     sm:text-4xl
//                   "
//                   style={{
//                     fontFamily:
//                       "'Fraunces', Georgia, serif",
//                   }}
//                 >
//                   Pick your mood.
//                 </h2>
//               </div>

//               <div className="text-right">
//                 <span
//                   className="
//                     font-serif
//                     text-3xl
//                     text-[#184C35]/20

//                     sm:text-4xl
//                   "
//                 >
//                   {activeFlavour.number}
//                 </span>

//                 <span className="text-[10px] text-[#184C35]/40 sm:text-xs">
//                   /04
//                 </span>
//               </div>
//             </div>

//             {/* =================================================
//                 MOBILE ORBIT
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 mx-auto
//                 flex
//                 h-[260px]
//                 w-full
//                 max-w-[390px]
//                 shrink-0
//                 items-center
//                 justify-center

//                 sm:h-[300px]
//                 sm:max-w-[430px]

//                 md:h-[330px]
//                 md:max-w-[500px]
//               "
//             >
//               {/* Outer orbit */}

//               <motion.div
//                 className="
//                   absolute
//                   h-[235px]
//                   w-[235px]
//                   rounded-full
//                   border
//                   border-black/[0.08]

//                   sm:h-[275px]
//                   sm:w-[275px]

//                   md:h-[300px]
//                   md:w-[300px]
//                 "
//                 style={{
//                   rotate: orbitRotation,
//                 }}
//               />

//               {/* Inner orbit */}

//               <motion.div
//                 className="
//                   absolute
//                   h-[165px]
//                   w-[165px]
//                   rounded-full
//                   border
//                   border-black/[0.06]

//                   sm:h-[195px]
//                   sm:w-[195px]

//                   md:h-[215px]
//                   md:w-[215px]
//                 "
//               />

//               {/* Glow */}

//               <motion.div
//                 className="
//                   absolute
//                   h-40
//                   w-40
//                   rounded-full
//                   blur-[50px]

//                   sm:h-48
//                   sm:w-48
//                   sm:blur-[60px]
//                 "
//                 animate={{
//                   backgroundColor:
//                     `${activeFlavour.accent}30`,
//                 }}
//               />

//               {/* =================================================
//                   5 MOBILE MAKHANAS
//               ================================================= */}

//               <motion.div
//                 className="
//                   pointer-events-none
//                   absolute
//                   h-[235px]
//                   w-[235px]

//                   sm:h-[275px]
//                   sm:w-[275px]

//                   md:h-[300px]
//                   md:w-[300px]
//                 "
//                 style={{
//                   rotate: orbitRotation,
//                 }}
//               >
//                 {orbitMakhanaAngles.map((angle, index) => (
//                   <div
//                     key={index}
//                     className="
//                       absolute
//                       left-1/2
//                       top-1/2
//                       flex
//                       items-center
//                       justify-center
//                     "
//                     style={{
//                       width: "42px",
//                       height: "42px",
//                       transform: `
//                         translate(-50%, -50%)
//                         rotate(${angle}deg)
//                         translateY(-117px)
//                       `,
//                     }}
//                   >
//                     <motion.div
//                       animate={{
//                         y: [0, -3, 0],
//                       }}
//                       transition={{
//                         duration: 3 + index * 0.2,
//                         repeat: Infinity,
//                         ease: "easeInOut",
//                       }}
//                     >
//                       <Makhana
//                         size={28}
//                       />
//                     </motion.div>
//                   </div>
//                 ))}
//               </motion.div>

//               {/* Product */}

//               <AnimatePresence mode="wait">
//                 <motion.img
//                   key={activeFlavour.name}
//                   src={activeFlavour.image}
//                   alt={activeFlavour.title}
//                   initial={{
//                     opacity: 0,
//                     scale: 0.85,
//                     y: 20,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     scale: 1,
//                     y: 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     scale: 0.9,
//                     y: -15,
//                   }}
//                   transition={{
//                     duration: 0.55,
//                   }}
//                   className="
//                     relative
//                     z-10
//                     h-[210px]
//                     w-[210px]
//                     object-contain
//                     drop-shadow-[0_25px_25px_rgba(0,0,0,0.14)]

//                     sm:h-[245px]
//                     sm:w-[245px]

//                     md:h-[270px]
//                     md:w-[270px]
//                   "
//                 />
//               </AnimatePresence>
//             </div>

//             {/* Mobile selector */}

//             <div
//               className="
//                 mt-1
//                 flex
//                 shrink-0
//                 justify-center
//                 gap-2

//                 sm:mt-2
//                 md:mt-3
//               "
//             >
//               {flavours.map((flavour, index) => (
//                 <div
//                   key={flavour.name}
//                   className="
//                     h-1
//                     rounded-full
//                     transition-all
//                     duration-500
//                   "
//                   style={{
//                     width:
//                       index === activeIndex
//                         ? "30px"
//                         : "9px",
//                     backgroundColor:
//                       index === activeIndex
//                         ? activeFlavour.accent
//                         : "#184C35",
//                     opacity:
//                       index === activeIndex
//                         ? 1
//                         : 0.15,
//                   }}
//                 />
//               ))}
//             </div>

//             {/* =================================================
//                 MOBILE CONTENT
//             ================================================= */}

//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeFlavour.name}
//                 initial={{
//                   opacity: 0,
//                   y: 20,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 exit={{
//                   opacity: 0,
//                   y: -15,
//                 }}
//                 transition={{
//                   duration: 0.5,
//                 }}
//                 className="
//                   mt-4
//                   min-h-0
//                   flex-1
//                   overflow-y-auto
//                   pb-3
//                   [scrollbar-width:none]
//                   [&::-webkit-scrollbar]:hidden

//                   sm:mt-5
//                   md:mt-6
//                 "
//               >
//                 {/* Badge */}

//                 <span
//                   className="
//                     inline-flex
//                     max-w-full
//                     rounded-full
//                     px-3
//                     py-1.5
//                     text-[8px]
//                     font-semibold
//                     tracking-[0.15em]
//                     text-white

//                     sm:px-4
//                     sm:py-2
//                     sm:text-[9px]
//                     sm:tracking-[0.18em]
//                   "
//                   style={{
//                     backgroundColor:
//                       activeFlavour.accent,
//                   }}
//                 >
//                   {activeFlavour.badge}
//                 </span>

//                 {/* Title */}

//                 <h3
//                   className="
//                     mt-4
//                     text-[2.45rem]
//                     leading-[0.95]
//                     text-[#184C35]

//                     sm:mt-5
//                     sm:text-5xl

//                     md:text-[3.25rem]
//                   "
//                   style={{
//                     fontFamily:
//                       "'Fraunces', Georgia, serif",
//                   }}
//                 >
//                   {activeFlavour.name}
//                 </h3>

//                 <p
//                   className="
//                     mt-1.5
//                     text-lg
//                     text-[#184C35]/50

//                     sm:mt-2
//                     sm:text-xl
//                   "
//                   style={{
//                     fontFamily: "serif",
//                   }}
//                 >
//                   Roasted Makhana
//                 </p>

//                 {/* Description */}

//                 <p
//                   className="
//                     mt-4
//                     max-w-[650px]
//                     text-[13px]
//                     leading-6
//                     text-[#667085]

//                     sm:mt-5
//                     sm:text-[15px]
//                     sm:leading-7
//                   "
//                 >
//                   {activeFlavour.description}
//                 </p>

//                 {/* Ingredients */}

//                 <div
//                   className="
//                     mt-4
//                     flex
//                     flex-wrap
//                     gap-1.5

//                     sm:mt-6
//                     sm:gap-2
//                   "
//                 >
//                   {[
//                     "Roasted Makhana",
//                     "Iodised Salt",
//                     "Natural Flavours",
//                     "Seasoning",
//                   ].map((ingredient) => (
//                     <span
//                       key={ingredient}
//                       className="
//                         rounded-full
//                         bg-white/60
//                         px-2.5
//                         py-1.5
//                         text-[9px]
//                         font-medium
//                         text-[#184C35]

//                         sm:px-3
//                         sm:py-2
//                         sm:text-[10px]
//                       "
//                     >
//                       {ingredient}
//                     </span>
//                   ))}
//                 </div>

//                 {/* CTA */}

//                 <Link
//                   to={`/products/${activeFlavour.slug}`}
//                   className="
//                     group
//                     mt-5
//                     flex
//                     w-full
//                     items-center
//                     justify-center
//                     gap-3
//                     rounded-full
//                     px-6
//                     py-3.5
//                     text-xs
//                     font-semibold
//                     text-white

//                     sm:mt-7
//                     sm:py-4
//                     sm:text-sm
//                   "
//                   style={{
//                     backgroundColor:
//                       activeFlavour.accent,
//                   }}
//                 >
//                   Shop {activeFlavour.name}

//                   <ArrowUpRight
//                     size={17}
//                     className="
//                       transition-transform
//                       duration-300
//                       group-hover:translate-x-1
//                       group-hover:-translate-y-1
//                     "
//                   />
//                 </Link>
//               </motion.div>
//             </AnimatePresence>

//             {/* Mobile scroll hint */}

//             <div
//               className="
//                 flex
//                 shrink-0
//                 items-center
//                 justify-center
//                 gap-3
//                 pb-1
//                 pt-2

//                 sm:pt-3
//               "
//             >
//               <ChevronDown
//                 size={14}
//                 className="animate-bounce text-[#184C35]/40"
//               />

//               <span
//                 className="
//                   text-[8px]
//                   font-semibold
//                   uppercase
//                   tracking-[0.25em]
//                   text-[#667085]

//                   sm:text-[9px]
//                 "
//               >
//                 Keep scrolling
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* ===================================================
//             DESKTOP BOTTOM SCROLL INDICATOR
//         =================================================== */}

//         <div
//           className="
//             absolute
//             bottom-5
//             left-1/2
//             hidden
//             -translate-x-1/2
//             items-center
//             gap-3

//             lg:flex
//           "
//         >
//           <span
//             className="
//               text-[9px]
//               font-semibold
//               uppercase
//               tracking-[0.3em]
//               text-[#667085]
//             "
//           >
//             Scroll to explore
//           </span>

//           <div
//             className="
//               flex
//               h-8
//               w-8
//               items-center
//               justify-center
//               rounded-full
//               border
//               border-black/[0.1]
//             "
//           >
//             <ChevronDown
//               size={14}
//               className="animate-bounce text-[#184C35]"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// import { useEffect, useRef, useState } from "react";

// import {
//   motion,
//   AnimatePresence,
//   useMotionValueEvent,
//   useScroll,
//   useSpring,
//   useTransform,
// } from "framer-motion";

// import { ArrowUpRight, ChevronDown } from "lucide-react";
// import { Link } from "react-router-dom";

// import PeriPeri from "../assets/popFresh_periPeri.png";
// import Cheese from "../assets/popFresh_cheese.png";
// import Tomato from "../assets/popFresh_tangyTomato.png";
// import Pudina from "../assets/popFresh_pudina.png";

// /* =========================================================
//    MAKHANA SVG
// ========================================================= */

// function Makhana({ size = 40 }) {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 200 200"
//       xmlns="http://www.w3.org/2000/svg"
//       style={{ overflow: "visible" }}
//     >
//       <defs>
//         <linearGradient
//           id="makhanaGradient"
//           x1="0"
//           y1="0"
//           x2="1"
//           y2="1"
//         >
//           <stop offset="0%" stopColor="#FFF1C9" />
//           <stop offset="45%" stopColor="#E8C47B" />
//           <stop offset="100%" stopColor="#C99B4D" />
//         </linearGradient>

//         <filter id="makhanaShadow">
//           <feDropShadow
//             dx="0"
//             dy="6"
//             stdDeviation="6"
//             floodOpacity="0.15"
//           />
//         </filter>
//       </defs>

//       <g filter="url(#makhanaShadow)">
//         <path
//           d="
//             M100 20
//             C138 15 172 40 180 78
//             C189 118 166 156 130 174
//             C96 191 54 178 29 144
//             C8 115 8 72 35 42
//             C52 24 76 17 100 20Z
//           "
//           fill="url(#makhanaGradient)"
//         />

//         <circle cx="65" cy="65" r="4" fill="#6F5430" />
//         <circle cx="135" cy="58" r="3.5" fill="#6F5430" />
//         <circle cx="110" cy="120" r="4" fill="#6F5430" />
//         <circle cx="75" cy="128" r="3.5" fill="#6F5430" />
//         <circle cx="98" cy="92" r="2.5" fill="#6F5430" />

//         <ellipse
//           cx="72"
//           cy="55"
//           rx="24"
//           ry="12"
//           fill="white"
//           opacity="0.28"
//           transform="rotate(-20 72 55)"
//         />
//       </g>
//     </svg>
//   );
// }

// /* =========================================================
//    FLAVOURS DATA
// ========================================================= */

// const flavours = [
//   {
//     number: "01",
//     name: "Peri Peri",
//     slug: "peri-peri",
//     shortName: "Peri Peri",
//     title: "Peri Peri Roasted Makhana",
//     badge: "FIERY. BOLD. ADDICTIVE.",
//     image: PeriPeri,
//     bg: "#F7E6DE",
//     accent: "#E86B2F",
//     accentSoft: "#F2B08B",
//     description:
//       "Slow-roasted makhanas tossed in a smoky African chilli blend with a citrusy kick. The snack that bites back.",
//   },
//   {
//     number: "02",
//     name: "Cheese",
//     slug: "cheese",
//     shortName: "Cheese",
//     title: "Cheese Roasted Makhana",
//     badge: "RICH. CREAMY. IRRESISTIBLE.",
//     image: Cheese,
//     bg: "#F8F0D9",
//     accent: "#D7A326",
//     accentSoft: "#EBCB73",
//     description:
//       "A luxurious cheese seasoning wrapped around every crunchy bite. Comfort food without the guilt.",
//   },
//   {
//     number: "03",
//     name: "Tangy Tomato",
//     slug: "tangy-tomato",
//     shortName: "Tangy Tomato",
//     title: "Tangy Tomato Roasted Makhana",
//     badge: "ZESTY. TANGY. FUN.",
//     image: Tomato,
//     bg: "#F7E4E0",
//     accent: "#D94E43",
//     accentSoft: "#ECA39D",
//     description:
//       "A punchy blend of ripe tomato, herbs and spices that delivers the perfect sweet-and-tangy balance.",
//   },
//   {
//     number: "04",
//     name: "Pudina",
//     slug: "pudina",
//     shortName: "Pudina",
//     title: "Pudina Roasted Makhana",
//     badge: "FRESH. COOL. CRUNCHY.",
//     image: Pudina,
//     bg: "#E7F0E8",
//     accent: "#3D8C57",
//     accentSoft: "#9BC3A5",
//     description:
//       "Refreshing mint and subtle spices come together for a flavour that feels light, crisp and addictive.",
//   },
// ];

// /* =========================================================
//    COMPONENT
// ========================================================= */

// export default function Flavours() {
//   const sectionRef = useRef(null);

//   const [activeIndex, setActiveIndex] = useState(0);

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"],
//   });

//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 90,
//     damping: 25,
//     mass: 0.4,
//   });

//   /* Main orbit rotation */

//   const orbitRotation = useTransform(
//     smoothProgress,
//     [0, 1],
//     [0, -360]
//   );

//   /* Small header movement */

//   const headerY = useTransform(
//     smoothProgress,
//     [0, 0.15],
//     [0, -35]
//   );

//   const headerOpacity = useTransform(
//     smoothProgress,
//     [0, 0.12],
//     [1, 0.55]
//   );

//   /* =========================================================
//      ACTIVE FLAVOUR
//   ========================================================= */

//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     const nextIndex = Math.min(
//       flavours.length - 1,
//       Math.floor(latest * flavours.length)
//     );

//     setActiveIndex(nextIndex);
//   });

//   const activeFlavour = flavours[activeIndex];

//   /* =========================================================
//      BACKGROUND
//   ========================================================= */

//   const [background, setBackground] = useState(flavours[0].bg);

//   useEffect(() => {
//     setBackground(activeFlavour.bg);
//   }, [activeFlavour]);

//   /* =========================================================
//      ORBIT MAKHANA POSITIONS

//      Exactly 5 makhanas.

//      These are positioned ON the orbit line.
//   ========================================================= */

//   const orbitMakhanaAngles = [0, 72, 144, 216, 288];

//   return (
//     <section
//       ref={sectionRef}
//       className="relative w-full"
//       style={{
//         height: "455vh",
//       }}
//     >
//       {/* =====================================================
//           INTRO / HEADING

//           This stays OUTSIDE the sticky flavour stage.
//       ===================================================== */}

//       <div
//         className="
//           relative
//           z-20
//           flex
//           min-h-[390px]
//           w-full
//           flex-col
//           items-center
//           justify-center
//           bg-[#F8F5EF]
//           px-6
//           pt-28
//           pb-20
//           text-center
//           lg:min-h-[430px]
//           lg:pt-36
//           lg:pb-24
//         "
//       >
//         {/* Small label */}

//         <div
//           className="
//             inline-flex
//             items-center
//             justify-center
//             rounded-full
//             bg-[#EAE5DA]
//             px-6
//             py-2.5
//             text-[9px]
//             font-semibold
//             uppercase
//             tracking-[0.28em]
//             text-[#184C35]
//             sm:text-[10px]
//           "
//         >
//           OUR FLAVOURS
//         </div>

//         {/* Main heading */}

//         <h2
//           className="
//             mt-7
//             max-w-[1000px]
//             text-4xl
//             leading-[1]
//             tracking-[-0.03em]
//             text-[#184C35]
//             sm:text-5xl
//             md:text-6xl
//             lg:mt-8
//             lg:text-[76px]
//           "
//           style={{
//             fontFamily: "'Fraunces', Georgia, serif",
//             fontWeight: 500,
//           }}
//         >
//           Crafted for every craving
//         </h2>

//         {/* Subtitle */}

//         <p
//           className="
//             mt-6
//             max-w-[650px]
//             text-sm
//             leading-6
//             text-[#667085]
//             sm:text-base
//             lg:mt-7
//             lg:text-lg
//           "
//         >
//           Four signature flavours. One impossibly satisfying crunch.
//         </p>
//       </div>

//       {/* =====================================================
//           STICKY FLAVOUR EXPERIENCE
//       ===================================================== */}

//       <div
//         className="
//           sticky
//           top-0
//           flex
//           h-screen
//           w-full
//           items-center
//           overflow-hidden
//         "
//         style={{
//           background,
//           transition: "background-color 900ms ease",
//         }}
//       >
//         {/* ===================================================
//             AMBIENT BACKGROUND
//         =================================================== */}

//         <motion.div
//           className="pointer-events-none absolute inset-0"
//           animate={{
//             background: `
//               radial-gradient(
//                 circle at 52% 48%,
//                 ${activeFlavour.accentSoft}45 0%,
//                 transparent 34%
//               ),
//               radial-gradient(
//                 circle at 15% 75%,
//                 ${activeFlavour.accentSoft}20 0%,
//                 transparent 30%
//               ),
//               radial-gradient(
//                 circle at 90% 25%,
//                 ${activeFlavour.accentSoft}18 0%,
//                 transparent 28%
//               )
//             `,
//           }}
//           transition={{
//             duration: 1.2,
//             ease: "easeInOut",
//           }}
//         />

//         {/* Grain */}

//         <div
//           className="
//             pointer-events-none
//             absolute
//             inset-0
//             opacity-[0.025]
//             mix-blend-multiply
//           "
//           style={{
//             backgroundImage:
//               "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.35'/%3E%3C/svg%3E\")",
//           }}
//         />

//         {/* ===================================================
//             DESKTOP CONTAINER
//         =================================================== */}

//         <div
//           className="
//             relative
//             mx-auto
//             w-full
//             max-w-[1500px]
//             px-6
//             pt-20
//             sm:px-8
//             lg:px-12
//             lg:pt-28
//           "
//         >
//           {/* =================================================
//               TOP LABEL
//           ================================================= */}

//           <motion.div
//             style={{
//               y: headerY,
//               opacity: headerOpacity,
//             }}
//             className="
//               absolute
//               left-6
//               top-6
//               z-30
//               sm:left-8
//               lg:left-12
//               lg:top-10
//             "
//           >
//             <div className="flex items-center gap-3">
//               <span
//                 className="h-2 w-2 rounded-full"
//                 style={{
//                   backgroundColor: activeFlavour.accent,
//                 }}
//               />

//               <span
//                 className="
//                   text-[9px]
//                   font-semibold
//                   uppercase
//                   tracking-[0.3em]
//                   text-[#667085]
//                   sm:text-[10px]
//                 "
//               >
//                 PopFresh / Flavours
//               </span>
//             </div>
//           </motion.div>

//           {/* =================================================
//               DESKTOP
//           ================================================= */}

//           <div
//             className="
//               relative
//               hidden
//               min-h-[650px]
//               items-center
//               lg:flex
//             "
//           >
//             {/* =================================================
//                 LEFT SIDE
//             ================================================= */}

//             <div className="relative z-20 w-[28%] pr-10">
//               <p
//                 className="
//                   mb-8
//                   text-[10px]
//                   font-semibold
//                   uppercase
//                   tracking-[0.3em]
//                   text-[#7A8493]
//                 "
//               >
//                 Choose your mood
//               </p>

//               <div className="space-y-5">
//                 {flavours.map((flavour, index) => {
//                   const isActive = index === activeIndex;

//                   return (
//                     <div
//                       key={flavour.name}
//                       className="
//                         flex
//                         items-center
//                         gap-4
//                         transition-all
//                         duration-500
//                       "
//                       style={{
//                         opacity: isActive ? 1 : 0.28,
//                         transform: isActive
//                           ? "translateX(8px)"
//                           : "translateX(0)",
//                       }}
//                     >
//                       <span
//                         className="w-7 text-xs font-medium"
//                         style={{
//                           color: isActive
//                             ? activeFlavour.accent
//                             : "#667085",
//                         }}
//                       >
//                         {flavour.number}
//                       </span>

//                       <span
//                         className="h-px transition-all duration-500"
//                         style={{
//                           backgroundColor: isActive
//                             ? activeFlavour.accent
//                             : "#667085",
//                           width: isActive ? "42px" : "24px",
//                         }}
//                       />

//                       <span
//                         className="
//                           text-2xl
//                           transition-colors
//                           duration-500
//                         "
//                         style={{
//                           color: isActive
//                             ? "#184C35"
//                             : "#667085",
//                           fontFamily: "serif",
//                           fontWeight: isActive ? 600 : 400,
//                         }}
//                       >
//                         {flavour.shortName}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Scroll instruction */}

//               <div className="mt-20 flex items-center gap-4">
//                 <div
//                   className="h-10 w-px"
//                   style={{
//                     backgroundColor: `${activeFlavour.accent}55`,
//                   }}
//                 />

//                 <p className="text-xs leading-5 text-[#667085]">
//                   Scroll to discover
//                   <br />
//                   every flavour.
//                 </p>
//               </div>
//             </div>

//             {/* =================================================
//                 CENTRE ORBIT
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 flex
//                 h-[650px]
//                 w-[44%]
//                 items-center
//                 justify-center
//               "
//             >
//               {/* Outer orbit */}

//               <motion.div
//                 className="
//                   absolute
//                   h-[560px]
//                   w-[560px]
//                   rounded-full
//                   border
//                   border-black/[0.09]
//                 "
//                 style={{
//                   rotate: orbitRotation,
//                 }}
//               />

//               {/* Inner orbit */}

//               <motion.div
//                 className="
//                   absolute
//                   h-[410px]
//                   w-[410px]
//                   rounded-full
//                   border
//                   border-black/[0.08]
//                 "
//                 style={{
//                   rotate: useTransform(
//                     smoothProgress,
//                     [0, 1],
//                     [0, 180]
//                   ),
//                 }}
//               />

//               {/* Soft glow */}

//               <motion.div
//                 className="
//                   absolute
//                   h-[390px]
//                   w-[390px]
//                   rounded-full
//                   blur-[95px]
//                 "
//                 animate={{
//                   backgroundColor: `${activeFlavour.accent}25`,
//                 }}
//                 transition={{
//                   duration: 0.9,
//                 }}
//               />

//               {/* =================================================
//                   5 MAKHANAS ON OUTER ORBIT
//               ================================================= */}

//               <motion.div
//                 className="
//                   pointer-events-none
//                   absolute
//                   h-[560px]
//                   w-[560px]
//                 "
//                 style={{
//                   rotate: orbitRotation,
//                 }}
//               >
//                 {orbitMakhanaAngles.map((angle, index) => {
//                   return (
//                     <div
//                       key={index}
//                       className="
//                         absolute
//                         left-1/2
//                         top-1/2
//                         flex
//                         items-center
//                         justify-center
//                       "
//                       style={{
//                         width: "52px",
//                         height: "52px",
//                         transform: `
//                           translate(-50%, -50%)
//                           rotate(${angle}deg)
//                           translateY(-280px)
//                         `,
//                       }}
//                     >
//                       {/* NO WHITE CIRCLE HERE */}

//                       <motion.div
//                         animate={{
//                           y: [0, -4, 0],
//                           rotate: [0, 3, 0],
//                         }}
//                         transition={{
//                           duration: 3.5 + index * 0.25,
//                           repeat: Infinity,
//                           ease: "easeInOut",
//                         }}
//                         className="
//                           flex
//                           items-center
//                           justify-center
//                         "
//                       >
//                         <Makhana size={42} />
//                       </motion.div>
//                     </div>
//                   );
//                 })}
//               </motion.div>

//               {/* =================================================
//                   PRODUCT
//               ================================================= */}

//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeFlavour.name}
//                   initial={{
//                     opacity: 0,
//                     scale: 0.88,
//                     y: 25,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     scale: 1,
//                     y: 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     scale: 0.92,
//                     y: -20,
//                   }}
//                   transition={{
//                     duration: 0.65,
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                   className="
//                     relative
//                     z-10
//                     flex
//                     h-[430px]
//                     w-[430px]
//                     items-center
//                     justify-center
//                   "
//                 >
//                   <motion.img
//                     src={activeFlavour.image}
//                     alt={activeFlavour.title}
//                     className="
//                       max-h-full
//                       max-w-full
//                       object-contain
//                       drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]
//                     "
//                     animate={{
//                       y: [0, -8, 0],
//                       rotate: [0, 0.7, 0],
//                     }}
//                     transition={{
//                       duration: 5,
//                       repeat: Infinity,
//                       ease: "easeInOut",
//                     }}
//                   />
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* =================================================
//                 RIGHT CONTENT
//             ================================================= */}

//             <div className="relative z-20 w-[28%] pl-10">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeFlavour.name}
//                   initial={{
//                     opacity: 0,
//                     x: 30,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     x: 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     x: -20,
//                   }}
//                   transition={{
//                     duration: 0.55,
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                 >
//                   {/* Counter */}

//                   <div className="mb-7 flex items-end justify-between">
//                     <span
//                       className="
//                         text-[10px]
//                         font-semibold
//                         uppercase
//                         tracking-[0.25em]
//                       "
//                       style={{
//                         color: activeFlavour.accent,
//                       }}
//                     >
//                       Flavour
//                     </span>

//                     <span className="font-serif text-4xl text-[#184C35]/20">
//                       {activeFlavour.number}

//                       <span className="ml-1 text-sm font-sans">
//                         /04
//                       </span>
//                     </span>
//                   </div>

//                   {/* Badge */}

//                   <span
//                     className="
//                       inline-flex
//                       rounded-full
//                       px-4
//                       py-2
//                       text-[10px]
//                       font-semibold
//                       tracking-[0.18em]
//                       text-white
//                     "
//                     style={{
//                       backgroundColor:
//                         activeFlavour.accent,
//                     }}
//                   >
//                     {activeFlavour.badge}
//                   </span>

//                   {/* Title */}

//                   <h3
//                     className="
//                       mt-6
//                       text-5xl
//                       leading-[0.95]
//                       text-[#184C35]
//                       xl:text-6xl
//                     "
//                     style={{
//                       fontFamily: "'Fraunces', Georgia, serif",
//                     }}
//                   >
//                     {activeFlavour.name}
//                   </h3>

//                   <p
//                     className="
//                       mt-2
//                       text-xl
//                       text-[#184C35]/55
//                     "
//                     style={{
//                       fontFamily: "serif",
//                     }}
//                   >
//                     Roasted Makhana
//                   </p>

//                   {/* Description */}

//                   <p className="mt-7 text-[15px] leading-7 text-[#667085]">
//                     {activeFlavour.description}
//                   </p>

//                   {/* Ingredients */}

//                   <div className="mt-7 flex flex-wrap gap-2">
//                     {[
//                       "Roasted Makhana",
//                       "Iodised Salt",
//                       "Natural Flavours",
//                       "Seasoning",
//                     ].map((ingredient) => (
//                       <span
//                         key={ingredient}
//                         className="
//                           rounded-full
//                           border
//                           border-black/[0.06]
//                           bg-white/55
//                           px-3
//                           py-2
//                           text-[11px]
//                           font-medium
//                           text-[#184C35]
//                         "
//                       >
//                         {ingredient}
//                       </span>
//                     ))}
//                   </div>

//                   {/* Divider */}

//                   <div className="my-7 h-px bg-black/[0.07]" />

//                   {/* Benefits */}

//                   <div className="flex flex-wrap gap-x-5 gap-y-2">
//                     {[
//                       "Gluten Free",
//                       "High Source of Fibre",
//                       "Rich in Antioxidants",
//                     ].map((item) => (
//                       <div
//                         key={item}
//                         className="
//                           flex
//                           items-center
//                           gap-2
//                           text-[11px]
//                           font-medium
//                           text-[#184C35]
//                         "
//                       >
//                         <span
//                           className="h-1.5 w-1.5 rounded-full"
//                           style={{
//                             backgroundColor:
//                               activeFlavour.accent,
//                           }}
//                         />

//                         {item}
//                       </div>
//                     ))}
//                   </div>

//                   {/* CTA */}

//                   <Link
//                     to={`/products/${activeFlavour.slug}`}
//                     className="
//                       group
//                       mt-8
//                       inline-flex
//                       items-center
//                       gap-3
//                       rounded-full
//                       px-7
//                       py-4
//                       text-sm
//                       font-semibold
//                       text-white
//                       transition-all
//                       duration-300
//                       hover:-translate-y-1
//                     "
//                     style={{
//                       backgroundColor:
//                         activeFlavour.accent,
//                     }}
//                   >
//                     Shop {activeFlavour.name}

//                     <ArrowUpRight
//                       size={17}
//                       className="
//                         transition-transform
//                         duration-300
//                         group-hover:translate-x-1
//                         group-hover:-translate-y-1
//                       "
//                     />
//                   </Link>
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* =================================================
//               MOBILE VERSION
//           ================================================= */}

//           <div className="lg:hidden">
//             <div className="pt-4">
//               {/* Mobile heading */}

//               <div className="mb-8 flex items-end justify-between">
//                 <div>
//                   <p
//                     className="
//                       text-[9px]
//                       font-semibold
//                       uppercase
//                       tracking-[0.28em]
//                       text-[#667085]
//                     "
//                   >
//                     Our flavours
//                   </p>

//                   <h2
//                     className="
//                       mt-2
//                       text-4xl
//                       leading-none
//                       text-[#184C35]
//                     "
//                     style={{
//                       fontFamily: "'Fraunces', Georgia, serif",
//                     }}
//                   >
//                     Pick your mood.
//                   </h2>
//                 </div>

//                 <div className="text-right">
//                   <span
//                     className="
//                       font-serif
//                       text-4xl
//                       text-[#184C35]/20
//                     "
//                   >
//                     {activeFlavour.number}
//                   </span>

//                   <span className="text-xs text-[#184C35]/40">
//                     /04
//                   </span>
//                 </div>
//               </div>

//               {/* Mobile orbit */}

//               <div
//                 className="
//                   relative
//                   mx-auto
//                   flex
//                   h-[330px]
//                   w-full
//                   max-w-[390px]
//                   items-center
//                   justify-center
//                 "
//               >
//                 {/* Outer orbit */}

//                 <motion.div
//                   className="
//                     absolute
//                     h-[300px]
//                     w-[300px]
//                     rounded-full
//                     border
//                     border-black/[0.08]
//                   "
//                   style={{
//                     rotate: orbitRotation,
//                   }}
//                 />

//                 {/* Inner orbit */}

//                 <div
//                   className="
//                     absolute
//                     h-[215px]
//                     w-[215px]
//                     rounded-full
//                     border
//                     border-black/[0.06]
//                   "
//                 />

//                 {/* Glow */}

//                 <motion.div
//                   className="
//                     absolute
//                     h-52
//                     w-52
//                     rounded-full
//                     blur-[60px]
//                   "
//                   animate={{
//                     backgroundColor:
//                       `${activeFlavour.accent}30`,
//                   }}
//                 />

//                 {/* 5 mobile makhanas */}

//                 <motion.div
//                   className="
//                     pointer-events-none
//                     absolute
//                     h-[300px]
//                     w-[300px]
//                   "
//                   style={{
//                     rotate: orbitRotation,
//                   }}
//                 >
//                   {orbitMakhanaAngles.map((angle, index) => (
//                     <div
//                       key={index}
//                       className="
//                         absolute
//                         left-1/2
//                         top-1/2
//                         flex
//                         items-center
//                         justify-center
//                       "
//                       style={{
//                         width: "42px",
//                         height: "42px",
//                         transform: `
//                           translate(-50%, -50%)
//                           rotate(${angle}deg)
//                           translateY(-150px)
//                         `,
//                       }}
//                     >
//                       <motion.div
//                         animate={{
//                           y: [0, -3, 0],
//                         }}
//                         transition={{
//                           duration: 3 + index * 0.2,
//                           repeat: Infinity,
//                           ease: "easeInOut",
//                         }}
//                       >
//                         <Makhana size={32} />
//                       </motion.div>
//                     </div>
//                   ))}
//                 </motion.div>

//                 {/* Product */}

//                 <AnimatePresence mode="wait">
//                   <motion.img
//                     key={activeFlavour.name}
//                     src={activeFlavour.image}
//                     alt={activeFlavour.title}
//                     initial={{
//                       opacity: 0,
//                       scale: 0.85,
//                       y: 20,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       scale: 1,
//                       y: 0,
//                     }}
//                     exit={{
//                       opacity: 0,
//                       scale: 0.9,
//                       y: -15,
//                     }}
//                     transition={{
//                       duration: 0.55,
//                     }}
//                     className="
//                       relative
//                       z-10
//                       h-[270px]
//                       w-[270px]
//                       object-contain
//                       drop-shadow-[0_25px_25px_rgba(0,0,0,0.14)]
//                     "
//                   />
//                 </AnimatePresence>
//               </div>

//               {/* Mobile selector */}

//               <div className="mt-7 flex justify-center gap-2">
//                 {flavours.map((flavour, index) => (
//                   <div
//                     key={flavour.name}
//                     className="
//                       h-1
//                       rounded-full
//                       transition-all
//                       duration-500
//                     "
//                     style={{
//                       width:
//                         index === activeIndex
//                           ? "34px"
//                           : "10px",
//                       backgroundColor:
//                         index === activeIndex
//                           ? activeFlavour.accent
//                           : "#184C35",
//                       opacity:
//                         index === activeIndex
//                           ? 1
//                           : 0.15,
//                     }}
//                   />
//                 ))}
//               </div>

//               {/* Mobile content */}

//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeFlavour.name}
//                   initial={{
//                     opacity: 0,
//                     y: 20,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     y: 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     y: -15,
//                   }}
//                   transition={{
//                     duration: 0.5,
//                   }}
//                   className="mt-8"
//                 >
//                   <span
//                     className="
//                       inline-flex
//                       rounded-full
//                       px-4
//                       py-2
//                       text-[9px]
//                       font-semibold
//                       tracking-[0.18em]
//                       text-white
//                     "
//                     style={{
//                       backgroundColor:
//                         activeFlavour.accent,
//                     }}
//                   >
//                     {activeFlavour.badge}
//                   </span>

//                   <h3
//                     className="
//                       mt-5
//                       text-5xl
//                       leading-[0.95]
//                       text-[#184C35]
//                     "
//                     style={{
//                       fontFamily: "'Fraunces', Georgia, serif",
//                     }}
//                   >
//                     {activeFlavour.name}
//                   </h3>

//                   <p
//                     className="
//                       mt-2
//                       text-xl
//                       text-[#184C35]/50
//                     "
//                     style={{
//                       fontFamily: "serif",
//                     }}
//                   >
//                     Roasted Makhana
//                   </p>

//                   <p
//                     className="
//                       mt-5
//                       text-[15px]
//                       leading-7
//                       text-[#667085]
//                     "
//                   >
//                     {activeFlavour.description}
//                   </p>

//                   {/* Ingredients */}

//                   <div className="mt-6 flex flex-wrap gap-2">
//                     {[
//                       "Roasted Makhana",
//                       "Iodised Salt",
//                       "Natural Flavours",
//                       "Seasoning",
//                     ].map((ingredient) => (
//                       <span
//                         key={ingredient}
//                         className="
//                           rounded-full
//                           bg-white/60
//                           px-3
//                           py-2
//                           text-[10px]
//                           font-medium
//                           text-[#184C35]
//                         "
//                       >
//                         {ingredient}
//                       </span>
//                     ))}
//                   </div>

//                   {/* CTA */}

//                   <Link
//                     to={`/products/${activeFlavour.slug}`}
//                     className="
//                       group
//                       mt-7
//                       flex
//                       w-full
//                       items-center
//                       justify-center
//                       gap-3
//                       rounded-full
//                       px-6
//                       py-4
//                       text-sm
//                       font-semibold
//                       text-white
//                     "
//                     style={{
//                       backgroundColor:
//                         activeFlavour.accent,
//                     }}
//                   >
//                     Shop {activeFlavour.name}

//                     <ArrowUpRight
//                       size={17}
//                       className="
//                         transition-transform
//                         duration-300
//                         group-hover:translate-x-1
//                         group-hover:-translate-y-1
//                       "
//                     />
//                   </Link>
//                 </motion.div>
//               </AnimatePresence>

//               {/* Mobile scroll hint */}

//               <div className="mt-10 flex items-center justify-center gap-3 pb-5">
//                 <ChevronDown
//                   size={15}
//                   className="animate-bounce text-[#184C35]/40"
//                 />

//                 <span
//                   className="
//                     text-[9px]
//                     font-semibold
//                     uppercase
//                     tracking-[0.25em]
//                     text-[#667085]
//                   "
//                 >
//                   Keep scrolling
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ===================================================
//             DESKTOP BOTTOM SCROLL INDICATOR
//         =================================================== */}

//         <div
//           className="
//             absolute
//             bottom-6
//             left-1/2
//             hidden
//             -translate-x-1/2
//             items-center
//             gap-3
//             lg:flex
//           "
//         >
//           <span
//             className="
//               text-[9px]
//               font-semibold
//               uppercase
//               tracking-[0.3em]
//               text-[#667085]
//             "
//           >
//             Scroll to explore
//           </span>

//           <div
//             className="
//               flex
//               h-8
//               w-8
//               items-center
//               justify-center
//               rounded-full
//               border
//               border-black/[0.1]
//             "
//           >
//             <ChevronDown
//               size={14}
//               className="animate-bounce text-[#184C35]"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// import { useEffect, useRef, useState } from "react";

// import {
//   motion,
//   AnimatePresence,
//   useMotionValueEvent,
//   useScroll,
//   useSpring,
//   useTransform,
// } from "framer-motion";

// import { ArrowUpRight, ChevronDown } from "lucide-react";
// import { Link } from "react-router-dom";

// import PeriPeri from "../assets/popFresh_periPeri.png";
// import Cheese from "../assets/popFresh_cheese.png";
// import Tomato from "../assets/popFresh_tangyTomato.png";
// import Pudina from "../assets/popFresh_pudina.png";

// /* =========================================================
//    MAKHANA SVG
// ========================================================= */

// function Makhana({ size = 40 }) {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 200 200"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       style={{
//         overflow: "visible",
//         display: "block",
//       }}
//     >
//       <defs>
//         <radialGradient
//           id="makhanaGradient"
//           cx="0"
//           cy="0"
//           r="1"
//           gradientUnits="userSpaceOnUse"
//           gradientTransform="translate(78 65) rotate(48) scale(115)"
//         >
//           <stop offset="0" stopColor="#FFF3C7" />
//           <stop offset="0.42" stopColor="#E8D49A" />
//           <stop offset="0.75" stopColor="#C9AE69" />
//           <stop offset="1" stopColor="#A88A4D" />
//         </radialGradient>

//         <filter
//           id="makhanaShadow"
//           x="-30%"
//           y="-30%"
//           width="160%"
//           height="170%"
//         >
//           <feDropShadow
//             dx="0"
//             dy="6"
//             stdDeviation="6"
//             floodOpacity="0.15"
//           />
//         </filter>
//       </defs>

//       <g filter="url(#makhanaShadow)">
//         <path
//           d="
//             M100 20
//             C138 15 172 40 180 78
//             C189 118 166 156 130 174
//             C96 191 54 178 29 144
//             C8 115 8 72 35 42
//             C52 24 76 17 100 20Z
//           "
//           fill="url(#makhanaGradient)"
//         />

//         <circle cx="65" cy="65" r="4" fill="#6F5430" />
//         <circle cx="135" cy="58" r="3.5" fill="#6F5430" />
//         <circle cx="110" cy="120" r="4" fill="#6F5430" />
//         <circle cx="75" cy="128" r="3.5" fill="#6F5430" />
//         <circle cx="98" cy="92" r="2.5" fill="#6F5430" />

//         <ellipse
//           cx="72"
//           cy="55"
//           rx="24"
//           ry="12"
//           fill="white"
//           opacity="0.28"
//           transform="rotate(-20 72 55)"
//         />
//       </g>
//     </svg>
//   );
// }

// /* =========================================================
//    FLAVOURS DATA
// ========================================================= */

// const flavours = [
//   {
//     number: "01",
//     name: "Peri Peri",
//     slug: "peri-peri",
//     shortName: "Peri Peri",
//     title: "Peri Peri Roasted Makhana",
//     badge: "FIERY. BOLD. ADDICTIVE.",
//     image: PeriPeri,
//     bg: "#F7E6DE",
//     accent: "#E86B2F",
//     accentSoft: "#F2B08B",
//     description:
//       "Slow-roasted makhanas tossed in a smoky African chilli blend with a citrusy kick. The snack that bites back.",
//   },

//   {
//     number: "02",
//     name: "Cheese",
//     slug: "cheese",
//     shortName: "Cheese",
//     title: "Cheese Roasted Makhana",
//     badge: "RICH. CREAMY. IRRESISTIBLE.",
//     image: Cheese,
//     bg: "#F8F0D9",
//     accent: "#D7A326",
//     accentSoft: "#EBCB73",
//     description:
//       "A luxurious cheese seasoning wrapped around every crunchy bite. Comfort food without the guilt.",
//   },

//   {
//     number: "03",
//     name: "Tangy Tomato",
//     slug: "tangy-tomato",
//     shortName: "Tangy Tomato",
//     title: "Tangy Tomato Roasted Makhana",
//     badge: "ZESTY. TANGY. FUN.",
//     image: Tomato,
//     bg: "#F7E4E0",
//     accent: "#D94E43",
//     accentSoft: "#ECA39D",
//     description:
//       "A punchy blend of ripe tomato, herbs and spices that delivers the perfect sweet-and-tangy balance.",
//   },

//   {
//     number: "04",
//     name: "Pudina",
//     slug: "pudina",
//     shortName: "Pudina",
//     title: "Pudina Roasted Makhana",
//     badge: "FRESH. COOL. CRUNCHY.",
//     image: Pudina,
//     bg: "#E7F0E8",
//     accent: "#3D8C57",
//     accentSoft: "#9BC3A5",
//     description:
//       "Refreshing mint and subtle spices come together for a flavour that feels light, crisp and addictive.",
//   },
// ];

// /* =========================================================
//    INGREDIENTS / BENEFITS
// ========================================================= */

// const ingredients = [
//   "Roasted Makhana",
//   "Iodised Salt",
//   "Natural Flavours",
//   "Seasoning",
// ];

// const benefits = [
//   "Gluten Free",
//   "High Source of Fibre",
//   "Rich in Antioxidants",
// ];

// /* =========================================================
//    COMPONENT
// ========================================================= */

// export default function Flavours() {
//   const stageRef = useRef(null);

//   const [activeIndex, setActiveIndex] = useState(0);

//   /* =======================================================
//      SCROLL
//   ======================================================= */

//   const { scrollYProgress } = useScroll({
//     target: stageRef,
//     offset: ["start start", "end end"],
//   });

//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 90,
//     damping: 25,
//     mass: 0.4,
//   });

//   /* =======================================================
//      ORBIT ROTATION
//   ======================================================= */

//   const orbitRotation = useTransform(
//     smoothProgress,
//     [0, 1],
//     [0, -360]
//   );

//   const innerOrbitRotation = useTransform(
//     smoothProgress,
//     [0, 1],
//     [0, 180]
//   );

//   /* =======================================================
//      ACTIVE FLAVOUR
//   ======================================================= */

//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     const nextIndex = Math.min(
//       flavours.length - 1,
//       Math.floor(latest * flavours.length)
//     );

//     setActiveIndex(nextIndex);
//   });

//   const activeFlavour = flavours[activeIndex];

//   /* =======================================================
//      BACKGROUND
//   ======================================================= */

//   const [background, setBackground] = useState(flavours[0].bg);

//   useEffect(() => {
//     setBackground(activeFlavour.bg);
//   }, [activeFlavour]);

//   return (
//     <section className="relative w-full bg-[#F8F5EE]">

//       {/* =====================================================
//           INTRO / HEADING
//       ===================================================== */}

//       <div
//         className="
//           relative
//           z-10
//           flex
//           min-h-[300px]
//           flex-col
//           items-center
//           justify-center
//           px-5
//           pb-12
//           pt-24
//           text-center
//           sm:min-h-[340px]
//           sm:pt-28
//           lg:min-h-[360px]
//           lg:pt-32
//         "
//       >
//         {/* Small label */}

//         <div
//           className="
//             inline-flex
//             items-center
//             rounded-full
//             bg-[#E9E4D9]
//             px-5
//             py-2
//             text-[9px]
//             font-semibold
//             uppercase
//             tracking-[0.28em]
//             text-[#18523B]
//             sm:text-[10px]
//           "
//         >
//           OUR FLAVOURS
//         </div>

//         {/* Main heading */}

//         <h2
//           className="
//             mt-7
//             text-[3rem]
//             leading-[0.95]
//             tracking-[-0.04em]
//             text-[#18523B]
//             sm:text-[4rem]
//             lg:text-[4.6rem]
//             xl:text-[5rem]
//           "
//           style={{
//             fontFamily: "'Fraunces', Georgia, serif",
//             fontWeight: 500,
//           }}
//         >
//           Crafted for every craving
//         </h2>

//         {/* Subtitle */}

//         <p
//           className="
//             mt-6
//             max-w-[600px]
//             text-sm
//             leading-6
//             text-[#667085]
//             sm:text-base
//             lg:text-lg
//           "
//         >
//           Four signature flavours. One impossibly satisfying crunch.
//         </p>
//       </div>

//       {/* =====================================================
//           INTERACTIVE FLAVOUR SECTION
//       ===================================================== */}

//       <section
//         ref={stageRef}
//         className="relative"
//         style={{
//           height: "420vh",
//         }}
//       >

//         {/* ===================================================
//             STICKY STAGE

//             IMPORTANT:
//             top-24 gives the stage breathing room below navbar.
//         =================================================== */}

//         <div
//           className="
//             sticky
//             top-24
//             flex
//             h-[calc(100vh-6rem)]
//             w-full
//             items-center
//             overflow-hidden
//             lg:top-28
//             lg:h-[calc(100vh-7rem)]
//           "
//           style={{
//             background,
//             transition: "background-color 900ms ease",
//           }}
//         >

//           {/* =================================================
//               AMBIENT BACKGROUND
//           ================================================= */}

//           <motion.div
//             className="pointer-events-none absolute inset-0"
//             animate={{
//               background: `
//                 radial-gradient(
//                   circle at 65% 48%,
//                   ${activeFlavour.accentSoft}55 0%,
//                   transparent 31%
//                 ),
//                 radial-gradient(
//                   circle at 20% 75%,
//                   ${activeFlavour.accentSoft}25 0%,
//                   transparent 28%
//                 )
//               `,
//             }}
//             transition={{
//               duration: 1.2,
//               ease: "easeInOut",
//             }}
//           />

//           {/* =================================================
//               SUBTLE GRAIN
//           ================================================= */}

//           <div
//             className="
//               pointer-events-none
//               absolute
//               inset-0
//               opacity-[0.025]
//               mix-blend-multiply
//             "
//             style={{
//               backgroundImage:
//                 "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.35'/%3E%3C/svg%3E\")",
//             }}
//           />

//           {/* =================================================
//               MAIN CONTAINER
//           ================================================= */}

//           <div
//             className="
//               relative
//               mx-auto
//               flex
//               h-full
//               w-full
//               max-w-[1500px]
//               items-center
//               px-6
//               sm:px-8
//               lg:px-10
//               xl:px-12
//             "
//           >

//             {/* =================================================
//                 TOP LABEL
//             ================================================= */}

//             <div
//               className="
//                 absolute
//                 left-6
//                 top-6
//                 z-30
//                 sm:left-8
//                 lg:left-10
//                 xl:left-12
//               "
//             >
//               <div className="flex items-center gap-3">

//                 <span
//                   className="h-2 w-2 rounded-full"
//                   style={{
//                     backgroundColor: activeFlavour.accent,
//                   }}
//                 />

//                 <span
//                   className="
//                     text-[9px]
//                     font-semibold
//                     uppercase
//                     tracking-[0.28em]
//                     text-[#667085]
//                     sm:text-[10px]
//                   "
//                 >
//                   PopFresh / Flavours
//                 </span>

//               </div>
//             </div>

//             {/* =================================================
//                 DESKTOP CONTENT
//             ================================================= */}

//             <div
//               className="
//                 hidden
//                 w-full
//                 items-center
//                 lg:flex
//               "
//             >

//               {/* =================================================
//                   LEFT SIDE
//               ================================================= */}

//               <div
//                 className="
//                   relative
//                   z-20
//                   w-[27%]
//                   pr-6
//                   xl:pr-10
//                 "
//               >

//                 <p
//                   className="
//                     mb-8
//                     text-[10px]
//                     font-semibold
//                     uppercase
//                     tracking-[0.3em]
//                     text-[#7A8493]
//                   "
//                 >
//                   Choose your mood
//                 </p>

//                 <div className="space-y-5">

//                   {flavours.map((flavour, index) => {
//                     const isActive = index === activeIndex;

//                     return (
//                       <div
//                         key={flavour.name}
//                         className="
//                           flex
//                           items-center
//                           gap-4
//                           transition-all
//                           duration-500
//                         "
//                         style={{
//                           opacity: isActive ? 1 : 0.25,
//                           transform: isActive
//                             ? "translateX(8px)"
//                             : "translateX(0)",
//                         }}
//                       >

//                         <span
//                           className="w-7 text-xs font-medium"
//                           style={{
//                             color: isActive
//                               ? activeFlavour.accent
//                               : "#667085",
//                           }}
//                         >
//                           {flavour.number}
//                         </span>

//                         <span
//                           className="h-px transition-all duration-500"
//                           style={{
//                             backgroundColor: isActive
//                               ? activeFlavour.accent
//                               : "#667085",
//                             width: isActive ? "42px" : "24px",
//                           }}
//                         />

//                         <span
//                           className="
//                             text-2xl
//                             transition-colors
//                             duration-500
//                           "
//                           style={{
//                             color: isActive
//                               ? "#184C35"
//                               : "#667085",
//                             fontFamily:
//                               "'Fraunces', Georgia, serif",
//                             fontWeight: isActive ? 600 : 400,
//                           }}
//                         >
//                           {flavour.shortName}
//                         </span>

//                       </div>
//                     );
//                   })}

//                 </div>

//                 {/* Scroll hint */}

//                 <div className="mt-16 flex items-center gap-4 xl:mt-20">

//                   <div
//                     className="h-10 w-px"
//                     style={{
//                       backgroundColor: `${activeFlavour.accent}55`,
//                     }}
//                   />

//                   <p className="text-xs leading-5 text-[#667085]">
//                     Scroll to discover
//                     <br />
//                     every flavour.
//                   </p>

//                 </div>

//               </div>

//               {/* =================================================
//                   ORBITAL CENTRE
//               ================================================= */}

//               <div
//                 className="
//                   relative
//                   flex
//                   h-[620px]
//                   w-[46%]
//                   items-center
//                   justify-center
//                   xl:h-[680px]
//                 "
//               >

//                 {/* Outer orbital line */}

//                 <motion.div
//                   className="
//                     absolute
//                     h-[560px]
//                     w-[560px]
//                     rounded-full
//                     border
//                     border-black/[0.07]
//                     xl:h-[600px]
//                     xl:w-[600px]
//                   "
//                   style={{
//                     rotate: orbitRotation,
//                   }}
//                 />

//                 {/* Inner orbital line */}

//                 <motion.div
//                   className="
//                     absolute
//                     h-[400px]
//                     w-[400px]
//                     rounded-full
//                     border
//                     border-black/[0.07]
//                     xl:h-[430px]
//                     xl:w-[430px]
//                   "
//                   style={{
//                     rotate: innerOrbitRotation,
//                   }}
//                 />

//                 {/* Soft centre glow */}

//                 <motion.div
//                   className="
//                     absolute
//                     h-[360px]
//                     w-[360px]
//                     rounded-full
//                     blur-[90px]
//                   "
//                   animate={{
//                     backgroundColor: `${activeFlavour.accent}28`,
//                   }}
//                   transition={{
//                     duration: 0.9,
//                   }}
//                 />

//                 {/* =================================================
//                     5 MAKHANAS
//                     Positioned BETWEEN orbital lines
//                 ================================================= */}

//                 <motion.div
//                   className="
//                     absolute
//                     h-[560px]
//                     w-[560px]
//                     xl:h-[600px]
//                     xl:w-[600px]
//                   "
//                   style={{
//                     rotate: orbitRotation,
//                   }}
//                 >

//                   {[
//                     0,
//                     72,
//                     144,
//                     216,
//                     288,
//                   ].map((angle, index) => (

//                     <div
//                       key={index}
//                       className="
//                         absolute
//                         left-1/2
//                         top-1/2
//                         flex
//                         -translate-x-1/2
//                         -translate-y-1/2
//                         items-center
//                         justify-center
//                       "
//                       style={{
//                         transform: `
//                           translate(-50%, -50%)
//                           rotate(${angle}deg)
//                           translateY(-250px)
//                         `,
//                       }}
//                     >

//                       <motion.div
//                         className="
//                           flex
//                           h-12
//                           w-12
//                           items-center
//                           justify-center
//                           rounded-full
//                           border
//                           border-white/70
//                           bg-white/45
//                           shadow-[0_8px_25px_rgba(60,45,20,0.12)]
//                           backdrop-blur-sm
//                           xl:h-14
//                           xl:w-14
//                         "
//                         animate={{
//                           scale:
//                             index === activeIndex
//                               ? [1, 1.08, 1]
//                               : 1,
//                         }}
//                         transition={{
//                           duration: 2.8,
//                           repeat:
//                             index === activeIndex
//                               ? Infinity
//                               : 0,
//                           ease: "easeInOut",
//                         }}
//                       >

//                         <Makhana
//                           size={
//                             index === activeIndex
//                               ? 38
//                               : 34
//                           }
//                         />

//                       </motion.div>

//                     </div>

//                   ))}

//                 </motion.div>

//                 {/* =================================================
//                     PRODUCT
//                 ================================================= */}

//                 <AnimatePresence mode="wait">

//                   <motion.div
//                     key={activeFlavour.name}
//                     initial={{
//                       opacity: 0,
//                       scale: 0.88,
//                       y: 25,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       scale: 1,
//                       y: 0,
//                     }}
//                     exit={{
//                       opacity: 0,
//                       scale: 0.92,
//                       y: -20,
//                     }}
//                     transition={{
//                       duration: 0.65,
//                       ease: [0.22, 1, 0.36, 1],
//                     }}
//                     className="
//                       relative
//                       z-10
//                       flex
//                       h-[410px]
//                       w-[410px]
//                       items-center
//                       justify-center
//                       xl:h-[450px]
//                       xl:w-[450px]
//                     "
//                   >

//                     <motion.img
//                       src={activeFlavour.image}
//                       alt={activeFlavour.title}
//                       className="
//                         max-h-full
//                         max-w-full
//                         object-contain
//                         drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]
//                       "
//                       animate={{
//                         y: [0, -8, 0],
//                         rotate: [0, 0.7, 0],
//                       }}
//                       transition={{
//                         duration: 5,
//                         repeat: Infinity,
//                         ease: "easeInOut",
//                       }}
//                     />

//                   </motion.div>

//                 </AnimatePresence>

//               </div>

//               {/* =================================================
//                   RIGHT CONTENT
//               ================================================= */}

//               <div
//                 className="
//                   relative
//                   z-20
//                   w-[27%]
//                   pl-6
//                   xl:pl-10
//                 "
//               >

//                 <AnimatePresence mode="wait">

//                   <motion.div
//                     key={activeFlavour.name}
//                     initial={{
//                       opacity: 0,
//                       x: 30,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       x: 0,
//                     }}
//                     exit={{
//                       opacity: 0,
//                       x: -20,
//                     }}
//                     transition={{
//                       duration: 0.55,
//                       ease: [0.22, 1, 0.36, 1],
//                     }}
//                   >

//                     {/* Counter */}

//                     <div className="mb-6 flex items-end justify-between">

//                       <span
//                         className="
//                           text-[10px]
//                           font-semibold
//                           uppercase
//                           tracking-[0.25em]
//                         "
//                         style={{
//                           color: activeFlavour.accent,
//                         }}
//                       >
//                         Flavour
//                       </span>

//                       <span
//                         className="
//                           font-serif
//                           text-4xl
//                           text-[#184C35]/20
//                         "
//                       >
//                         {activeFlavour.number}

//                         <span className="ml-1 text-sm font-sans">
//                           /04
//                         </span>
//                       </span>

//                     </div>

//                     {/* Badge */}

//                     <span
//                       className="
//                         inline-flex
//                         rounded-full
//                         px-4
//                         py-2
//                         text-[9px]
//                         font-semibold
//                         tracking-[0.18em]
//                         text-white
//                       "
//                       style={{
//                         backgroundColor:
//                           activeFlavour.accent,
//                       }}
//                     >
//                       {activeFlavour.badge}
//                     </span>

//                     {/* Title */}

//                     <h3
//                       className="
//                         mt-5
//                         text-5xl
//                         leading-[0.95]
//                         text-[#184C35]
//                         xl:text-6xl
//                       "
//                       style={{
//                         fontFamily:
//                           "'Fraunces', Georgia, serif",
//                       }}
//                     >
//                       {activeFlavour.name}
//                     </h3>

//                     <p
//                       className="
//                         mt-2
//                         text-xl
//                         text-[#184C35]/55
//                       "
//                       style={{
//                         fontFamily:
//                           "'Fraunces', Georgia, serif",
//                       }}
//                     >
//                       Roasted Makhana
//                     </p>

//                     {/* Description */}

//                     <p
//                       className="
//                         mt-6
//                         text-[14px]
//                         leading-6
//                         text-[#667085]
//                         xl:text-[15px]
//                         xl:leading-7
//                       "
//                     >
//                       {activeFlavour.description}
//                     </p>

//                     {/* Ingredients */}

//                     <div className="mt-6 flex flex-wrap gap-2">

//                       {ingredients.map((ingredient) => (
//                         <span
//                           key={ingredient}
//                           className="
//                             rounded-full
//                             border
//                             border-black/[0.06]
//                             bg-white/55
//                             px-3
//                             py-2
//                             text-[10px]
//                             font-medium
//                             text-[#184C35]
//                           "
//                         >
//                           {ingredient}
//                         </span>
//                       ))}

//                     </div>

//                     {/* Divider */}

//                     <div className="my-6 h-px bg-black/[0.07]" />

//                     {/* Benefits */}

//                     <div className="flex flex-wrap gap-x-5 gap-y-2">

//                       {benefits.map((item) => (
//                         <div
//                           key={item}
//                           className="
//                             flex
//                             items-center
//                             gap-2
//                             text-[10px]
//                             font-medium
//                             text-[#184C35]
//                           "
//                         >

//                           <span
//                             className="
//                               h-1.5
//                               w-1.5
//                               rounded-full
//                             "
//                             style={{
//                               backgroundColor:
//                                 activeFlavour.accent,
//                             }}
//                           />

//                           {item}

//                         </div>
//                       ))}

//                     </div>

//                     {/* CTA */}

//                     <Link
//                       to={`/products/${activeFlavour.slug}`}
//                       className="
//                         group
//                         mt-7
//                         inline-flex
//                         items-center
//                         gap-3
//                         rounded-full
//                         px-7
//                         py-4
//                         text-sm
//                         font-semibold
//                         text-white
//                         transition-all
//                         duration-300
//                         hover:-translate-y-1
//                       "
//                       style={{
//                         backgroundColor:
//                           activeFlavour.accent,
//                       }}
//                     >

//                       Shop {activeFlavour.name}

//                       <ArrowUpRight
//                         size={17}
//                         className="
//                           transition-transform
//                           duration-300
//                           group-hover:translate-x-1
//                           group-hover:-translate-y-1
//                         "
//                       />

//                     </Link>

//                   </motion.div>

//                 </AnimatePresence>

//               </div>

//             </div>

//             {/* =================================================
//                 MOBILE VERSION
//             ================================================= */}

//             <div
//               className="
//                 w-full
//                 lg:hidden
//               "
//             >

//               {/* Mobile header */}

//               <div
//                 className="
//                   mb-5
//                   flex
//                   items-end
//                   justify-between
//                   pt-12
//                 "
//               >

//                 <div>

//                   <p
//                     className="
//                       text-[9px]
//                       font-semibold
//                       uppercase
//                       tracking-[0.28em]
//                       text-[#667085]
//                     "
//                   >
//                     Our flavours
//                   </p>

//                   <h2
//                     className="
//                       mt-2
//                       text-3xl
//                       leading-none
//                       text-[#184C35]
//                     "
//                     style={{
//                       fontFamily:
//                         "'Fraunces', Georgia, serif",
//                     }}
//                   >
//                     Pick your mood.
//                   </h2>

//                 </div>

//                 <div className="text-right">

//                   <span
//                     className="
//                       font-serif
//                       text-3xl
//                       text-[#184C35]/20
//                     "
//                   >
//                     {activeFlavour.number}
//                   </span>

//                   <span className="text-xs text-[#184C35]/40">
//                     /04
//                   </span>

//                 </div>

//               </div>

//               {/* Mobile orbital stage */}

//               <div
//                 className="
//                   relative
//                   mx-auto
//                   flex
//                   h-[285px]
//                   w-full
//                   max-w-[390px]
//                   items-center
//                   justify-center
//                 "
//               >

//                 {/* Orbit */}

//                 <motion.div
//                   className="
//                     absolute
//                     h-[265px]
//                     w-[265px]
//                     rounded-full
//                     border
//                     border-black/[0.08]
//                   "
//                   style={{
//                     rotate: orbitRotation,
//                   }}
//                 />

//                 <motion.div
//                   className="
//                     absolute
//                     h-[190px]
//                     w-[190px]
//                     rounded-full
//                     border
//                     border-black/[0.06]
//                   "
//                   style={{
//                     rotate: innerOrbitRotation,
//                   }}
//                 />

//                 {/* Glow */}

//                 <motion.div
//                   className="
//                     absolute
//                     h-52
//                     w-52
//                     rounded-full
//                     blur-[60px]
//                   "
//                   animate={{
//                     backgroundColor:
//                       `${activeFlavour.accent}35`,
//                   }}
//                 />

//                 {/* 5 mobile Makhanas */}

//                 <motion.div
//                   className="
//                     absolute
//                     h-[265px]
//                     w-[265px]
//                   "
//                   style={{
//                     rotate: orbitRotation,
//                   }}
//                 >

//                   {[
//                     0,
//                     72,
//                     144,
//                     216,
//                     288,
//                   ].map((angle, index) => (

//                     <div
//                       key={index}
//                       className="
//                         absolute
//                         left-1/2
//                         top-1/2
//                         flex
//                         -translate-x-1/2
//                         -translate-y-1/2
//                         items-center
//                         justify-center
//                       "
//                       style={{
//                         transform: `
//                           translate(-50%, -50%)
//                           rotate(${angle}deg)
//                           translateY(-116px)
//                         `,
//                       }}
//                     >

//                       <div
//                         className="
//                           flex
//                           h-8
//                           w-8
//                           items-center
//                           justify-center
//                           rounded-full
//                           border
//                           border-white/70
//                           bg-white/45
//                           shadow-sm
//                         "
//                       >

//                         <Makhana size={24} />

//                       </div>

//                     </div>

//                   ))}

//                 </motion.div>

//                 {/* Product */}

//                 <AnimatePresence mode="wait">

//                   <motion.img
//                     key={activeFlavour.name}
//                     src={activeFlavour.image}
//                     alt={activeFlavour.title}
//                     initial={{
//                       opacity: 0,
//                       scale: 0.85,
//                       y: 20,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       scale: 1,
//                       y: 0,
//                     }}
//                     exit={{
//                       opacity: 0,
//                       scale: 0.9,
//                       y: -15,
//                     }}
//                     transition={{
//                       duration: 0.55,
//                     }}
//                     className="
//                       relative
//                       z-10
//                       h-[245px]
//                       w-[245px]
//                       object-contain
//                       drop-shadow-[0_25px_25px_rgba(0,0,0,0.14)]
//                     "
//                   />

//                 </AnimatePresence>

//               </div>

//               {/* Mobile indicators */}

//               <div className="mt-4 flex justify-center gap-2">

//                 {flavours.map((flavour, index) => (
//                   <div
//                     key={flavour.name}
//                     className="
//                       h-1
//                       rounded-full
//                       transition-all
//                       duration-500
//                     "
//                     style={{
//                       width:
//                         index === activeIndex
//                           ? "30px"
//                           : "9px",
//                       backgroundColor:
//                         index === activeIndex
//                           ? activeFlavour.accent
//                           : "#184C35",
//                       opacity:
//                         index === activeIndex
//                           ? 1
//                           : 0.15,
//                     }}
//                   />
//                 ))}

//               </div>

//               {/* Mobile content */}

//               <AnimatePresence mode="wait">

//                 <motion.div
//                   key={activeFlavour.name}
//                   initial={{
//                     opacity: 0,
//                     y: 20,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     y: 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     y: -15,
//                   }}
//                   transition={{
//                     duration: 0.5,
//                   }}
//                   className="mt-6 pb-10"
//                 >

//                   <span
//                     className="
//                       inline-flex
//                       rounded-full
//                       px-4
//                       py-2
//                       text-[9px]
//                       font-semibold
//                       tracking-[0.18em]
//                       text-white
//                     "
//                     style={{
//                       backgroundColor:
//                         activeFlavour.accent,
//                     }}
//                   >
//                     {activeFlavour.badge}
//                   </span>

//                   <h3
//                     className="
//                       mt-5
//                       text-4xl
//                       leading-[0.95]
//                       text-[#184C35]
//                     "
//                     style={{
//                       fontFamily:
//                         "'Fraunces', Georgia, serif",
//                     }}
//                   >
//                     {activeFlavour.name}
//                   </h3>

//                   <p
//                     className="
//                       mt-2
//                       text-lg
//                       text-[#184C35]/50
//                     "
//                     style={{
//                       fontFamily:
//                         "'Fraunces', Georgia, serif",
//                     }}
//                   >
//                     Roasted Makhana
//                   </p>

//                   <p
//                     className="
//                       mt-5
//                       text-[14px]
//                       leading-6
//                       text-[#667085]
//                     "
//                   >
//                     {activeFlavour.description}
//                   </p>

//                   {/* Ingredients */}

//                   <div className="mt-6 flex flex-wrap gap-2">

//                     {ingredients.map((ingredient) => (
//                       <span
//                         key={ingredient}
//                         className="
//                           rounded-full
//                           bg-white/60
//                           px-3
//                           py-2
//                           text-[10px]
//                           font-medium
//                           text-[#184C35]
//                         "
//                       >
//                         {ingredient}
//                       </span>
//                     ))}

//                   </div>

//                   {/* CTA */}

//                   <Link
//                     to={`/products/${activeFlavour.slug}`}
//                     className="
//                       group
//                       mt-7
//                       flex
//                       w-full
//                       items-center
//                       justify-center
//                       gap-3
//                       rounded-full
//                       px-6
//                       py-4
//                       text-sm
//                       font-semibold
//                       text-white
//                     "
//                     style={{
//                       backgroundColor:
//                         activeFlavour.accent,
//                     }}
//                   >

//                     Shop {activeFlavour.name}

//                     <ArrowUpRight
//                       size={17}
//                       className="
//                         transition-transform
//                         duration-300
//                         group-hover:translate-x-1
//                         group-hover:-translate-y-1
//                       "
//                     />

//                   </Link>

//                 </motion.div>

//               </AnimatePresence>

//               {/* Mobile scroll hint */}

//               <div className="flex items-center justify-center gap-3 pb-5">

//                 <ChevronDown
//                   size={15}
//                   className="animate-bounce text-[#184C35]/40"
//                 />

//                 <span
//                   className="
//                     text-[9px]
//                     font-semibold
//                     uppercase
//                     tracking-[0.25em]
//                     text-[#667085]
//                   "
//                 >
//                   Keep scrolling
//                 </span>

//               </div>

//             </div>

//           </div>

//           {/* =================================================
//               DESKTOP BOTTOM SCROLL INDICATOR
//           ================================================= */}

//           <div
//             className="
//               absolute
//               bottom-4
//               left-1/2
//               hidden
//               -translate-x-1/2
//               items-center
//               gap-3
//               lg:flex
//             "
//           >

//             <span
//               className="
//                 text-[9px]
//                 font-semibold
//                 uppercase
//                 tracking-[0.3em]
//                 text-[#667085]
//               "
//             >
//               Scroll to explore
//             </span>

//             <div
//               className="
//                 flex
//                 h-8
//                 w-8
//                 items-center
//                 justify-center
//                 rounded-full
//                 border
//                 border-black/[0.1]
//               "
//             >

//               <ChevronDown
//                 size={14}
//                 className="animate-bounce text-[#184C35]"
//               />

//             </div>

//           </div>

//         </div>

//       </section>

//     </section>
//   );
// }


// import { useEffect, useRef, useState } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useMotionValueEvent,
//   useScroll,
//   useSpring,
//   useTransform,
// } from "framer-motion";
// import { ArrowUpRight, ChevronDown } from "lucide-react";
// import { Link } from "react-router-dom";

// import PeriPeri from "../assets/popFresh_periPeri.png";
// import Cheese from "../assets/popFresh_cheese.png";
// import Tomato from "../assets/popFresh_tangyTomato.png";
// import Pudina from "../assets/popFresh_pudina.png";

// /* =========================================================
//    FLAVOURS DATA
// ========================================================= */

// const flavours = [
//   {
//     number: "01",
//     name: "Peri Peri",
//     slug: "peri-peri",
//     shortName: "Peri Peri",
//     title: "Peri Peri Roasted Makhana",
//     badge: "FIERY. BOLD. ADDICTIVE.",
//     image: PeriPeri,
//     bg: "#F7E6DE",
//     accent: "#E86B2F",
//     accentSoft: "#F2B08B",
//     description:
//       "Slow-roasted makhanas tossed in a smoky African chilli blend with a citrusy kick. The snack that bites back.",
//   },

//   {
//     number: "02",
//     name: "Cheese",
//     slug: "cheese",
//     shortName: "Cheese",
//     title: "Cheese Roasted Makhana",
//     badge: "RICH. CREAMY. IRRESISTIBLE.",
//     image: Cheese,
//     bg: "#F8F0D9",
//     accent: "#D7A326",
//     accentSoft: "#EBCB73",
//     description:
//       "A luxurious cheese seasoning wrapped around every crunchy bite. Comfort food without the guilt.",
//   },

//   {
//     number: "03",
//     name: "Tangy Tomato",
//     slug: "tangy-tomato",
//     shortName: "Tangy Tomato",
//     title: "Tangy Tomato Roasted Makhana",
//     badge: "ZESTY. TANGY. FUN.",
//     image: Tomato,
//     bg: "#F7E4E0",
//     accent: "#D94E43",
//     accentSoft: "#ECA39D",
//     description:
//       "A punchy blend of ripe tomato, herbs and spices that delivers the perfect sweet-and-tangy balance.",
//   },

//   {
//     number: "04",
//     name: "Pudina",
//     slug: "pudina",
//     shortName: "Pudina",
//     title: "Pudina Roasted Makhana",
//     badge: "FRESH. COOL. CRUNCHY.",
//     image: Pudina,
//     bg: "#E7F0E8",
//     accent: "#3D8C57",
//     accentSoft: "#9BC3A5",
//     description:
//       "Refreshing mint and subtle spices come together for a flavour that feels light, crisp and addictive.",
//   },
// ];

// /* =========================================================
//    COMPONENT
// ========================================================= */

// export default function Flavours() {
//   const sectionRef = useRef(null);

//   const [activeIndex, setActiveIndex] = useState(0);

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"],
//   });

//   /*
//    * Smooth the scroll value.
//    * This makes the orbit movement feel expensive rather
//    * than directly tied to the browser's raw scroll event.
//    */
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 90,
//     damping: 25,
//     mass: 0.4,
//   });

//   /*
//    * The whole orbit rotates while the user scrolls.
//    */
//   const orbitRotation = useTransform(
//     smoothProgress,
//     [0, 1],
//     [0, -360]
//   );

//   /*
//    * Header movement.
//    */
//   const headerY = useTransform(
//     smoothProgress,
//     [0, 0.15],
//     [0, -35]
//   );

//   const headerOpacity = useTransform(
//     smoothProgress,
//     [0, 0.12],
//     [1, 0.55]
//   );

//   /* =========================================================
//      DETERMINE ACTIVE FLAVOUR
//   ========================================================= */

//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     const nextIndex = Math.min(
//       flavours.length - 1,
//       Math.floor(latest * flavours.length)
//     );

//     setActiveIndex(nextIndex);
//   });

//   const activeFlavour = flavours[activeIndex];

//   /* =========================================================
//      BACKGROUND COLOUR
//   ========================================================= */

//   const [background, setBackground] = useState(flavours[0].bg);

//   useEffect(() => {
//     setBackground(activeFlavour.bg);
//   }, [activeFlavour]);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative"
//       style={{
//         height: "420vh",
//       }}
//     >
//       {/* =====================================================
//           STICKY STAGE
//       ===================================================== */}

//       <div
//         className="sticky top-0 flex h-screen w-full items-center overflow-hidden"
//         style={{
//           background,
//           transition: "background-color 900ms ease",
//         }}
//       >
//         {/* ===================================================
//             AMBIENT BACKGROUND
//         =================================================== */}

//         <motion.div
//           className="pointer-events-none absolute inset-0"
//           animate={{
//             background: `
//               radial-gradient(
//                 circle at 72% 50%,
//                 ${activeFlavour.accentSoft}55 0%,
//                 transparent 30%
//               ),
//               radial-gradient(
//                 circle at 25% 70%,
//                 ${activeFlavour.accentSoft}25 0%,
//                 transparent 28%
//               )
//             `,
//           }}
//           transition={{
//             duration: 1.2,
//             ease: "easeInOut",
//           }}
//         />

//         {/* Fine grain / texture */}

//         <div
//           className="
//             pointer-events-none
//             absolute
//             inset-0
//             opacity-[0.035]
//             mix-blend-multiply
//           "
//           style={{
//             backgroundImage:
//               "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.35'/%3E%3C/svg%3E\")",
//           }}
//         />

//         {/* ===================================================
//             MAIN CONTAINER
//         =================================================== */}

//         <div className="relative mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-12">

//           {/* =================================================
//               TOP LABEL
//           ================================================= */}

//           <motion.div
//             style={{
//               y: headerY,
//               opacity: headerOpacity,
//             }}
//             className="
//               absolute
//               left-5
//               top-[-180px]
//               z-30
//               sm:left-8
//               lg:left-12
//             "
//           >
//             <div className="flex items-center gap-3">
//               <span
//                 className="h-2 w-2 rounded-full"
//                 style={{
//                   backgroundColor: activeFlavour.accent,
//                 }}
//               />

//               <span
//                 className="
//                   text-[10px]
//                   font-semibold
//                   uppercase
//                   tracking-[0.3em]
//                   text-[#667085]
//                   sm:text-xs
//                 "
//               >
//                 PopFresh / Flavours
//               </span>
//             </div>
//           </motion.div>

//           {/* =================================================
//               DESKTOP ORBIT SYSTEM
//           ================================================= */}

//           <div
//             className="
//               relative
//               hidden
//               min-h-[680px]
//               items-center
//               lg:flex
//             "
//           >

//             {/* ===============================================
//                 LEFT INFORMATION
//             =============================================== */}

//             <div className="relative z-20 w-[28%] pr-10">

//               <p
//                 className="
//                   mb-8
//                   text-[10px]
//                   font-semibold
//                   uppercase
//                   tracking-[0.3em]
//                   text-[#7A8493]
//                 "
//               >
//                 Choose your mood
//               </p>

//               <div className="space-y-5">
//                 {flavours.map((flavour, index) => {
//                   const isActive = index === activeIndex;

//                   return (
//                     <div
//                       key={flavour.name}
//                       className="
//                         flex
//                         items-center
//                         gap-4
//                         transition-all
//                         duration-500
//                       "
//                       style={{
//                         opacity: isActive ? 1 : 0.28,
//                         transform: isActive
//                           ? "translateX(8px)"
//                           : "translateX(0)",
//                       }}
//                     >
//                       <span
//                         className="
//                           w-7
//                           text-xs
//                           font-medium
//                         "
//                         style={{
//                           color: isActive
//                             ? activeFlavour.accent
//                             : "#667085",
//                         }}
//                       >
//                         {flavour.number}
//                       </span>

//                       <span
//                         className="h-px w-8 transition-all duration-500"
//                         style={{
//                           backgroundColor: isActive
//                             ? activeFlavour.accent
//                             : "#667085",
//                           width: isActive ? "42px" : "24px",
//                         }}
//                       />

//                       <span
//                         className="
//                           text-2xl
//                           transition-colors
//                           duration-500
//                         "
//                         style={{
//                           color: isActive
//                             ? "#184C35"
//                             : "#667085",
//                           fontFamily: "serif",
//                           fontWeight: isActive ? 600 : 400,
//                         }}
//                       >
//                         {flavour.shortName}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Scroll instruction */}

//               <div className="mt-20 flex items-center gap-4">
//                 <div
//                   className="h-10 w-px"
//                   style={{
//                     backgroundColor: `${activeFlavour.accent}55`,
//                   }}
//                 />

//                 <div>
//                   <p className="text-xs leading-5 text-[#667085]">
//                     Scroll to discover
//                     <br />
//                     every flavour.
//                   </p>
//                 </div>
//               </div>

//             </div>

//             {/* ===============================================
//                 ORBITAL CENTRE
//             =============================================== */}

//             <div
//               className="
//                 relative
//                 flex
//                 h-[680px]
//                 w-[44%]
//                 items-center
//                 justify-center
//               "
//             >

//               {/* Outer orbit */}

//               <motion.div
//                 className="
//                   absolute
//                   h-[590px]
//                   w-[590px]
//                   rounded-full
//                   border
//                   border-black/[0.07]
//                 "
//                 style={{
//                   rotate: orbitRotation,
//                 }}
//               />

//               {/* Inner orbit */}

//               <motion.div
//                 className="
//                   absolute
//                   h-[430px]
//                   w-[430px]
//                   rounded-full
//                   border
//                   border-black/[0.07]
//                 "
//                 style={{
//                   rotate: useTransform(
//                     smoothProgress,
//                     [0, 1],
//                     [0, 180]
//                   ),
//                 }}
//               />

//               {/* Soft glow */}

//               <motion.div
//                 className="
//                   absolute
//                   h-[370px]
//                   w-[370px]
//                   rounded-full
//                   blur-[90px]
//                 "
//                 animate={{
//                   backgroundColor: `${activeFlavour.accent}28`,
//                 }}
//                 transition={{
//                   duration: 0.9,
//                 }}
//               />

//               {/* ============================================
//                   ORBITING FLAVOUR DOTS
//               ============================================ */}

//               <motion.div
//                 className="
//                   absolute
//                   h-[590px]
//                   w-[590px]
//                 "
//                 style={{
//                   rotate: orbitRotation,
//                 }}
//               >
//                 {flavours.map((flavour, index) => {
//                   const angle =
//                     (index / flavours.length) * 360;

//                   return (
//                     <div
//                       key={flavour.name}
//                       className="
//                         absolute
//                         left-1/2
//                         top-1/2
//                         h-10
//                         w-10
//                         -translate-x-1/2
//                         -translate-y-1/2
//                       "
//                       style={{
//                         transform: `
//                           translate(-50%, -50%)
//                           rotate(${angle}deg)
//                           translateY(-295px)
//                         `,
//                       }}
//                     >
//                       <motion.div
//                         className="
//                           flex
//                           h-10
//                           w-10
//                           items-center
//                           justify-center
//                           rounded-full
//                           border
//                           bg-white/70
//                           shadow-sm
//                           backdrop-blur-md
//                         "
//                         style={{
//                           borderColor:
//                             index === activeIndex
//                               ? flavour.accent
//                               : "rgba(0,0,0,0.08)",
//                         }}
//                       >
//                         <span
//                           className="h-2 w-2 rounded-full"
//                           style={{
//                             backgroundColor:
//                               flavour.accent,
//                           }}
//                         />
//                       </motion.div>
//                     </div>
//                   );
//                 })}
//               </motion.div>

//               {/* ============================================
//                   PRODUCT IMAGE
//               ============================================ */}

//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeFlavour.name}
//                   initial={{
//                     opacity: 0,
//                     scale: 0.88,
//                     y: 25,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     scale: 1,
//                     y: 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     scale: 0.92,
//                     y: -20,
//                   }}
//                   transition={{
//                     duration: 0.65,
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                   className="
//                     relative
//                     z-10
//                     flex
//                     h-[430px]
//                     w-[430px]
//                     items-center
//                     justify-center
//                   "
//                 >
//                   <motion.img
//                     src={activeFlavour.image}
//                     alt={activeFlavour.title}
//                     className="
//                       max-h-full
//                       max-w-full
//                       object-contain
//                       drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]
//                     "
//                     animate={{
//                       y: [0, -8, 0],
//                       rotate: [0, 0.7, 0],
//                     }}
//                     transition={{
//                       duration: 5,
//                       repeat: Infinity,
//                       ease: "easeInOut",
//                     }}
//                   />
//                 </motion.div>
//               </AnimatePresence>

//             </div>

//             {/* ===============================================
//                 RIGHT CONTENT
//             =============================================== */}

//             <div className="relative z-20 w-[28%] pl-10">

//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeFlavour.name}
//                   initial={{
//                     opacity: 0,
//                     x: 30,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     x: 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     x: -20,
//                   }}
//                   transition={{
//                     duration: 0.55,
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                 >

//                   {/* Counter */}

//                   <div className="mb-7 flex items-end justify-between">
//                     <span
//                       className="
//                         text-[11px]
//                         font-semibold
//                         uppercase
//                         tracking-[0.25em]
//                       "
//                       style={{
//                         color: activeFlavour.accent,
//                       }}
//                     >
//                       Flavour
//                     </span>

//                     <span className="font-serif text-4xl text-[#184C35]/20">
//                       {activeFlavour.number}
//                       <span className="ml-1 text-sm font-sans">
//                         /04
//                       </span>
//                     </span>
//                   </div>

//                   {/* Badge */}

//                   <span
//                     className="
//                       inline-flex
//                       rounded-full
//                       px-4
//                       py-2
//                       text-[10px]
//                       font-semibold
//                       tracking-[0.18em]
//                       text-white
//                     "
//                     style={{
//                       backgroundColor:
//                         activeFlavour.accent,
//                     }}
//                   >
//                     {activeFlavour.badge}
//                   </span>

//                   {/* Title */}

//                   <h3
//                     className="
//                       mt-6
//                       text-5xl
//                       leading-[0.95]
//                       text-[#184C35]
//                       xl:text-6xl
//                     "
//                     style={{
//                       fontFamily: "serif",
//                     }}
//                   >
//                     {activeFlavour.name}
//                   </h3>

//                   <p
//                     className="
//                       mt-2
//                       text-xl
//                       text-[#184C35]/55
//                     "
//                     style={{
//                       fontFamily: "serif",
//                     }}
//                   >
//                     Roasted Makhana
//                   </p>

//                   {/* Description */}

//                   <p className="mt-7 text-[15px] leading-7 text-[#667085]">
//                     {activeFlavour.description}
//                   </p>

//                   {/* Ingredients */}

//                   <div className="mt-7 flex flex-wrap gap-2">
//                     {[
//                       "Roasted Makhana",
//                       "Iodised Salt",
//                       "Natural Flavours",
//                       "Seasoning",
//                     ].map((ingredient) => (
//                       <span
//                         key={ingredient}
//                         className="
//                           rounded-full
//                           border
//                           border-black/[0.06]
//                           bg-white/55
//                           px-3
//                           py-2
//                           text-[11px]
//                           font-medium
//                           text-[#184C35]
//                         "
//                       >
//                         {ingredient}
//                       </span>
//                     ))}
//                   </div>

//                   {/* Divider */}

//                   <div className="my-7 h-px bg-black/[0.07]" />

//                   {/* Benefits */}

//                   <div className="flex flex-wrap gap-x-5 gap-y-2">
//                     {[
//                       "Gluten Free",
//                       "High Source of Fibre",
//                       "Rich in Antioxidants",
//                     ].map((item) => (
//                       <div
//                         key={item}
//                         className="
//                           flex
//                           items-center
//                           gap-2
//                           text-[11px]
//                           font-medium
//                           text-[#184C35]
//                         "
//                       >
//                         <span
//                           className="h-1.5 w-1.5 rounded-full"
//                           style={{
//                             backgroundColor:
//                               activeFlavour.accent,
//                           }}
//                         />

//                         {item}
//                       </div>
//                     ))}
//                   </div>

//                   {/* CTA */}

//                   <Link
//                     to={`/products/${activeFlavour.slug}`}
//                     className="
//                       group
//                       mt-8
//                       inline-flex
//                       items-center
//                       gap-3
//                       rounded-full
//                       px-7
//                       py-4
//                       text-sm
//                       font-semibold
//                       text-white
//                       transition-all
//                       duration-300
//                       hover:-translate-y-1
//                     "
//                     style={{
//                       backgroundColor:
//                         activeFlavour.accent,
//                     }}
//                   >
//                     Shop {activeFlavour.name}

//                     <ArrowUpRight
//                       size={17}
//                       className="
//                         transition-transform
//                         duration-300
//                         group-hover:translate-x-1
//                         group-hover:-translate-y-1
//                       "
//                     />
//                   </Link>

//                 </motion.div>
//               </AnimatePresence>

//             </div>

//           </div>

//           {/* =================================================
//               MOBILE VERSION
//           ================================================= */}

//           <div className="lg:hidden">

//             <div className="pt-4">

//               {/* Mobile heading */}

//               <div className="mb-8 flex items-end justify-between">
//                 <div>
//                   <p
//                     className="
//                       text-[10px]
//                       font-semibold
//                       uppercase
//                       tracking-[0.28em]
//                       text-[#667085]
//                     "
//                   >
//                     Our flavours
//                   </p>

//                   <h2
//                     className="
//                       mt-2
//                       text-4xl
//                       leading-none
//                       text-[#184C35]
//                     "
//                     style={{
//                       fontFamily: "serif",
//                     }}
//                   >
//                     Pick your mood.
//                   </h2>
//                 </div>

//                 <div className="text-right">
//                   <span
//                     className="
//                       font-serif
//                       text-4xl
//                       text-[#184C35]/20
//                     "
//                   >
//                     {activeFlavour.number}
//                   </span>

//                   <span className="text-xs text-[#184C35]/40">
//                     /04
//                   </span>
//                 </div>
//               </div>

//               {/* Mobile orbital image */}

//               <div
//                 className="
//                   relative
//                   mx-auto
//                   flex
//                   h-[310px]
//                   w-full
//                   max-w-[390px]
//                   items-center
//                   justify-center
//                 "
//               >

//                 {/* Orbit */}

//                 <motion.div
//                   className="
//                     absolute
//                     h-[290px]
//                     w-[290px]
//                     rounded-full
//                     border
//                     border-black/[0.08]
//                   "
//                   style={{
//                     rotate: orbitRotation,
//                   }}
//                 />

//                 {/* Glow */}

//                 <motion.div
//                   className="
//                     absolute
//                     h-52
//                     w-52
//                     rounded-full
//                     blur-[60px]
//                   "
//                   animate={{
//                     backgroundColor:
//                       `${activeFlavour.accent}35`,
//                   }}
//                 />

//                 {/* Small orbit markers */}

//                 <motion.div
//                   className="
//                     absolute
//                     h-[290px]
//                     w-[290px]
//                   "
//                   style={{
//                     rotate: orbitRotation,
//                   }}
//                 >
//                   {flavours.map((flavour, index) => {
//                     const angle =
//                       (index / flavours.length) * 360;

//                     return (
//                       <div
//                         key={flavour.name}
//                         className="
//                           absolute
//                           left-1/2
//                           top-1/2
//                           h-5
//                           w-5
//                         "
//                         style={{
//                           transform: `
//                             translate(-50%, -50%)
//                             rotate(${angle}deg)
//                             translateY(-145px)
//                           `,
//                         }}
//                       >
//                         <div
//                           className="
//                             h-5
//                             w-5
//                             rounded-full
//                             border
//                             border-white
//                             shadow-sm
//                           "
//                           style={{
//                             backgroundColor:
//                               flavour.accent,
//                           }}
//                         />
//                       </div>
//                     );
//                   })}
//                 </motion.div>

//                 {/* Product */}

//                 <AnimatePresence mode="wait">
//                   <motion.img
//                     key={activeFlavour.name}
//                     src={activeFlavour.image}
//                     alt={activeFlavour.title}
//                     initial={{
//                       opacity: 0,
//                       scale: 0.85,
//                       y: 20,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       scale: 1,
//                       y: 0,
//                     }}
//                     exit={{
//                       opacity: 0,
//                       scale: 0.9,
//                       y: -15,
//                     }}
//                     transition={{
//                       duration: 0.55,
//                     }}
//                     className="
//                       relative
//                       z-10
//                       h-[270px]
//                       w-[270px]
//                       object-contain
//                       drop-shadow-[0_25px_25px_rgba(0,0,0,0.14)]
//                     "
//                   />
//                 </AnimatePresence>

//               </div>

//               {/* Mobile flavour selector */}

//               <div className="mt-7 flex justify-center gap-2">
//                 {flavours.map((flavour, index) => (
//                   <div
//                     key={flavour.name}
//                     className="
//                       h-1
//                       rounded-full
//                       transition-all
//                       duration-500
//                     "
//                     style={{
//                       width:
//                         index === activeIndex
//                           ? "34px"
//                           : "10px",
//                       backgroundColor:
//                         index === activeIndex
//                           ? activeFlavour.accent
//                           : "#184C35",
//                       opacity:
//                         index === activeIndex
//                           ? 1
//                           : 0.15,
//                     }}
//                   />
//                 ))}
//               </div>

//               {/* Mobile content */}

//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeFlavour.name}
//                   initial={{
//                     opacity: 0,
//                     y: 20,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     y: 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     y: -15,
//                   }}
//                   transition={{
//                     duration: 0.5,
//                   }}
//                   className="mt-8"
//                 >

//                   <span
//                     className="
//                       inline-flex
//                       rounded-full
//                       px-4
//                       py-2
//                       text-[9px]
//                       font-semibold
//                       tracking-[0.18em]
//                       text-white
//                     "
//                     style={{
//                       backgroundColor:
//                         activeFlavour.accent,
//                     }}
//                   >
//                     {activeFlavour.badge}
//                   </span>

//                   <h3
//                     className="
//                       mt-5
//                       text-5xl
//                       leading-[0.95]
//                       text-[#184C35]
//                     "
//                     style={{
//                       fontFamily: "serif",
//                     }}
//                   >
//                     {activeFlavour.name}
//                   </h3>

//                   <p
//                     className="
//                       mt-2
//                       text-xl
//                       text-[#184C35]/50
//                     "
//                     style={{
//                       fontFamily: "serif",
//                     }}
//                   >
//                     Roasted Makhana
//                   </p>

//                   <p
//                     className="
//                       mt-5
//                       text-[15px]
//                       leading-7
//                       text-[#667085]
//                     "
//                   >
//                     {activeFlavour.description}
//                   </p>

//                   <div className="mt-6 flex flex-wrap gap-2">
//                     {[
//                       "Roasted Makhana",
//                       "Iodised Salt",
//                       "Natural Flavours",
//                       "Seasoning",
//                     ].map((ingredient) => (
//                       <span
//                         key={ingredient}
//                         className="
//                           rounded-full
//                           bg-white/60
//                           px-3
//                           py-2
//                           text-[10px]
//                           font-medium
//                           text-[#184C35]
//                         "
//                       >
//                         {ingredient}
//                       </span>
//                     ))}
//                   </div>

//                   <Link
//                     to={`/products/${activeFlavour.slug}`}
//                     className="
//                       group
//                       mt-7
//                       flex
//                       w-full
//                       items-center
//                       justify-center
//                       gap-3
//                       rounded-full
//                       px-6
//                       py-4
//                       text-sm
//                       font-semibold
//                       text-white
//                     "
//                     style={{
//                       backgroundColor:
//                         activeFlavour.accent,
//                     }}
//                   >
//                     Shop {activeFlavour.name}

//                     <ArrowUpRight
//                       size={17}
//                       className="
//                         transition-transform
//                         duration-300
//                         group-hover:translate-x-1
//                         group-hover:-translate-y-1
//                       "
//                     />
//                   </Link>

//                 </motion.div>
//               </AnimatePresence>

//               {/* Mobile scroll hint */}

//               <div className="mt-10 flex items-center justify-center gap-3 pb-5">
//                 <ChevronDown
//                   size={15}
//                   className="animate-bounce text-[#184C35]/40"
//                 />

//                 <span
//                   className="
//                     text-[9px]
//                     font-semibold
//                     uppercase
//                     tracking-[0.25em]
//                     text-[#667085]
//                   "
//                 >
//                   Keep scrolling
//                 </span>
//               </div>

//             </div>

//           </div>

//         </div>

//         {/* ===================================================
//             BOTTOM SCROLL INDICATOR
//         =================================================== */}

//         <div
//           className="
//             absolute
//             bottom-7
//             left-1/2
//             hidden
//             -translate-x-1/2
//             items-center
//             gap-3
//             lg:flex
//           "
//         >
//           <span
//             className="
//               text-[9px]
//               font-semibold
//               uppercase
//               tracking-[0.3em]
//               text-[#667085]
//             "
//           >
//             Scroll to explore
//           </span>

//           <div
//             className="
//               flex
//               h-8
//               w-8
//               items-center
//               justify-center
//               rounded-full
//               border
//               border-black/[0.1]
//             "
//           >
//             <ChevronDown
//               size={14}
//               className="animate-bounce text-[#184C35]"
//             />
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }





// import { useEffect, useRef, useState } from "react";
// import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
// import { ArrowUpRight } from "lucide-react";
// import { Link } from "react-router-dom";

// import PeriPeri from "../assets/popFresh_periPeri.png";
// import Cheese from "../assets/popFresh_cheese.png";
// import Tomato from "../assets/popFresh_tangyTomato.png";
// import Pudina from "../assets/popFresh_pudina.png";

// const flavours = [
//   {
//     name: "Peri Peri",
//     slug: "peri-peri",
//     title: "Peri Peri",
//     subtitle: "Roasted Makhana",
//     badge: "FIERY. BOLD. ADDICTIVE.",
//     image: PeriPeri,
//     bg: "#F9E4DA",
//     accent: "#E8662D",
//     accentSoft: "#F2B49A",
//     description:
//       "Slow-roasted makhanas tossed in a smoky African chilli blend with a citrusy kick. The snack that bites back.",
//     stats: [
//       "Gluten Free",
//       "High Source of Fibre",
//       "Rich in Antioxidants",
//     ],
//   },

//   {
//     name: "Cheese",
//     slug: "cheese",
//     title: "Cheese",
//     subtitle: "Roasted Makhana",
//     badge: "RICH. CREAMY. IRRESISTIBLE.",
//     image: Cheese,
//     bg: "#F8F0D9",
//     accent: "#D59D24",
//     accentSoft: "#E9D18D",
//     description:
//       "A luxurious cheese seasoning wrapped around every crunchy bite. Comfort food without the guilt.",
//     stats: [
//       "Gluten Free",
//       "High Source of Fibre",
//       "Rich in Antioxidants",
//     ],
//   },

//   {
//     name: "Tangy Tomato",
//     slug: "tangy-tomato",
//     title: "Tangy Tomato",
//     subtitle: "Roasted Makhana",
//     badge: "ZESTY. TANGY. FUN.",
//     image: Tomato,
//     bg: "#F8E3DF",
//     accent: "#D94E43",
//     accentSoft: "#EBAAA4",
//     description:
//       "A punchy blend of ripe tomato, herbs and spices that delivers the perfect sweet-and-tangy balance.",
//     stats: [
//       "Gluten Free",
//       "High Source of Fibre",
//       "Rich in Antioxidants",
//     ],
//   },

//   {
//     name: "Pudina",
//     slug: "pudina",
//     title: "Pudina",
//     subtitle: "Roasted Makhana",
//     badge: "FRESH. COOL. CRUNCHY.",
//     image: Pudina,
//     bg: "#E8F1E9",
//     accent: "#3D8C57",
//     accentSoft: "#A9C9B0",
//     description:
//       "Refreshing mint and subtle spices come together for a flavour that feels light, crisp and addictive.",
//     stats: [
//       "Gluten Free",
//       "High Source of Fibre",
//       "Rich in Antioxidants",
//     ],
//   },
// ];

// const ingredients = [
//   "Roasted Makhana",
//   "Iodised Salt",
//   "Natural Flavours",
//   "Seasoning",
// ];

// export default function Flavours() {
//   const sectionRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   /*
//    * The section is 4 viewport-heights tall.
//    *
//    * As the user scrolls through the section:
//    * 0% - 25%   => Peri Peri
//    * 25% - 50%  => Cheese
//    * 50% - 75%  => Tangy Tomato
//    * 75% - 100% => Pudina
//    */
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"],
//   });

//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     mass: 0.5,
//   });

//   useEffect(() => {
//     const unsubscribe = smoothProgress.on("change", (value) => {
//       const nextIndex = Math.min(
//         flavours.length - 1,
//         Math.floor(value * flavours.length)
//       );

//       setActiveIndex(nextIndex);
//     });

//     return () => unsubscribe();
//   }, [smoothProgress]);

//   const activeFlavour = flavours[activeIndex];

//   return (
//     <section
//       ref={sectionRef}
//       className="relative bg-[#F7F4ED]"
//       style={{
//         height: `${flavours.length * 100}vh`,
//       }}
//     >
//       {/* =========================================================
//           STICKY EXPERIENCE
//       ========================================================= */}

//       <div className="sticky top-0 flex h-screen items-center overflow-hidden py-6 sm:py-8 lg:py-10">
//         <div className="mx-auto flex h-full w-full max-w-[1500px] items-center px-4 sm:px-6 lg:px-8">
//           <div
//             className="
//               relative
//               flex
//               h-[calc(100vh-48px)]
//               max-h-[920px]
//               min-h-[680px]
//               w-full
//               overflow-hidden
//               rounded-[32px]
//               border
//               border-[#E7DED0]
//               shadow-[0_25px_80px_rgba(24,76,53,0.08)]
//               sm:h-[calc(100vh-64px)]
//               sm:rounded-[42px]
//               lg:h-[calc(100vh-80px)]
//               lg:rounded-[48px]
//             "
//             style={{
//               backgroundColor: activeFlavour.bg,
//             }}
//           >
//             {/* =====================================================
//                 BACKGROUND DECORATION
//             ===================================================== */}

//             <AnimatePresence mode="sync">
//               <motion.div
//                 key={`background-${activeFlavour.name}`}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="pointer-events-none absolute inset-0"
//               >
//                 {/* Large glow */}

//                 <div
//                   className="
//                     absolute
//                     left-[28%]
//                     top-[18%]
//                     h-[420px]
//                     w-[420px]
//                     rounded-full
//                     blur-[110px]
//                     opacity-40
//                     lg:h-[600px]
//                     lg:w-[600px]
//                   "
//                   style={{
//                     backgroundColor: activeFlavour.accentSoft,
//                   }}
//                 />

//                 {/* Decorative circle */}

//                 <div
//                   className="
//                     absolute
//                     left-[38%]
//                     top-1/2
//                     h-[500px]
//                     w-[500px]
//                     -translate-x-1/2
//                     -translate-y-1/2
//                     rounded-full
//                     border
//                     opacity-70
//                     sm:h-[580px]
//                     sm:w-[580px]
//                     lg:h-[650px]
//                     lg:w-[650px]
//                   "
//                   style={{
//                     borderColor: activeFlavour.accentSoft,
//                   }}
//                 />

//                 <div
//                   className="
//                     absolute
//                     left-[38%]
//                     top-1/2
//                     h-[410px]
//                     w-[410px]
//                     -translate-x-1/2
//                     -translate-y-1/2
//                     rounded-full
//                     border
//                     border-white/70
//                     sm:h-[480px]
//                     sm:w-[480px]
//                     lg:h-[540px]
//                     lg:w-[540px]
//                   "
//                 />

//                 {/* Tiny decorative dot */}

//                 <div
//                   className="
//                     absolute
//                     left-[41%]
//                     top-[18%]
//                     h-2
//                     w-2
//                     rounded-full
//                     lg:h-3
//                     lg:w-3
//                   "
//                   style={{
//                     backgroundColor: activeFlavour.accent,
//                   }}
//                 />

//                 <div
//                   className="
//                     absolute
//                     bottom-[18%]
//                     left-[43%]
//                     h-2
//                     w-2
//                     rounded-full
//                     lg:h-3
//                     lg:w-3
//                   "
//                   style={{
//                     backgroundColor: activeFlavour.accent,
//                   }}
//                 />
//               </motion.div>
//             </AnimatePresence>

//             {/* =====================================================
//                 LEFT NAVIGATION
//             ===================================================== */}

//             <div
//               className="
//                 relative
//                 z-20
//                 hidden
//                 w-[26%]
//                 flex-col
//                 justify-between
//                 border-r
//                 border-[#184C35]/10
//                 px-8
//                 py-10
//                 lg:flex
//                 xl:px-12
//                 xl:py-12
//               "
//             >
//               <div>
//                 <div className="flex items-center gap-3">
//                   <span
//                     className="h-2 w-2 rounded-full"
//                     style={{
//                       backgroundColor: activeFlavour.accent,
//                     }}
//                   />

//                   <span className="text-[11px] font-semibold tracking-[0.3em] text-[#617665]">
//                     POPFRESH / FLAVOURS
//                   </span>
//                 </div>

//                 <p className="mt-24 text-[11px] font-semibold tracking-[0.25em] text-[#667085]">
//                   CHOOSE YOUR MOOD
//                 </p>

//                 <div className="mt-8 space-y-2">
//                   {flavours.map((flavour, index) => {
//                     const isActive = index === activeIndex;

//                     return (
//                       <button
//                         key={flavour.name}
//                         type="button"
//                         onClick={() => {
//                           const target =
//                             sectionRef.current?.offsetTop +
//                             (index / flavours.length) *
//                               sectionRef.current.offsetHeight;

//                           window.scrollTo({
//                             top: target,
//                             behavior: "smooth",
//                           });
//                         }}
//                         className="
//                           group
//                           flex
//                           w-full
//                           items-center
//                           gap-4
//                           py-3
//                           text-left
//                         "
//                       >
//                         <span
//                           className={`
//                             w-6
//                             text-[11px]
//                             font-semibold
//                             transition-colors
//                             duration-500
//                             ${
//                               isActive
//                                 ? "text-[#184C35]"
//                                 : "text-[#A4AAA1]"
//                             }
//                           `}
//                         >
//                           {String(index + 1).padStart(2, "0")}
//                         </span>

//                         <span
//                           className="
//                             h-[2px]
//                             transition-all
//                             duration-500
//                           "
//                           style={{
//                             width: isActive ? "44px" : "22px",
//                             backgroundColor: isActive
//                               ? activeFlavour.accent
//                               : "#D7D4CC",
//                           }}
//                         />

//                         <span
//                           className={`
//                             font-serif
//                             text-[25px]
//                             leading-none
//                             transition-all
//                             duration-500
//                             xl:text-[29px]
//                             ${
//                               isActive
//                                 ? "translate-x-1 text-[#184C35]"
//                                 : "text-[#A9ADA5]"
//                             }
//                           `}
//                           style={{ fontFamily: "Georgia, serif" }}
//                         >
//                           {flavour.name}
//                         </span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 text-[11px] font-medium text-[#667085]">
//                 <span className="h-8 w-px bg-[#184C35]/20" />

//                 <span>
//                   Scroll to discover
//                   <br />
//                   every flavour.
//                 </span>
//               </div>
//             </div>

//             {/* =====================================================
//                 MOBILE TOP LABEL
//             ===================================================== */}

//             <div className="absolute left-6 top-6 z-30 flex items-center gap-3 lg:hidden">
//               <span
//                 className="h-2 w-2 rounded-full"
//                 style={{
//                   backgroundColor: activeFlavour.accent,
//                 }}
//               />

//               <span className="text-[9px] font-semibold tracking-[0.25em] text-[#617665]">
//                 POPFRESH / FLAVOURS
//               </span>
//             </div>

//             {/* =====================================================
//                 MAIN PRODUCT AREA
//             ===================================================== */}

//             <div className="relative z-10 flex min-w-0 flex-1 flex-col lg:flex-row">
//               {/* PRODUCT IMAGE */}

//               <div
//                 className="
//                   relative
//                   flex
//                   min-h-[330px]
//                   w-full
//                   items-center
//                   justify-center
//                   px-5
//                   pt-20
//                   sm:min-h-[400px]
//                   sm:px-8
//                   sm:pt-16
//                   lg:h-full
//                   lg:min-h-0
//                   lg:w-[43%]
//                   lg:px-5
//                   lg:pt-0
//                   xl:w-[45%]
//                 "
//               >
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={activeFlavour.name}
//                     initial={{
//                       opacity: 0,
//                       scale: 0.92,
//                       y: 20,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       scale: 1,
//                       y: 0,
//                     }}
//                     exit={{
//                       opacity: 0,
//                       scale: 1.04,
//                       y: -15,
//                     }}
//                     transition={{
//                       duration: 0.7,
//                       ease: [0.22, 1, 0.36, 1],
//                     }}
//                     className="
//                       relative
//                       flex
//                       h-full
//                       w-full
//                       items-center
//                       justify-center
//                     "
//                   >
//                     {/* Product shadow */}

//                     <div
//                       className="
//                         absolute
//                         bottom-[13%]
//                         left-1/2
//                         h-10
//                         w-[55%]
//                         -translate-x-1/2
//                         rounded-[50%]
//                         bg-black/10
//                         blur-2xl
//                       "
//                     />

//                     <img
//                       src={activeFlavour.image}
//                       alt={activeFlavour.title}
//                       className="
//                         relative
//                         z-10
//                         max-h-[440px]
//                         w-full
//                         max-w-[520px]
//                         object-contain
//                         drop-shadow-[0_25px_25px_rgba(0,0,0,0.12)]
//                         sm:max-h-[500px]
//                         lg:max-h-[520px]
//                         xl:max-h-[590px]
//                       "
//                     />
//                   </motion.div>
//                 </AnimatePresence>

//                 {/* Mobile flavour number */}

//                 <div className="absolute right-6 top-6 flex items-baseline gap-1 lg:hidden">
//                   <span className="font-serif text-5xl leading-none text-[#184C35]/20">
//                     {String(activeIndex + 1).padStart(2, "0")}
//                   </span>

//                   <span className="text-xs text-[#184C35]/40">
//                     / 04
//                   </span>
//                 </div>
//               </div>

//               {/* =====================================================
//                   CONTENT
//               ===================================================== */}

//               <div
//                 className="
//                   relative
//                   flex
//                   min-w-0
//                   flex-1
//                   flex-col
//                   justify-center
//                   px-6
//                   pb-8
//                   pt-2
//                   sm:px-10
//                   sm:pb-10
//                   lg:px-7
//                   lg:py-10
//                   xl:px-12
//                   2xl:px-16
//                 "
//               >
//                 {/* Desktop number */}

//                 <div className="absolute right-8 top-8 hidden items-baseline gap-1 lg:flex xl:right-12 xl:top-10">
//                   <span className="font-serif text-6xl leading-none text-[#184C35]/20 xl:text-7xl">
//                     {String(activeIndex + 1).padStart(2, "0")}
//                   </span>

//                   <span className="text-sm text-[#184C35]/40">
//                     / 04
//                   </span>
//                 </div>

//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={activeFlavour.name}
//                     initial={{
//                       opacity: 0,
//                       x: 30,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       x: 0,
//                     }}
//                     exit={{
//                       opacity: 0,
//                       x: -20,
//                     }}
//                     transition={{
//                       duration: 0.55,
//                       ease: [0.22, 1, 0.36, 1],
//                     }}
//                     className="w-full max-w-[600px]"
//                   >
//                     {/* Badge */}

//                     <span
//                       className="
//                         inline-flex
//                         rounded-full
//                         px-4
//                         py-2
//                         text-[10px]
//                         font-bold
//                         tracking-[0.16em]
//                         text-white
//                         sm:px-5
//                         sm:py-2.5
//                         sm:text-[11px]
//                       "
//                       style={{
//                         backgroundColor: activeFlavour.accent,
//                       }}
//                     >
//                       {activeFlavour.badge}
//                     </span>

//                     {/* Heading */}

//                     <h3
//                       className="
//                         mt-5
//                         font-serif
//                         text-[44px]
//                         leading-[0.92]
//                         tracking-[-0.03em]
//                         text-[#184C35]
//                         sm:mt-6
//                         sm:text-[56px]
//                         lg:text-[52px]
//                         xl:text-[68px]
//                         2xl:text-[76px]
//                       "
//                       style={{
//                         fontFamily: "Georgia, 'Times New Roman', serif",
//                       }}
//                     >
//                       {activeFlavour.title}
//                       <br />
//                       <span className="text-[#184C35]/90">
//                         {activeFlavour.subtitle}
//                       </span>
//                     </h3>

//                     {/* Description */}

//                     <p
//                       className="
//                         mt-5
//                         max-w-[560px]
//                         text-[14px]
//                         leading-7
//                         text-[#667085]
//                         sm:text-[16px]
//                         sm:leading-8
//                         lg:mt-6
//                         xl:text-[17px]
//                       "
//                     >
//                       {activeFlavour.description}
//                     </p>

//                     {/* Ingredients */}

//                     <div className="mt-5 sm:mt-7">
//                       <div className="flex flex-wrap gap-2">
//                         {ingredients.map((ingredient) => (
//                           <span
//                             key={ingredient}
//                             className="
//                               rounded-full
//                               border
//                               border-white/80
//                               bg-white/65
//                               px-3
//                               py-2
//                               text-[10px]
//                               font-medium
//                               text-[#184C35]
//                               backdrop-blur-sm
//                               sm:px-4
//                               sm:text-[11px]
//                             "
//                           >
//                             {ingredient}
//                           </span>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Divider */}

//                     <div className="my-5 h-px w-full bg-[#184C35]/10 sm:my-7" />

//                     {/* Benefits */}

//                     <div className="flex flex-wrap gap-x-5 gap-y-2">
//                       {activeFlavour.stats.map((stat) => (
//                         <div
//                           key={stat}
//                           className="
//                             flex
//                             items-center
//                             gap-2
//                             text-[10px]
//                             font-medium
//                             text-[#184C35]
//                             sm:text-[11px]
//                           "
//                         >
//                           <span
//                             className="h-1.5 w-1.5 rounded-full"
//                             style={{
//                               backgroundColor: activeFlavour.accent,
//                             }}
//                           />

//                           {stat}
//                         </div>
//                       ))}
//                     </div>

//                     {/* CTA */}

//                     <Link
//                       to={`/products/${activeFlavour.slug}`}
//                       className="
//                         group
//                         mt-6
//                         inline-flex
//                         items-center
//                         gap-4
//                         rounded-full
//                         px-6
//                         py-3.5
//                         text-sm
//                         font-semibold
//                         text-white
//                         shadow-[0_10px_25px_rgba(0,0,0,0.08)]
//                         transition-all
//                         duration-300
//                         hover:-translate-y-1
//                         sm:mt-8
//                         sm:px-7
//                         sm:py-4
//                       "
//                       style={{
//                         backgroundColor: activeFlavour.accent,
//                       }}
//                     >
//                       Shop {activeFlavour.name}

//                       <span
//                         className="
//                           flex
//                           h-7
//                           w-7
//                           items-center
//                           justify-center
//                           rounded-full
//                           bg-white/20
//                           transition-transform
//                           duration-300
//                           group-hover:rotate-45
//                         "
//                       >
//                         <ArrowUpRight size={16} />
//                       </span>
//                     </Link>
//                   </motion.div>
//                 </AnimatePresence>
//               </div>
//             </div>

//             {/* =====================================================
//                 BOTTOM UI
//             ===================================================== */}

//             <div className="absolute bottom-5 right-6 z-30 hidden items-center gap-3 lg:flex xl:bottom-7 xl:right-10">
//               <span className="text-[10px] font-medium tracking-[0.16em] text-[#184C35]/50">
//                 SCROLL TO EXPLORE
//               </span>

//               <ArrowUpRight
//                 size={15}
//                 className="rotate-45 text-[#184C35]/50"
//               />
//             </div>

//             {/* Progress line */}

//             <div className="absolute bottom-0 left-0 z-30 h-[3px] w-full bg-black/5">
//               <motion.div
//                 className="h-full origin-left"
//                 style={{
//                   scaleX: smoothProgress,
//                   backgroundColor: activeFlavour.accent,
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }







// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";
// import PeriPeri from "../assets/popFresh_periPeri.png";
// import Cheese from "../assets/popFresh_cheese.png";
// import Tomato from "../assets/popFresh_tangyTomato.png";
// import Pudina from "../assets/popFresh_pudina.png";

// const flavours = [
//   {
//     name: "Peri Peri",
//     slug: "peri-peri",
//     title: "Peri Peri Roasted Makhana",
//     badge: "FIERY. BOLD. ADDICTIVE.",
//     image: PeriPeri,
//     bg: "#F8E6DF",
//     accent: "#E86B2F",
//     description:
//       "Slow-roasted makhanas tossed in a smoky African chilli blend with a citrusy kick. The snack that bites back.",
//     stats: [
//       { label: "Gluten Free" },
//       { label: "High Source of Fibre" },
//       { label: "Rich in Antioxidants" },
//     ],
//   },

//   {
//     name: "Cheese",
//     slug: "cheese",
//     title: "Cheese Roasted Makhana",
//     badge: "RICH. CREAMY. IRRESISTIBLE.",
//     image: Cheese,
//     bg: "#FBF2DE",
//     accent: "#D7A326",
//     description:
//       "A luxurious cheese seasoning wrapped around every crunchy bite. Comfort food without the guilt.",
//     stats: [
//       { label: "Gluten Free" },
//       { label: "High Source of Fibre" },
//       { label: "Rich in Antioxidants" },
//     ],
//   },

//   {
//     name: "Tangy Tomato",
//     slug: "tangy-tomato",
//     title: "Tangy Tomato Roasted Makhana",
//     badge: "ZESTY. TANGY. FUN.",
//     image: Tomato,
//     bg: "#FBE6E2",
//     accent: "#D94E43",
//     description:
//       "A punchy blend of ripe tomato, herbs and spices that delivers the perfect sweet-and-tangy balance.",
//     stats: [
//       { label: "Gluten Free" },
//       { label: "High Source of Fibre" },
//       { label: "Rich in Antioxidants" },
//     ],
//   },

//   {
//     name: "Pudina",
//     slug: "pudina",
//     title: "Pudina Roasted Makhana",
//     badge: "FRESH. COOL. CRUNCHY.",
//     image: Pudina,
//     bg: "#EAF4EB",
//     accent: "#3D8C57",
//     description:
//       "Refreshing mint and subtle spices come together for a flavour that feels light, crisp and addictive.",
//     stats: [
//       { label: "Gluten Free" },
//       { label: "High Source of Fibre" },
//       { label: "Rich in Antioxidants" },
//     ],
//   },
// ];

// export default function Flavours() {
//   return (
//     <section className="bg-[#F6F3EC] py-24 lg:py-32">
//       <div className="max-w-[1500px] mx-auto px-6">
//         {/* Header */}

//         <div className="text-center mb-24">
//           <span
//             className="
//               inline-flex
//               px-5
//               py-2
//               rounded-full
//               bg-[#E9E3D8]
//               text-[#184C35]
//               text-xs
//               tracking-[0.18em]
//               font-medium
//             "
//           >
//             OUR FLAVOURS
//           </span>

//           <h2
//             className="
//               mt-6
//               text-[#184C35]
//               text-4xl
//               md:text-6xl
//               leading-tight
//             "
//             style={{ fontFamily: "serif" }}
//           >
//             Crafted for every craving
//           </h2>

//           <p className="mt-5 text-[#667085] max-w-2xl mx-auto">
//             Four signature flavours. One impossibly satisfying crunch.
//           </p>
//         </div>

//         {/* Flavour Cards */}

//         <div className="space-y-20">
//           {flavours.map((flavour, index) => (
//             <motion.div
//               key={flavour.name}
//               whileHover={{ y: -4 }}
//               transition={{ duration: 0.25 }}
//               className="
//                 overflow-hidden
//                 rounded-[42px]
//                 shadow-[0_10px_40px_rgba(0,0,0,0.04)]
//               "
//               style={{
//                 background: flavour.bg,
//               }}
//             >
//               <div
//                 className={`
//                   grid
//                   lg:grid-cols-[52%_48%]
//                   min-h-[680px]
//                   items-stretch
//                   ${index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""}
//                 `}
//               >
//                 {/* IMAGE */}

//                 <div className="h-full p-8">
//                   <div className="h-full w-full overflow-hidden rounded-[32px]">
//                     <motion.img
//                       src={flavour.image}
//                       alt={flavour.title}
//                       whileHover={{ scale: 1.03 }}
//                       transition={{ duration: 0.35 }}
//                       className="
//                         w-full
//                         h-full
//                         object-cover
//                       "
//                     />
//                   </div>
//                 </div>

//                 {/* CONTENT */}

//                 <div className="flex flex-col justify-center px-10 lg:px-14 py-12">
//                   <span
//                     className="
//                       inline-flex
//                       w-fit
//                       px-4
//                       py-2
//                       rounded-full
//                       text-white
//                       text-xs
//                       tracking-wide
//                       font-medium
//                     "
//                     style={{
//                       background: flavour.accent,
//                     }}
//                   >
//                     {flavour.badge}
//                   </span>

//                   <h3
//                     className="
//                       mt-6
//                       text-[#184C35]
//                       text-4xl
//                       lg:text-[52px]
//                       leading-tight
//                     "
//                     style={{ fontFamily: "serif" }}
//                   >
//                     {flavour.title}
//                   </h3>

//                   <p
//                     className="
//                       mt-6
//                       text-[#667085]
//                       text-lg
//                       leading-8
//                     "
//                   >
//                     {flavour.description}
//                   </p>

//                   {/* Ingredients */}

//                   <div className="mt-8">
//                     <p className="text-sm font-semibold text-[#667085] uppercase mb-4">
//                       Ingredients
//                     </p>

//                     <div className="flex flex-wrap gap-2">
//                       <span className="px-4 py-2 bg-white/70 rounded-full text-sm">
//                         Roasted Makhana
//                       </span>

//                       <span className="px-4 py-2 bg-white/70 rounded-full text-sm">
//                         Iodised Salt
//                       </span>

//                       <span className="px-4 py-2 bg-white/70 rounded-full text-sm">
//                         Natural Flavours
//                       </span>

//                       <span className="px-4 py-2 bg-white/70 rounded-full text-sm">
//                         Seasoning
//                       </span>
//                     </div>
//                   </div>

//                   {/* Stats */}

//                   <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 mt-10">
//   {flavour.stats.map((stat) => (
//     <div
//       key={stat.label}
//       className="
//         bg-white/85
//         rounded-[24px]
//         py-6
//         px-4
//         flex
//         items-center
//         justify-center
//         text-center
//         min-h-[110px]
//       "
//     >
//       <span
//         className="
//           text-[#184C35]
//           text-[11px]
//           md:text-sm
//           font-medium
//           leading-tight
//         "
//       >
//         {stat.label}
//       </span>
//     </div>
//   ))}
// </div>

//                   {/* CTA */}
//                   <Link
//                     to={`/products/${flavour.slug}`}
//                     className="
//                     group
//                     mt-10
//                     w-fit
//                     inline-flex
//                     items-center
//                     gap-3
//                     px-10
//                     py-5
//                     rounded-full
//                     text-white
//                     font-medium
//                     hover:-translate-y-1
//                     transition-all
//                     duration-300
//                 "
//                     style={{
//                       background: flavour.accent,
//                     }}
//                   >
//                     Shop {flavour.name}
//                     <ArrowRight
//                       size={18}
//                       className="
//                     transition-transform
//                     duration-300
//                     group-hover:translate-x-1
//                     "
//                     />
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
