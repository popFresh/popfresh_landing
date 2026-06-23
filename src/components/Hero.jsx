import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Makhana from "./Makhana";
import HeroJar from "../assets/hero-jar-new2.png";
import { Link } from "react-router-dom";

// const orbitOuter = [0, 90, 180, 270];
// const orbitMiddle = [45, 135, 225, 315];
// const orbitInner = [30, 150, 210, 330];
const orbitOuter = [0, 72, 144, 216, 288];
const orbitMiddle = [45, 135, 225, 315];
const orbitInner = [60, 180, 300];

export default function Hero() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-[110vh] lg:min-h-screen w-full overflow-hidden">
      <div
        className="
            relative
            min-h-screen
            w-full
            px-8
            lg:px-12
            overflow-hidden
        "
      >
        {/* Background */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,#648D67_0%,#086B46_40%,#003727_100%)]
          "
        />

        {/* Glow Overlay */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_65%)]" />

        {/* Floating Golden Particles */}

        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#DDBA6D]"
            style={{
              width: i % 2 ? 3 : 5,
              height: i % 2 ? 3 : 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.25, 1, 0.25],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3 + i * 0.2,
              repeat: Infinity,
            }}
          />
        ))}

        <div className="relative z-10 min-h-[110vh] lg:min-h-screen grid lg:grid-cols-[45%_58%] items-center pt-42 lg:pt-34">
          {/* LEFT SIDE */}

          <div className="order-1 lg:order-1 flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 max-w-[620px] lg:-translate-y-10">
            {/* Badge */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                border
                border-[#CFAE62]
                text-[#E6C06A]
                text-xs
                tracking-[0.15em]
                w-fit
                
              "
            >
              <Sparkles size={14} />
              GOURMET ROASTED MAKHANA
            </div>

            {/* Heading */}

            <h1
              className="
                mt-8
                text-white
                leading-[0.9]
                text-6xl
                sm:text-7xl
              "
              style={{
                fontSize: "clamp(4rem,6vw,6rem)",
                fontFamily: "'Fraunces', serif",
                fontWeight: 600,
              }}
            >
              POP IT
            </h1>

            <h1
              className="
                text-[#E4C06A]
                leading-[0.9]
                text-4xl
                sm:text-5xl
              "
              style={{
                fontSize: "clamp(2.5rem,4vw,3.5rem)",
                fontFamily: "'Fraunces', serif",
                fontWeight: 600,
              }}
            >
              Love It
            </h1>

            {/* Description */}

            <p className="mt-8 text-white/80 text-base lg:text-lg leading-7 lg:leading-10 max-w-[520px] ">
              Crafted from premium fox nuts and roasted to perfection,
              <br />
              Pop Fresh transforms healthy snacking into an indulgent
              experience.
            </p>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-6">
              <Link
                to="/products"
                className="
                  group
                  bg-[#E2BF69]
                  text-[#173A2D]
                  px-8
                  py-4
                  rounded-full
                  font-semibold
                  flex items-center gap-3
                  hover:scale-105
                  transition-all
                  duration-300
                "
              >
                EXPLORE FLAVOURS
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

            {/* Bottom Features */}

            <div className="flex flex-wrap gap-4 md:gap-8 mt-10 text-[#DADAD2] tracking-[0.25em] text-sm">
              <span>100% VEGAN</span>
              <span>HIGH PROTEIN</span>
              <span>NEVER FRIED</span>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div
            className="
                order-2 lg:order-2
                relative
                flex
                items-center
                justify-center
                overflow-visible
                h-[420px]
                sm:h-[550px]
                lg:h-[750px]
                mt-10 lg:mt-0
                lg:-translate-y-12
            "
            >
            {/* Rings */}

            <div
              className="
                absolute
                z-0
                w-[280px]
                h-[280px]
                sm:w-[420px]
                sm:h-[420px]
                lg:w-[560px]
                lg:h-[560px]
                rounded-full
                border
                border-[#D9C074]/25
            "
            />

            <div
              className="
                absolute
                z-0
                w-[200px]
                h-[200px]
                sm:w-[320px]
                sm:h-[320px]
                lg:w-[420px]
                lg:h-[420px]
                rounded-full
                border
                border-[#D9C074]/25
            "
            />

            <div
              className="
                absolute
                z-0
                w-[140px]
                h-[140px]
                sm:w-[220px]
                sm:h-[220px]
                lg:w-[280px]
                lg:h-[280px]
                rounded-full
                border
                border-[#D9C074]/25
            "
            />

            {/* OUTER ORBIT */}

            <motion.div
              className="
                absolute
                w-[320px]
                h-[320px]
                sm:w-[500px]
                sm:h-[500px]
                lg:w-[700px]
                lg:h-[700px]
                "
              animate={{ rotate: 360 }}
              transition={{
                duration: 70,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {orbitOuter.map((deg, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transformOrigin: "center",
                    transform: `
                        translate(-50%, -50%)
                        rotate(${deg}deg)
                        translateX(${isMobile ? 140 : 270}px)
                    `,
                  }}
                >
                  <Makhana size={isMobile ? 36 : 60} />
                </div>
              ))}
            </motion.div>

            {/* MIDDLE ORBIT */}

            <motion.div
              className="
                absolute
                w-[230px]
                h-[230px]
                sm:w-[360px]
                sm:h-[360px]
                lg:w-[520px]
                lg:h-[520px]
                "
              animate={{ rotate: -360 }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {orbitMiddle.map((deg, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `rotate(${deg}deg) translateX(${isMobile ? 105 : 190}px)`,
                  }}
                >
                  <Makhana size={isMobile ? 28 : 48} />
                </div>
              ))}
            </motion.div>

            {/* INNER ORBIT */}

            <motion.div
              className="
                absolute
                w-[150px]
                h-[150px]
                sm:w-[250px]
                sm:h-[250px]
                lg:w-[360px]
                lg:h-[360px]
                "
              animate={{ rotate: 360 }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {orbitInner.map((deg, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `rotate(${deg}deg) translateX(${isMobile ? 65 : 125}px)`,
                  }}
                >
                  <Makhana size={isMobile ? 22 : 36} />
                </div>
              ))}
            </motion.div>

            {/* Floating Makhanas Around Product */}

            <motion.div
              className="hidden lg:block absolute right-[26%] bottom-[30%]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity }}
            >
              <Makhana size={44} />
            </motion.div>

            <motion.div
              className="hidden lg:block absolute left-[32%] bottom-[28%]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Makhana size={42} />
            </motion.div>

            {/* Product Image */}

            <motion.img
              src={HeroJar}
              alt="Makhana Jar"
              animate={{
                y: [0, -18, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                relative
                z-20
                w-[220px]
                sm:w-[300px]
                lg:w-[360px]
                
              "
              style={{
                filter: "drop-shadow(0px 40px 60px rgba(0,0,0,0.35))",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
