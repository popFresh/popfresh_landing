import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/pop_logo_color_new2.png";

export default function Navbar({ alwaysCapsule = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (alwaysCapsule) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [alwaysCapsule]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isCapsule = alwaysCapsule || scrolled;

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 lg:px-10 pt-5">
      <motion.nav
        initial={false}
        animate={{
          width: isCapsule
            ? window.innerWidth < 768
              ? "100%"
              : "75%"
            : "100%",
          borderRadius: isCapsule ? "9999px" : "0px",
          y: isCapsule ? 10 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={`
          mx-auto
          px-5 md:px-8 lg:px-10
          ${
            isCapsule
              ? `
                py-3
                bg-[#174C35]/60
                backdrop-blur-xl
                border
                border-[#E4C06A]/15
                shadow-[0_10px_40px_rgba(0,0,0,0.20)]
              `
              : "py-4 bg-transparent"
          }
        `}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}

          <Link to="/" className="flex items-center">
            <motion.img
              src={logo}
              alt="Pop Fresh"
              initial={false}
              animate={{
                height: isCapsule ? 55 : 100,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="
                w-auto
                object-contain
                drop-shadow-[0_0_12px_rgba(228,192,106,0.2)]
              "
            />
          </Link>

          {/* Desktop Nav */}

          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => {
              const active = location.pathname === link.path;

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`
                    group
                    relative
                    text-[16px]
                    font-medium
                    transition-all
                    duration-300
                    hover:-translate-y-[1px]
                    hover:text-[#E4C06A]
                    ${isCapsule ? "text-[#F6F3EC]" : "text-white"}
                  `}
                >
                  {link.name}

                  <span
                    className={`
                      absolute
                      left-0
                      -bottom-1
                      h-[2px]
                      bg-[#E4C06A]
                      transition-all
                      duration-300
                      ${active ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger */}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`
              md:hidden
              flex
              items-center
              justify-center
              w-11
              h-11
              rounded-full
              ${isCapsule ? "text-white" : "text-white"}
            `}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              md:hidden
              mt-4
              rounded-[28px]
              bg-[#174C35]/90
              backdrop-blur-xl
              border
              border-[#E4C06A]/15
              overflow-hidden
            "
          >
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  block
                  px-6
                  py-5
                  text-white
                  border-b
                  border-white/10
                  transition-colors
                  hover:bg-white/5
                `}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Link, useLocation } from "react-router-dom";
// import logo from "../assets/pop_logo_color_new2.png";

// export default function Navbar({ alwaysCapsule = false }) {
//   const [scrolled, setScrolled] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     if (alwaysCapsule) return;

//     const handleScroll = () => {
//       setScrolled(window.scrollY > 80);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [alwaysCapsule]);

//   const links = [
//     { name: "Home", path: "/" },
//     { name: "Products", path: "/products" },
//     { name: "About", path: "/about" },
//     { name: "Contact", path: "/contact" },
//   ];

//   const isCapsule = alwaysCapsule || scrolled;

//   return (
//     <div className="fixed top-0 left-0 w-full z-50 px-6 lg:px-10 pt-5">
//       <motion.nav
//         initial={false}
//         animate={{
//           width: isCapsule ? "75%" : "100%",
//           borderRadius: isCapsule ? "9999px" : "0px",
//           y: isCapsule ? 10 : 0,
//         }}
//         transition={{
//           duration: 0.3,
//           ease: "easeInOut",
//         }}
//         className={`
//           mx-auto
//           px-8 lg:px-10
//           ${
//             isCapsule
//               ? `
//                 py-3
//                 bg-[#174C35]/50
//                 backdrop-blur-xl
//                 border
//                 border-[#E4C06A]/15
//                 shadow-[0_10px_40px_rgba(0,0,0,0.20)]
//               `
//               : "py-4 bg-transparent"
//           }
//         `}
//       >
//         <div className="flex items-center justify-between">
//           {/* Logo */}

//           <Link to="/" className="flex items-center">
//             <motion.img
//               src={logo}
//               alt="Pop Fresh"
//               initial={false}
//               animate={{
//                 height: isCapsule ? 55 : 100,
//               }}
//               transition={{
//                 duration: 0.3,
//                 ease: "easeInOut",
//               }}
//               className="
//                 w-auto
//                 object-contain
//                 drop-shadow-[0_0_12px_rgba(228,192,106,0.2)]
//               "
//             />
//           </Link>

//           {/* Desktop Navigation */}

//           <div className="hidden md:flex items-center gap-10">
//             {links.map((link) => {
//               const active = location.pathname === link.path;

//               return (
//                 <Link
//                   key={link.name}
//                   to={link.path}
//                   className={`
//                     group
//                     relative
//                     text-[16px]
//                     font-medium
//                     transition-all
//                     duration-300
//                     hover:-translate-y-[1px]
//                     hover:text-[#E4C06A]
//                     ${
//                       isCapsule
//                         ? "text-[#F6F3EC]"
//                         : "text-white"
//                     }
//                   `}
//                 >
//                   {link.name}

//                   <span
//                     className={`
//                       absolute
//                       left-0
//                       -bottom-1
//                       h-[2px]
//                       bg-[#E4C06A]
//                       transition-all
//                       duration-300
//                       ${
//                         active
//                           ? "w-full"
//                           : "w-0 group-hover:w-full"
//                       }
//                     `}
//                   />
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       </motion.nav>
//     </div>
//   );
// }
