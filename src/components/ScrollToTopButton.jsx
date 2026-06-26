import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{
            opacity: 0,
            scale: 0.75,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: [1, 1.04, 1],
            y: [0, -10, 0],
          }}
          exit={{
            opacity: 0,
            scale: 0.75,
            y: 30,
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
            scale: 1.1,
            rotate: -8,
            transition: {
              duration: 0.25,
            },
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="fixed bottom-6 right-5 md:bottom-8 md:right-8 z-[999] group"
        >
          {/* Animated Glow */}
          <motion.span
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.45, 0.9, 0.45],
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

          {/* Button */}
          <div
            className="
              relative
              h-14
              w-14
              rounded-full

              bg-[#F8F3E7]/90
              backdrop-blur-xl

              border
              border-[#E4C06A]/50

              shadow-[0_15px_40px_rgba(0,0,0,0.18)]

              flex
              items-center
              justify-center

              overflow-hidden

              transition-all
              duration-300

              group-hover:shadow-[0_20px_50px_rgba(228,192,106,0.40)]
            "
          >
            {/* Premium Shine */}
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

            {/* Animated Arrow */}
            <motion.div
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <ChevronUp
                size={28}
                strokeWidth={2.8}
                className="
                  text-[#174C35]
                  drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]
                "
              />
            </motion.div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
// import { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { ChevronUp } from "lucide-react";

// export default function ScrollToTopButton() {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setVisible(window.scrollY > 350);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <AnimatePresence>
//       {visible && (
//         <motion.button
//           onClick={scrollToTop}
//           initial={{ opacity: 0, scale: 0.75, y: 30 }}
//           animate={{
//             opacity: 1,
//             scale: 1,
//             y: [0, -4, 0],
//           }}
//           exit={{ opacity: 0, scale: 0.75, y: 30 }}
//           transition={{
//             y: {
//               duration: 2,
//               repeat: Infinity,
//               ease: "easeInOut",
//             },
//             opacity: {
//               duration: 0.25,
//             },
//             scale: {
//               duration: 0.25,
//             },
//           }}
//           whileHover={{
//             scale: 1.08,
//             rotate: -8,
//           }}
//           whileTap={{
//             scale: 0.95,
//           }}
//           className="fixed bottom-6 right-5 md:bottom-8 md:right-8 z-[999] group"
//         >
//           {/* Soft Glow */}
//           <span
//             className="
//               absolute
//               inset-0
//               rounded-full
//               bg-[#E4C06A]/35
//               blur-2xl
//               scale-125
//               opacity-70
//               group-hover:opacity-100
//               transition-all
//               duration-300
//             "
//           />

//           {/* Button */}
//           <div
//             className="
//               relative
//               h-14
//               w-14
//               rounded-full

//               bg-[#F8F3E7]/90
//               backdrop-blur-xl

//               border
//               border-[#E4C06A]/50

//               shadow-[0_15px_40px_rgba(0,0,0,0.18)]

//               flex
//               items-center
//               justify-center

//               overflow-hidden

//               transition-all
//               duration-300

//               group-hover:shadow-[0_20px_50px_rgba(228,192,106,0.40)]
//             "
//           >
//             {/* Shine */}
//             <div
//               className="
//                 absolute
//                 inset-0
//                 bg-gradient-to-br
//                 from-white/70
//                 via-transparent
//                 to-transparent
//               "
//             />

//             {/* Arrow */}
//             <ChevronUp
//               size={28}
//               strokeWidth={2.8}
//               className="
//                 relative
//                 text-[#174C35]
//                 transition-all
//                 duration-300
//                 group-hover:-translate-y-1
//               "
//             />
//           </div>
//         </motion.button>
//       )}
//     </AnimatePresence>
//   );
// }
