import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

export default function InstagramCTA() {
  return (
    <section className="px-4 sm:px-6 py-16 md:py-20 bg-[#F6F3EC]">
      <div className="max-w-7xl mx-auto">
        <div
          className="
            relative
            overflow-hidden
            rounded-[28px]
            md:rounded-[42px]
            px-5
            sm:px-8
            md:px-14
            py-10
            md:py-12
          "
        >
          {/* Background */}

          <div
            className="
              absolute
              inset-0
              bg-[linear-gradient(135deg,#833AB4_0%,#C13584_30%,#E1306C_55%,#FD1D1D_75%,#FCAF45_100%)]
            "
          />

          {/* Glow Overlay */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]" />

          {/* Ambient Glow */}

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              top-1/2
              left-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-[280px]
              h-[280px]
              md:w-[500px]
              md:h-[500px]
              rounded-full
              bg-[#FFD37A]
              blur-[140px]
            "
          />

          {/* Floating Particles */}

          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: i % 2 ? 4 : 6,
                height: i % 2 ? 4 : 6,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                y: [0, -12, 0],
                x: [0, 4, 0],
              }}
              transition={{
                duration: 3 + i * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Watermark Instagram Icon */}

          <motion.div
            animate={{
              rotate: [0, 6, 0],
              opacity: [0.04, 0.08, 0.04],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              right-[-40px]
              bottom-[-40px]
              text-white
              hidden md:block
            "
          >
            <FaInstagram size={220} />
          </motion.div>

          {/* Content */}

          <div className="relative z-20 text-center max-w-3xl mx-auto px-2">
            {/* Badge */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-white/10
                backdrop-blur-md
                border
                border-white/20
                text-[#FFE8A3]
                text-[10px]
                sm:text-xs
                tracking-[0.15em]
              "
            >
              <FaInstagram size={14} />
              FOLLOW THE CRUNCH
            </div>

            {/* Heading */}

            <h2
              className="
                mt-6
                text-white
                text-3xl
                sm:text-4xl
                md:text-5xl
                leading-tight
              "
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Let's Connect On Instagram
            </h2>

            {/* Description */}

            <p
              className="
                mt-5
                text-base
                sm:text-lg
                leading-7
                sm:leading-8
                text-white/90
                max-w-2xl
                mx-auto
              "
            >
              Get flavour launches, behind-the-scenes moments, healthy snacking
              inspiration and exclusive offers straight from Pop Fresh.
            </p>

            {/* Social Proof */}

            <div
              className="
                flex
                flex-wrap
                justify-center
                gap-3
                sm:gap-4
                mt-6
                text-white/80
                text-xs
                sm:text-sm
              "
            >
              <span>New Launches</span>
              <span>•</span>
              <span>Healthy Snacking</span>
              <span>•</span>
              <span>Community</span>
            </div>

            {/* Instagram CTA */}

            <motion.a
              href="https://www.instagram.com/popfresh_official/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.04,
                y: -3,
              }}
              whileTap={{ scale: 0.96 }}
              className="
                inline-flex
                items-center
                justify-center
                gap-3
                mt-8
                rounded-full
                bg-white
                px-6
                sm:px-8
                py-3.5
                font-semibold
                text-sm
                sm:text-base
                text-[#E1306C]
                shadow-[0_10px_30px_rgba(0,0,0,0.15)]
              "
            >
              <FaInstagram className="text-2xl sm:text-3xl" />
              @popfresh_official
            </motion.a>

            {/* Bottom Trust Line */}

            <div
              className="
                flex
                flex-wrap
                justify-center
                gap-3
                sm:gap-6
                mt-10
                text-[11px]
                sm:text-sm
                tracking-[0.15em]
                text-[#F7F7F7]
              "
            >
              <span>NEW LAUNCHES</span>
              <span>•</span>
              <span>HEALTHY SNACKING</span>
              <span>•</span>
              <span>COMMUNITY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
