import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { ArrowRight } from "lucide-react";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getProducts } from "../api/product.api";

import ProductCTA from "../components/ProductCTA";
import ProductImageSlider from "../components/ProductImageSlider";
import BuyComboCTA from "../components/BuyComboCTA";

/* =====================================================
   PRODUCT CARD THEMES
===================================================== */

const CARD_THEMES = {
  GREEN: {
    background: "#EAF4EB",
    accent: "#3E8C57",
    text: "#184C35",
  },

  ORANGE: {
    background: "#F8E6DF",
    accent: "#E86A30",
    text: "#184C35",
  },

  RED: {
    background: "#FBE6E2",
    accent: "#D94E43",
    text: "#184C35",
  },

  PURPLE: {
    background: "#F3ECFD",
    accent: "#7C3AED",
    text: "#184C35",
  },

  CREAM: {
    background: "#FBF3DE",
    accent: "#D7A326",
    text: "#184C35",
  },
};

/* =====================================================
   PRODUCTS PAGE
===================================================== */

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===================================================
     FETCH PRODUCTS
  =================================================== */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await getProducts();

        /* -----------------------------------------------
           SORT BY DISPLAY ORDER
        ------------------------------------------------ */

        const sortedProducts = [...(data || [])].sort(
          (a, b) =>
            Number(a.displayOrder ?? 0) -
            Number(b.displayOrder ?? 0)
        );

        /* -----------------------------------------------
           MAP API DATA
        ------------------------------------------------ */

        const mapped = sortedProducts.map((product) => {
          const mrp = Number(product.price ?? 0);

          const sellingPrice = Number(
            product.discountPrice ??
              product.price ??
              0
          );

          return {
            ...product,

            title: product.name,

            sellingPrice,

            mrp,

            shortDescription:
              product.description,

            images: Array.isArray(product.images)
              ? product.images
                  .map((img) => img.imageUrl)
                  .filter(Boolean)
              : [],

            stock: Number(product.stock ?? 0),

            highlights:
              Array.isArray(product.highlights)
                ? product.highlights
                : [],

            badge:
              product.badge || "POPFRESH",

            theme:
              CARD_THEMES[product.cardTheme] ||
              CARD_THEMES.GREEN,
          };
        });

        setProducts(mapped);
      } catch (err) {
        console.error(
          "Failed to fetch products:",
          err
        );

        toast.error(
          err.response?.data?.message ||
            "Unable to load products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ===================================================
     UI
  =================================================== */

  return (
    <>
      <Navbar alwaysCapsule />

      <main className="min-h-screen bg-[#F6F3EC] pt-40 pb-24">
        <div className="mx-auto max-w-7xl px-6">

          {/* =================================================
              HERO
          ================================================= */}

          <section className="text-center">
            <span
              className="
                inline-flex
                rounded-full
                bg-[#E9E3D8]
                px-5
                py-2
                text-xs
                font-medium
                tracking-[0.18em]
                text-[#184C35]
              "
            >
              OUR PRODUCTS
            </span>

            <h1
              className="
                mt-6
                text-5xl
                text-[#184C35]
                md:text-7xl
              "
              style={{
                fontFamily: "Fraunces, serif",
              }}
            >
              Explore Every Crunch
            </h1>

            <p
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-lg
                leading-8
                text-[#667085]
              "
            >
              Crafted from premium fox nuts and
              roasted to perfection. Discover bold
              flavours made for guilt-free snacking.
            </p>
          </section>

          {/* =================================================
              BUILD YOUR OWN COMBO CTA
          ================================================= */}

          <BuyComboCTA />

          {/* =================================================
              PRODUCTS
          ================================================= */}

          {loading ? (
            /* ===============================================
               LOADING
            ================================================ */

            <div className="flex flex-col items-center py-28">
              <div className="flex gap-3">
                <span
                  className="
                    h-4
                    w-4
                    animate-bounce
                    rounded-full
                    bg-[#184C35]
                  "
                />

                <span
                  className="
                    h-4
                    w-4
                    animate-bounce
                    rounded-full
                    bg-[#3E8C57]
                  "
                  style={{
                    animationDelay: "150ms",
                  }}
                />

                <span
                  className="
                    h-4
                    w-4
                    animate-bounce
                    rounded-full
                    bg-[#D7A326]
                  "
                  style={{
                    animationDelay: "300ms",
                  }}
                />
              </div>

              <p
                className="
                  mt-8
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-[#184C35]
                "
              >
                Preparing your snacks...
              </p>
            </div>
          ) : (
            /* ===============================================
               PRODUCTS GRID
            ================================================ */

            <div
              className="
                mt-16
                grid
                gap-6
                md:grid-cols-2
                xl:grid-cols-4
              "
            >
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.slug}`}
                  onClick={(e) => {
                    if (product.stock <= 0) {
                      e.preventDefault();

                      toast.info(
                        "This product is currently out of stock."
                      );
                    }
                  }}
                  className={`
                    group
                    flex
                    h-full
                    flex-col
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-white/70
                    transition-all
                    duration-500

                    ${
                      product.stock > 0
                        ? `
                          cursor-pointer
                          hover:-translate-y-1.5
                          hover:shadow-[0_24px_55px_rgba(24,76,53,0.12)]
                        `
                        : `
                          cursor-not-allowed
                          opacity-90
                          grayscale-[0.1]
                        `
                    }
                  `}
                  style={{
                    background:
                      product.theme.background,
                  }}
                >
                  {/* =========================================
                      TOP CONTENT
                  ========================================== */}

                  <div className="p-4 pb-0 sm:p-5 sm:pb-0">

                    {/* BADGE */}

                    <div className="flex items-center justify-between">
                      <span
                        className="
                          inline-flex
                          rounded-full
                          px-3.5
                          py-1.5
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.15em]
                          text-white
                        "
                        style={{
                          background:
                            product.theme.accent,
                        }}
                      >
                        {product.badge}
                      </span>
                    </div>
                  </div>

                  {/* =========================================
                      IMAGE
                  ========================================== */}

                  <div className="px-4 pt-4 sm:px-5 sm:pt-5">
                    <div
                      className="
                        relative
                        h-[250px]
                        overflow-visible
                        rounded-[22px]
                        bg-white/45
                        ring-1
                        ring-black/[0.025]
                        transition-transform
                        duration-500
                        group-hover:scale-[1.01]

                        [&_img]:h-full
                        [&_img]:w-full
                        [&_img]:object-contain
                        [&_img]:p-3
                      "
                    >
                      <ProductImageSlider
                        images={product.images}
                        title={product.title}
                      />

                      {/* IMAGE OVERLAY */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          rounded-[22px]
                          bg-gradient-to-t
                          from-black/[0.025]
                          via-transparent
                          to-white/[0.08]
                        "
                      />

                      {/* SOLD OUT */}

                      {product.stock <= 0 && (
                        <div
                          className="
                            absolute
                            inset-0
                            z-20
                            flex
                            items-center
                            justify-center
                            rounded-[22px]
                            bg-[#184C35]/45
                            backdrop-blur-[2px]
                          "
                        >
                          <span
                            className="
                              rounded-full
                              bg-white
                              px-5
                              py-2
                              text-xs
                              font-bold
                              uppercase
                              tracking-[0.14em]
                              text-[#184C35]
                              shadow-lg
                            "
                          >
                            Sold Out
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* =========================================
                      CONTENT
                  ========================================== */}

                  <div className="flex flex-1 flex-col p-5">

                    {/* PRODUCT NAME */}

                    <h3
                      className="
                        text-[25px]
                        leading-tight
                        text-[#184C35]
                        mt-6
                      "
                      style={{
                        fontFamily:
                          "Fraunces, serif",
                      }}
                    >
                      {product.title}
                    </h3>

                    {/* DESCRIPTION */}

                    <p
                      className="
                        mt-2.5
                        line-clamp-2
                        min-h-[48px]
                        text-[14px]
                        leading-6
                        text-[#667085]
                      "
                    >
                      {product.shortDescription}
                    </p>

                    {/* =======================================
                        HIGHLIGHTS
                    ======================================== */}

                    {product.highlights?.length > 0 && (
                      <div
                        className="
                          mt-4
                          flex
                          min-h-[28px]
                          flex-wrap
                          gap-1.5
                        "
                      >
                        {product.highlights
                          .slice(0, 3)
                          .map((tag) => (
                            <span
                              key={tag}
                              className="
                                rounded-full
                                bg-white/80
                                px-2.5
                                py-1
                                text-[11px]
                                font-medium
                                text-[#184C35]
                                ring-1
                                ring-[#184C35]/5
                              "
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    )}

                    {/* =======================================
                        PRICE + CTA AREA
                    ======================================== */}

                    <div className="mt-auto pt-5">

                      {/* PRICE */}

                      <div
                        className="
                          flex
                          items-end
                          justify-between
                          gap-3
                        "
                      >
                        <div className="flex items-baseline gap-2">
                          <span
                            className="
                              text-[26px]
                              font-bold
                              tracking-tight
                              text-[#184C35]
                            "
                          >
                            ₹
                            {product.sellingPrice.toLocaleString(
                              "en-IN"
                            )}
                          </span>

                          {product.mrp >
                            product.sellingPrice && (
                            <span
                              className="
                                text-sm
                                text-[#667085]/60
                                line-through
                              "
                            >
                              ₹
                              {product.mrp.toLocaleString(
                                "en-IN"
                              )}
                            </span>
                          )}
                        </div>

                        {product.mrp >
                          product.sellingPrice && (
                          <span
                            className="
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-wide
                            "
                            style={{
                              color:
                                product.theme.accent,
                            }}
                          >
                            Save ₹
                            {(
                              product.mrp -
                              product.sellingPrice
                            ).toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      {/* =======================================
                          BUY NOW
                      ======================================== */}

                      <button
                        type="button"
                        disabled={product.stock <= 0}
                        className={`
                          group/btn
                          mt-4
                          inline-flex
                          w-full
                          items-center
                          justify-between
                          rounded-full
                          px-5
                          py-3.5
                          text-sm
                          font-semibold
                          transition-all
                          duration-300

                          ${
                            product.stock <= 0
                              ? `
                                cursor-not-allowed
                                bg-gray-400
                                text-white
                              `
                              : `
                                text-white
                                hover:shadow-[0_10px_25px_rgba(24,76,53,0.15)]
                              `
                          }
                        `}
                        style={
                          product.stock > 0
                            ? {
                                background:
                                  product.theme
                                    .accent,
                              }
                            : {}
                        }
                      >
                        <span>
                          {product.stock > 0
                            ? "Buy Now"
                            : "Sold Out"}
                        </span>

                        {product.stock > 0 && (
                          <span
                            className="
                              flex
                              h-7
                              w-7
                              items-center
                              justify-center
                              rounded-full
                              bg-white/15
                              transition-all
                              duration-300
                              group-hover/btn:bg-white/25
                            "
                          >
                            <ArrowRight
                              size={16}
                              className="
                                transition-transform
                                duration-300
                                group-hover/btn:translate-x-0.5
                              "
                            />
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* =====================================================
          BOTTOM PRODUCT CTA
      ===================================================== */}

      <ProductCTA />

      <Footer />
    </>
  );
}

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// import { ArrowRight } from "lucide-react";

// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// import { getProducts } from "../api/product.api";

// import ProductCTA from "../components/ProductCTA";
// import ProductImageSlider from "../components/ProductImageSlider";
// import BuyComboCTA from "../components/BuyComboCTA";

// /* =====================================================
//    PRODUCT CARD THEMES
// ===================================================== */

// const CARD_THEMES = {
//   GREEN: {
//     background: "#EAF4EB",
//     accent: "#3E8C57",
//     text: "#184C35",
//   },

//   ORANGE: {
//     background: "#F8E6DF",
//     accent: "#E86A30",
//     text: "#184C35",
//   },

//   RED: {
//     background: "#FBE6E2",
//     accent: "#D94E43",
//     text: "#184C35",
//   },

//   PURPLE: {
//     background: "#F3ECFD",
//     accent: "#7C3AED",
//     text: "#184C35",
//   },

//   CREAM: {
//     background: "#FBF3DE",
//     accent: "#D7A326",
//     text: "#184C35",
//   },
// };

// /* =====================================================
//    PRODUCTS PAGE
// ===================================================== */

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* ===================================================
//      FETCH PRODUCTS
//   =================================================== */

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);

//         const data = await getProducts();

//         /* -----------------------------------------------
//            SORT BY DISPLAY ORDER
//         ------------------------------------------------ */

//         const sortedProducts = [...(data || [])].sort(
//           (a, b) =>
//             Number(a.displayOrder ?? 0) -
//             Number(b.displayOrder ?? 0)
//         );

//         /* -----------------------------------------------
//            MAP API DATA
//         ------------------------------------------------ */

//         const mapped = sortedProducts.map((product) => {
//           const mrp = Number(product.price ?? 0);

//           const sellingPrice = Number(
//             product.discountPrice ??
//               product.price ??
//               0
//           );

//           return {
//             ...product,

//             title: product.name,

//             sellingPrice,

//             mrp,

//             shortDescription:
//               product.description,

//             images: Array.isArray(product.images)
//               ? product.images
//                   .map((img) => img.imageUrl)
//                   .filter(Boolean)
//               : [],

//             stock: Number(product.stock ?? 0),

//             highlights:
//               Array.isArray(product.highlights)
//                 ? product.highlights
//                 : [],

//             badge:
//               product.badge || "POPFRESH",

//             theme:
//               CARD_THEMES[product.cardTheme] ||
//               CARD_THEMES.GREEN,
//           };
//         });

//         setProducts(mapped);
//       } catch (err) {
//         console.error(
//           "Failed to fetch products:",
//           err
//         );

//         toast.error(
//           err.response?.data?.message ||
//             "Unable to load products."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   /* ===================================================
//      UI
//   =================================================== */

//   return (
//     <>
//       <Navbar alwaysCapsule />

//       <main className="min-h-screen bg-[#F6F3EC] pt-40 pb-24">
//         <div className="mx-auto max-w-7xl px-6">

//           {/* =================================================
//               HERO
//           ================================================= */}

//           <section className="text-center">
//             <span
//               className="
//                 inline-flex
//                 rounded-full
//                 bg-[#E9E3D8]
//                 px-5
//                 py-2
//                 text-xs
//                 font-medium
//                 tracking-[0.18em]
//                 text-[#184C35]
//               "
//             >
//               OUR PRODUCTS
//             </span>

//             <h1
//               className="
//                 mt-6
//                 text-5xl
//                 text-[#184C35]
//                 md:text-7xl
//               "
//               style={{
//                 fontFamily: "Fraunces, serif",
//               }}
//             >
//               Explore Every Crunch
//             </h1>

//             <p
//               className="
//                 mx-auto
//                 mt-6
//                 max-w-2xl
//                 text-lg
//                 leading-8
//                 text-[#667085]
//               "
//             >
//               Crafted from premium fox nuts and
//               roasted to perfection. Discover bold
//               flavours made for guilt-free snacking.
//             </p>
//           </section>

//           {/* =================================================
//               BUILD YOUR OWN COMBO CTA
//           ================================================= */}

//           <BuyComboCTA />

//           {/* =================================================
//               PRODUCTS
//           ================================================= */}

//           {loading ? (
//             /* ===============================================
//                LOADING
//             ================================================ */

//             <div className="flex flex-col items-center py-28">
//               <div className="flex gap-3">
//                 <span
//                   className="
//                     h-4
//                     w-4
//                     animate-bounce
//                     rounded-full
//                     bg-[#184C35]
//                   "
//                 />

//                 <span
//                   className="
//                     h-4
//                     w-4
//                     animate-bounce
//                     rounded-full
//                     bg-[#3E8C57]
//                   "
//                   style={{
//                     animationDelay: "150ms",
//                   }}
//                 />

//                 <span
//                   className="
//                     h-4
//                     w-4
//                     animate-bounce
//                     rounded-full
//                     bg-[#D7A326]
//                   "
//                   style={{
//                     animationDelay: "300ms",
//                   }}
//                 />
//               </div>

//               <p
//                 className="
//                   mt-8
//                   text-sm
//                   uppercase
//                   tracking-[0.2em]
//                   text-[#184C35]
//                 "
//               >
//                 Preparing your snacks...
//               </p>
//             </div>
//           ) : (
//             /* ===============================================
//                PRODUCTS GRID
//             ================================================ */

//             <div
//               className="
//                 mt-16
//                 grid
//                 gap-6
//                 md:grid-cols-2
//                 xl:grid-cols-4
//               "
//             >
//               {products.map((product) => (
//                 <Link
//                   key={product.id}
//                   to={`/products/${product.slug}`}
//                   onClick={(e) => {
//                     if (product.stock <= 0) {
//                       e.preventDefault();

//                       toast.info(
//                         "This product is currently out of stock."
//                       );
//                     }
//                   }}
//                   className={`
//                     group
//                     flex
//                     h-full
//                     flex-col
//                     overflow-hidden
//                     rounded-[28px]
//                     border
//                     border-white/70
//                     transition-all
//                     duration-500

//                     ${
//                       product.stock > 0
//                         ? `
//                           cursor-pointer
//                           hover:-translate-y-1.5
//                           hover:shadow-[0_24px_55px_rgba(24,76,53,0.12)]
//                         `
//                         : `
//                           cursor-not-allowed
//                           opacity-90
//                           grayscale-[0.1]
//                         `
//                     }
//                   `}
//                   style={{
//                     background:
//                       product.theme.background,
//                   }}
//                 >
//                   {/* =========================================
//                       TOP CONTENT
//                   ========================================== */}

//                   <div className="p-4 pb-0 sm:p-5 sm:pb-0">

//                     {/* BADGE */}

//                     <div className="flex items-center justify-between">
//                       <span
//                         className="
//                           inline-flex
//                           rounded-full
//                           px-3.5
//                           py-1.5
//                           text-[10px]
//                           font-bold
//                           uppercase
//                           tracking-[0.15em]
//                           text-white
//                         "
//                         style={{
//                           background:
//                             product.theme.accent,
//                         }}
//                       >
//                         {product.badge}
//                       </span>

                      

                      
//                     </div>
//                   </div>

//                   {/* =========================================
//                       IMAGE
//                   ========================================== */}

//                   <div className="px-4 pt-4 sm:px-5 sm:pt-5">
//                     <div
//                       className="
//                         relative
//                         h-[225px]
//                         overflow-hidden
//                         rounded-[22px]
//                         bg-white/45
//                         ring-1
//                         ring-black/[0.025]
//                         transition-transform
//                         duration-500
//                         group-hover:scale-[1.01]
//                       "
//                     >
//                       <ProductImageSlider
//                         images={product.images}
//                         title={product.title}
//                       />

//                       {/* IMAGE OVERLAY */}

//                       <div
//                         className="
//                           pointer-events-none
//                           absolute
//                           inset-0
//                           bg-gradient-to-t
//                           from-black/[0.025]
//                           via-transparent
//                           to-white/[0.08]
//                         "
//                       />

//                       {/* SOLD OUT */}

//                       {product.stock <= 0 && (
//                         <div
//                           className="
//                             absolute
//                             inset-0
//                             flex
//                             items-center
//                             justify-center
//                             bg-[#184C35]/45
//                             backdrop-blur-[2px]
//                           "
//                         >
//                           <span
//                             className="
//                               rounded-full
//                               bg-white
//                               px-5
//                               py-2
//                               text-xs
//                               font-bold
//                               uppercase
//                               tracking-[0.14em]
//                               text-[#184C35]
//                               shadow-lg
//                             "
//                           >
//                             Sold Out
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* =========================================
//                       CONTENT
//                   ========================================== */}

//                   <div className="flex flex-1 flex-col p-5">

//                     {/* PRODUCT NAME */}

//                     <h3
//                       className="
//                         text-[25px]
//                         leading-tight
//                         text-[#184C35]
//                       "
//                       style={{
//                         fontFamily:
//                           "Fraunces, serif",
//                       }}
//                     >
//                       {product.title}
//                     </h3>

//                     {/* DESCRIPTION */}

//                     <p
//                       className="
//                         mt-2.5
//                         line-clamp-2
//                         min-h-[48px]
//                         text-[14px]
//                         leading-6
//                         text-[#667085]
//                       "
//                     >
//                       {product.shortDescription}
//                     </p>

//                     {/* =======================================
//                         HIGHLIGHTS
//                     ======================================== */}

//                     {product.highlights?.length > 0 && (
//                       <div
//                         className="
//                           mt-4
//                           flex
//                           min-h-[28px]
//                           flex-wrap
//                           gap-1.5
//                         "
//                       >
//                         {product.highlights
//                           .slice(0, 3)
//                           .map((tag) => (
//                             <span
//                               key={tag}
//                               className="
//                                 rounded-full
//                                 bg-white/80
//                                 px-2.5
//                                 py-1
//                                 text-[11px]
//                                 font-medium
//                                 text-[#184C35]
//                                 ring-1
//                                 ring-[#184C35]/5
//                               "
//                             >
//                               {tag}
//                             </span>
//                           ))}
//                       </div>
//                     )}

//                     {/* =======================================
//                         PRICE + CTA AREA
//                     ======================================== */}

//                     <div className="mt-auto pt-5">

//                       {/* PRICE */}

//                       <div
//                         className="
//                           flex
//                           items-end
//                           justify-between
//                           gap-3
//                         "
//                       >
//                         <div className="flex items-baseline gap-2">
//                           <span
//                             className="
//                               text-[26px]
//                               font-bold
//                               tracking-tight
//                               text-[#184C35]
//                             "
//                           >
//                             ₹
//                             {product.sellingPrice.toLocaleString(
//                               "en-IN"
//                             )}
//                           </span>

//                           {product.mrp >
//                             product.sellingPrice && (
//                             <span
//                               className="
//                                 text-sm
//                                 text-[#667085]/60
//                                 line-through
//                               "
//                             >
//                               ₹
//                               {product.mrp.toLocaleString(
//                                 "en-IN"
//                               )}
//                             </span>
//                           )}
//                         </div>

//                         {product.mrp >
//                           product.sellingPrice && (
//                           <span
//                             className="
//                               text-[10px]
//                               font-bold
//                               uppercase
//                               tracking-wide
//                             "
//                             style={{
//                               color:
//                                 product.theme.accent,
//                             }}
//                           >
//                             Save ₹
//                             {(
//                               product.mrp -
//                               product.sellingPrice
//                             ).toLocaleString("en-IN")}
//                           </span>
//                         )}
//                       </div>

//                       {/* =======================================
//                           BUY NOW
//                       ======================================== */}

//                       <button
//                         type="button"
//                         disabled={product.stock <= 0}
//                         className={`
//                           group/btn
//                           mt-4
//                           inline-flex
//                           w-full
//                           items-center
//                           justify-between
//                           rounded-full
//                           px-5
//                           py-3.5
//                           text-sm
//                           font-semibold
//                           transition-all
//                           duration-300

//                           ${
//                             product.stock <= 0
//                               ? `
//                                 cursor-not-allowed
//                                 bg-gray-400
//                                 text-white
//                               `
//                               : `
//                                 text-white
//                                 hover:shadow-[0_10px_25px_rgba(24,76,53,0.15)]
//                               `
//                           }
//                         `}
//                         style={
//                           product.stock > 0
//                             ? {
//                                 background:
//                                   product.theme
//                                     .accent,
//                               }
//                             : {}
//                         }
//                       >
//                         <span>
//                           {product.stock > 0
//                             ? "Buy Now"
//                             : "Sold Out"}
//                         </span>

//                         {product.stock > 0 && (
//                           <span
//                             className="
//                               flex
//                               h-7
//                               w-7
//                               items-center
//                               justify-center
//                               rounded-full
//                               bg-white/15
//                               transition-all
//                               duration-300
//                               group-hover/btn:bg-white/25
//                             "
//                           >
//                             <ArrowRight
//                               size={16}
//                               className="
//                                 transition-transform
//                                 duration-300
//                                 group-hover/btn:translate-x-0.5
//                               "
//                             />
//                           </span>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>

//       {/* =====================================================
//           BOTTOM PRODUCT CTA
//       ===================================================== */}

//       <ProductCTA />

//       <Footer />
//     </>
//   );
// }
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// import {
//   ArrowRight,
//   Sparkles,
//   Check,
//   ShoppingBag,
// } from "lucide-react";

// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// import { getProducts } from "../api/product.api";

// import ProductCTA from "../components/ProductCTA";
// import ProductImageSlider from "../components/ProductImageSlider";

// /* =====================================================
//    PRODUCT CARD THEMES
// ===================================================== */

// const CARD_THEMES = {
//   GREEN: {
//     background: "#EAF4EB",
//     accent: "#3E8C57",
//     text: "#184C35",
//   },

//   ORANGE: {
//     background: "#F8E6DF",
//     accent: "#E86A30",
//     text: "#184C35",
//   },

//   RED: {
//     background: "#FBE6E2",
//     accent: "#D94E43",
//     text: "#184C35",
//   },

//   PURPLE: {
//     background: "#F3ECFD",
//     accent: "#7C3AED",
//     text: "#184C35",
//   },

//   CREAM: {
//     background: "#FBF3DE",
//     accent: "#D7A326",
//     text: "#184C35",
//   },
// };

// /* =====================================================
//    PRODUCTS PAGE
// ===================================================== */

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* ===================================================
//      FETCH PRODUCTS
//   =================================================== */

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);

//         const data = await getProducts();

//         /* -----------------------------------------------
//            SORT BY DISPLAY ORDER
//         ------------------------------------------------ */

//         const sortedProducts = [...(data || [])].sort(
//           (a, b) =>
//             Number(a.displayOrder ?? 0) -
//             Number(b.displayOrder ?? 0)
//         );

//         /* -----------------------------------------------
//            MAP API DATA
//         ------------------------------------------------ */

//         const mapped = sortedProducts.map((product) => {
//           const mrp = Number(product.price ?? 0);

//           const sellingPrice = Number(
//             product.discountPrice ??
//               product.price ??
//               0
//           );

//           return {
//             ...product,

//             title: product.name,

//             sellingPrice,

//             mrp,

//             shortDescription:
//               product.description,

//             images: Array.isArray(product.images)
//               ? product.images
//                   .map((img) => img.imageUrl)
//                   .filter(Boolean)
//               : [],

//             stock: Number(product.stock ?? 0),

//             highlights:
//               Array.isArray(product.highlights)
//                 ? product.highlights
//                 : [],

//             badge:
//               product.badge || "POPFRESH",

//             theme:
//               CARD_THEMES[product.cardTheme] ||
//               CARD_THEMES.GREEN,
//           };
//         });

//         setProducts(mapped);
//       } catch (err) {
//         console.error(
//           "Failed to fetch products:",
//           err
//         );

//         toast.error(
//           err.response?.data?.message ||
//             "Unable to load products."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   /* ===================================================
//      UI
//   =================================================== */

//   return (
//     <>
//       <Navbar alwaysCapsule />

//       <main className="min-h-screen bg-[#F6F3EC] pt-40 pb-24">
//         <div className="mx-auto max-w-7xl px-6">

//           {/* =================================================
//               HERO
//           ================================================= */}

//           <section className="text-center">
//             <span
//               className="
//                 inline-flex
//                 rounded-full
//                 bg-[#E9E3D8]
//                 px-5
//                 py-2
//                 text-xs
//                 font-medium
//                 tracking-[0.18em]
//                 text-[#184C35]
//               "
//             >
//               OUR PRODUCTS
//             </span>

//             <h1
//               className="
//                 mt-6
//                 text-5xl
//                 text-[#184C35]
//                 md:text-7xl
//               "
//               style={{
//                 fontFamily: "Fraunces, serif",
//               }}
//             >
//               Explore Every Crunch
//             </h1>

//             <p
//               className="
//                 mx-auto
//                 mt-6
//                 max-w-2xl
//                 text-lg
//                 leading-8
//                 text-[#667085]
//               "
//             >
//               Crafted from premium fox nuts and
//               roasted to perfection. Discover bold
//               flavours made for guilt-free snacking.
//             </p>
//           </section>

//           {/* =================================================
//               BUILD YOUR OWN COMBO
//           ================================================= */}

//           <section className="mt-16">
//             <Link
//               to="/build-your-combo"
//               className="
//                 group
//                 relative
//                 block
//                 overflow-hidden
//                 rounded-[40px]
//                 bg-[#184C35]
//                 shadow-[0_25px_70px_rgba(24,76,53,0.16)]
//                 transition-all
//                 duration-500
//                 hover:-translate-y-1
//                 hover:shadow-[0_35px_90px_rgba(24,76,53,0.22)]
//               "
//             >
//               {/* =================================================
//                   DECORATIVE BACKGROUND
//               ================================================= */}

//               <div
//                 className="
//                   pointer-events-none
//                   absolute
//                   -right-24
//                   -top-32
//                   h-80
//                   w-80
//                   rounded-full
//                   bg-[#3E8C57]/30
//                   blur-3xl
//                   transition-transform
//                   duration-700
//                   group-hover:scale-110
//                 "
//               />

//               <div
//                 className="
//                   pointer-events-none
//                   absolute
//                   -bottom-40
//                   right-1/3
//                   h-80
//                   w-80
//                   rounded-full
//                   bg-[#D7A326]/20
//                   blur-3xl
//                 "
//               />

//               <div
//                 className="
//                   pointer-events-none
//                   absolute
//                   -left-20
//                   bottom-0
//                   h-48
//                   w-48
//                   rounded-full
//                   bg-[#E86A30]/10
//                   blur-3xl
//                 "
//               />

//               {/* =================================================
//                   CONTENT
//               ================================================= */}

//               <div
//                 className="
//                   relative
//                   grid
//                   gap-10
//                   px-7
//                   py-9
//                   md:grid-cols-[1fr_auto]
//                   md:items-center
//                   md:px-12
//                   md:py-11
//                 "
//               >
//                 {/* =================================================
//                     LEFT CONTENT
//                 ================================================= */}

//                 <div>
//                   {/* Small offer label */}

//                   <div
//                     className="
//                       inline-flex
//                       items-center
//                       gap-2
//                       rounded-full
//                       border
//                       border-[#F6F3EC]/15
//                       bg-white/10
//                       px-4
//                       py-2
//                       text-[11px]
//                       font-semibold
//                       uppercase
//                       tracking-[0.16em]
//                       text-[#F8E6DF]
//                     "
//                   >
//                     <Sparkles size={14} />

//                     Mix. Match. Munch.
//                   </div>

//                   {/* Heading */}

//                   <h2
//                     className="
//                       mt-5
//                       max-w-2xl
//                       text-4xl
//                       leading-[1.05]
//                       tracking-tight
//                       text-white
//                       sm:text-5xl
//                       md:text-6xl
//                     "
//                     style={{
//                       fontFamily:
//                         "Fraunces, serif",
//                     }}
//                   >
//                     Your snacks.
//                     <br />

//                     <span className="text-[#D7A326]">
//                       Your perfect combo.
//                     </span>
//                   </h2>

//                   {/* Description */}

//                   <p
//                     className="
//                       mt-5
//                       max-w-xl
//                       text-base
//                       leading-7
//                       text-white/70
//                       md:text-lg
//                     "
//                   >
//                     Choose your favourite PopFresh
//                     flavours and create a box made
//                     just for you.
//                   </p>

//                   {/* =================================================
//                       PACK OPTIONS
//                   ================================================= */}

//                   <div
//                     className="
//                       mt-7
//                       flex
//                       flex-wrap
//                       gap-3
//                     "
//                   >
//                     {/* Pack 2 */}

//                     <div
//                       className="
//                         inline-flex
//                         items-center
//                         gap-2
//                         rounded-full
//                         bg-white/10
//                         px-4
//                         py-2.5
//                         text-sm
//                         font-medium
//                         text-white
//                       "
//                     >
//                       <span
//                         className="
//                           flex
//                           h-5
//                           w-5
//                           items-center
//                           justify-center
//                           rounded-full
//                           bg-[#3E8C57]
//                         "
//                       >
//                         <Check size={12} />
//                       </span>

//                       Pack of 2
//                     </div>

//                     {/* Pack 3 */}

//                     <div
//                       className="
//                         inline-flex
//                         items-center
//                         gap-2
//                         rounded-full
//                         bg-white/10
//                         px-4
//                         py-2.5
//                         text-sm
//                         font-medium
//                         text-white
//                       "
//                     >
//                       <span
//                         className="
//                           flex
//                           h-5
//                           w-5
//                           items-center
//                           justify-center
//                           rounded-full
//                           bg-[#3E8C57]
//                         "
//                       >
//                         <Check size={12} />
//                       </span>

//                       Pack of 3
//                     </div>

//                     {/* Pack 4 */}

//                     <div
//                       className="
//                         inline-flex
//                         items-center
//                         gap-2
//                         rounded-full
//                         bg-white/10
//                         px-4
//                         py-2.5
//                         text-sm
//                         font-medium
//                         text-white
//                       "
//                     >
//                       <span
//                         className="
//                           flex
//                           h-5
//                           w-5
//                           items-center
//                           justify-center
//                           rounded-full
//                           bg-[#3E8C57]
//                         "
//                       >
//                         <Check size={12} />
//                       </span>

//                       Pack of 4
//                     </div>
//                   </div>
//                 </div>

//                 {/* =================================================
//                     RIGHT SHOPPING CARD
//                 ================================================= */}

//                 <div
//                   className="
//                     relative
//                     w-full
//                     md:w-[270px]
//                   "
//                 >
//                   <div
//                     className="
//                       overflow-hidden
//                       rounded-[28px]
//                       bg-[#F6F3EC]
//                       p-5
//                       shadow-2xl
//                       transition-transform
//                       duration-500
//                       group-hover:scale-[1.025]
//                     "
//                   >
//                     {/* Top */}

//                     <div className="flex items-start justify-between">
//                       <div>
//                         <p
//                           className="
//                             text-[10px]
//                             font-semibold
//                             uppercase
//                             tracking-[0.16em]
//                             text-[#667085]
//                           "
//                         >
//                           CUSTOM BOX
//                         </p>

//                         <p
//                           className="
//                             mt-1
//                             text-xl
//                             font-semibold
//                             text-[#184C35]
//                           "
//                           style={{
//                             fontFamily:
//                               "Fraunces, serif",
//                           }}
//                         >
//                           Pick your favourites
//                         </p>
//                       </div>

//                       <div
//                         className="
//                           flex
//                           h-11
//                           w-11
//                           items-center
//                           justify-center
//                           rounded-2xl
//                           bg-[#EAF4EB]
//                           text-[#3E8C57]
//                         "
//                       >
//                         <ShoppingBag size={21} />
//                       </div>
//                     </div>

//                     {/* Fake flavour preview */}

//                     <div className="mt-6 flex items-center">
//                       <div
//                         className="
//                           flex
//                           h-14
//                           w-14
//                           items-center
//                           justify-center
//                           rounded-full
//                           border-4
//                           border-[#F6F3EC]
//                           bg-[#E86A30]
//                           text-lg
//                           font-bold
//                           text-white
//                           shadow-sm
//                         "
//                       >
//                         +
//                       </div>

//                       <div
//                         className="
//                           -ml-3
//                           flex
//                           h-14
//                           w-14
//                           items-center
//                           justify-center
//                           rounded-full
//                           border-4
//                           border-[#F6F3EC]
//                           bg-[#D7A326]
//                           text-lg
//                           font-bold
//                           text-white
//                           shadow-sm
//                         "
//                       >
//                         +
//                       </div>

//                       <div
//                         className="
//                           -ml-3
//                           flex
//                           h-14
//                           w-14
//                           items-center
//                           justify-center
//                           rounded-full
//                           border-4
//                           border-[#F6F3EC]
//                           bg-[#3E8C57]
//                           text-lg
//                           font-bold
//                           text-white
//                           shadow-sm
//                         "
//                       >
//                         +
//                       </div>

//                       <div
//                         className="
//                           -ml-3
//                           flex
//                           h-14
//                           w-14
//                           items-center
//                           justify-center
//                           rounded-full
//                           border-4
//                           border-[#F6F3EC]
//                           bg-[#D94E43]
//                           text-lg
//                           font-bold
//                           text-white
//                           shadow-sm
//                         "
//                       >
//                         +
//                       </div>
//                     </div>

//                     {/* Divider */}

//                     <div className="my-5 border-t border-[#E4DED3]" />

//                     {/* CTA */}

//                     <div
//                       className="
//                         flex
//                         items-center
//                         justify-between
//                         rounded-full
//                         bg-[#184C35]
//                         px-5
//                         py-3.5
//                         text-sm
//                         font-semibold
//                         text-white
//                         transition-all
//                         duration-300
//                         group-hover:bg-[#215F42]
//                       "
//                     >
//                       <span>
//                         Build My Combo
//                       </span>

//                       <span
//                         className="
//                           flex
//                           h-8
//                           w-8
//                           items-center
//                           justify-center
//                           rounded-full
//                           bg-white/10
//                         "
//                       >
//                         <ArrowRight
//                           size={17}
//                           className="
//                             transition-transform
//                             duration-300
//                             group-hover:translate-x-0.5
//                           "
//                         />
//                       </span>
//                     </div>
//                   </div>

//                   {/* Floating save badge */}

//                   <div
//                     className="
//                       absolute
//                       -right-3
//                       -top-4
//                       rotate-3
//                       rounded-full
//                       bg-[#D7A326]
//                       px-4
//                       py-2
//                       text-xs
//                       font-bold
//                       uppercase
//                       tracking-wide
//                       text-[#184C35]
//                       shadow-lg
//                       transition-transform
//                       duration-300
//                       group-hover:rotate-6
//                     "
//                   >
//                     Made for you
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </section>

//           {/* =================================================
//               PRODUCTS
//           ================================================= */}

//           {loading ? (
//             /* ===============================================
//                LOADING
//             ================================================ */

//             <div className="flex flex-col items-center py-28">
//               <div className="flex gap-3">
//                 <span
//                   className="
//                     h-4
//                     w-4
//                     animate-bounce
//                     rounded-full
//                     bg-[#184C35]
//                   "
//                 />

//                 <span
//                   className="
//                     h-4
//                     w-4
//                     animate-bounce
//                     rounded-full
//                     bg-[#3E8C57]
//                   "
//                   style={{
//                     animationDelay: "150ms",
//                   }}
//                 />

//                 <span
//                   className="
//                     h-4
//                     w-4
//                     animate-bounce
//                     rounded-full
//                     bg-[#D7A326]
//                   "
//                   style={{
//                     animationDelay: "300ms",
//                   }}
//                 />
//               </div>

//               <p
//                 className="
//                   mt-8
//                   text-sm
//                   uppercase
//                   tracking-[0.2em]
//                   text-[#184C35]
//                 "
//               >
//                 Preparing your snacks...
//               </p>
//             </div>
//           ) : (
//             /* ===============================================
//                PRODUCTS GRID
//             ================================================ */

//             <div
//               className="
//                 mt-20
//                 grid
//                 gap-8
//                 md:grid-cols-2
//                 xl:grid-cols-4
//               "
//             >
//               {products.map((product) => (
//                 <Link
//                   key={product.id}
//                   to={`/products/${product.slug}`}
//                   onClick={(e) => {
//                     if (product.stock <= 0) {
//                       e.preventDefault();

//                       toast.info(
//                         "This product is currently out of stock."
//                       );
//                     }
//                   }}
//                   className={`
//                     group
//                     flex
//                     flex-col
//                     overflow-hidden
//                     rounded-[32px]
//                     transition-all
//                     duration-300

//                     ${
//                       product.stock > 0
//                         ? "hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
//                         : "cursor-not-allowed opacity-95 grayscale-[0.15]"
//                     }
//                   `}
//                   style={{
//                     background:
//                       product.theme.background,
//                   }}
//                 >
//                   {/* =========================================
//                       BADGE
//                   ========================================== */}

//                   <div className="p-6 pb-0">
//                     <span
//                       className="
//                         inline-flex
//                         rounded-full
//                         px-4
//                         py-2
//                         text-[11px]
//                         font-medium
//                         tracking-[0.15em]
//                         text-white
//                       "
//                       style={{
//                         background:
//                           product.theme.accent,
//                       }}
//                     >
//                       {product.badge}
//                     </span>
//                   </div>

//                   {/* =========================================
//                       IMAGE
//                   ========================================== */}

//                   <div className="px-6 pt-6">
//                     <div
//                       className="
//                         relative
//                         overflow-hidden
//                         rounded-[24px]
//                         bg-white/40
//                       "
//                     >
//                       <ProductImageSlider
//                         images={product.images}
//                         title={product.title}
//                       />

//                       {/* SOLD OUT */}

//                       {product.stock <= 0 && (
//                         <div
//                           className="
//                             absolute
//                             inset-0
//                             flex
//                             items-center
//                             justify-center
//                             bg-black/45
//                           "
//                         >
//                           <span
//                             className="
//                               rounded-full
//                               bg-red-600
//                               px-5
//                               py-2
//                               text-sm
//                               font-bold
//                               tracking-wide
//                               text-white
//                             "
//                           >
//                             SOLD OUT
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* =========================================
//                       CONTENT
//                   ========================================== */}

//                   <div className="flex flex-1 flex-col p-6">
//                     {/* Product Name */}

//                     <h3
//                       className="
//                         text-2xl
//                         leading-tight
//                         text-[#184C35]
//                       "
//                       style={{
//                         fontFamily:
//                           "Fraunces, serif",
//                       }}
//                     >
//                       {product.title}
//                     </h3>

//                     {/* Description */}

//                     <p
//                       className="
//                         mt-4
//                         flex-1
//                         leading-7
//                         text-[#667085]
//                       "
//                     >
//                       {product.shortDescription}
//                     </p>

//                     {/* =======================================
//                         HIGHLIGHTS
//                     ======================================== */}

//                     {product.highlights?.length >
//                       0 && (
//                       <div
//                         className="
//                           mt-5
//                           flex
//                           flex-wrap
//                           gap-2
//                         "
//                       >
//                         {product.highlights.map(
//                           (tag) => (
//                             <span
//                               key={tag}
//                               className="
//                                 rounded-full
//                                 bg-white
//                                 px-3
//                                 py-1
//                                 text-sm
//                                 text-[#184C35]
//                               "
//                             >
//                               {tag}
//                             </span>
//                           )
//                         )}
//                       </div>
//                     )}

//                     {/* =======================================
//                         PRICE
//                     ======================================== */}

//                     <div
//                       className="
//                         mt-6
//                         flex
//                         items-center
//                         gap-3
//                       "
//                     >
//                       <span
//                         className="
//                           text-3xl
//                           font-bold
//                           text-[#184C35]
//                         "
//                       >
//                         ₹
//                         {product.sellingPrice.toLocaleString(
//                           "en-IN"
//                         )}
//                       </span>

//                       {product.mrp >
//                         product.sellingPrice && (
//                         <span
//                           className="
//                             text-lg
//                             text-gray-400
//                             line-through
//                           "
//                         >
//                           ₹
//                           {product.mrp.toLocaleString(
//                             "en-IN"
//                           )}
//                         </span>
//                       )}
//                     </div>

//                     {/* =======================================
//                         BUY NOW
//                     ======================================== */}

//                     <button
//                       type="button"
//                       disabled={product.stock <= 0}
//                       className={`
//                         group/btn
//                         mt-8
//                         inline-flex
//                         w-full
//                         items-center
//                         justify-center
//                         gap-3
//                         rounded-full
//                         py-4
//                         font-semibold
//                         transition-all
//                         duration-300

//                         ${
//                           product.stock <= 0
//                             ? "pointer-events-none cursor-not-allowed bg-gray-400 text-white"
//                             : "text-white hover:shadow-lg"
//                         }
//                       `}
//                       style={
//                         product.stock > 0
//                           ? {
//                               background:
//                                 product.theme
//                                   .accent,
//                             }
//                           : {}
//                       }
//                     >
//                       {product.stock > 0
//                         ? "Buy Now"
//                         : "Sold out"}

//                       {product.stock > 0 && (
//                         <ArrowRight
//                           size={18}
//                           className="
//                             transition-transform
//                             duration-300
//                             group-hover/btn:translate-x-1
//                           "
//                         />
//                       )}
//                     </button>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>

//       {/* =====================================================
//           BOTTOM PRODUCT CTA
//       ===================================================== */}

//       <ProductCTA />

//       <Footer />
//     </>
//   );
// }

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { ArrowRight } from "lucide-react";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// import { getProducts } from "../api/product.api";

// import ProductCTA from "../components/ProductCTA";
// import BuyComboCTA from "../components/BuyComboCTA";

// import ProductImageSlider from "../components/ProductImageSlider";


// const CARD_THEMES = {

//   GREEN: {
//     background: "#EAF4EB",
//     accent: "#3E8C57",
//     text: "#184C35",
//   },

//   ORANGE: {
//     background: "#F8E6DF",
//     accent: "#E86A30",
//     text: "#184C35",
//   },

//   RED: {
//     background: "#FBE6E2",
//     accent: "#D94E43",
//     text: "#184C35",
//   },

//   PURPLE: {
//     background: "#F3ECFD",
//     accent: "#7C3AED",
//     text: "#184C35",
//   },

//   CREAM: {
//     background: "#FBF3DE",
//     accent: "#D7A326",
//     text: "#184C35",
//   },

// };


// export default function Products() {
//    const [products, setProducts] = useState([]);
//    const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     const fetchProducts = async () => {

//       try {
//         setLoading(true);

//         const data = await getProducts();


//         data.sort(
//   (a, b) =>
//     a.displayOrder - b.displayOrder
// );

//         const mapped = data.map((product) => ({

//           ...product,

//           title: product.name,

//           sellingPrice: Number(
//             product.discountPrice || product.price
//           ),

//           mrp: Number(product.price),

//           shortDescription:
//             product.description,

//           images:
//             product.images.map(
//               (img) => img.imageUrl
//             ),
//             stock: product.stock,
          
//           highlights: product.highlights || [],

// badge: product.badge,

// theme:
//   CARD_THEMES[
//     product.cardTheme
//   ] || CARD_THEMES.GREEN,

//         }));

//         setProducts(mapped);

//       } catch (err) {

//         console.error(err);

//       }
//        finally {

//     setLoading(false);

//   }

//     };

//     fetchProducts();

//   }, []);
//   return (
//     <>
//       <Navbar alwaysCapsule />

//       <main className="bg-[#F6F3EC] min-h-screen pt-40 pb-24">
//         <div className="max-w-7xl mx-auto px-6">
//           {/* Hero */}

//           <div className="text-center">
//             <span
//               className="
//                 inline-flex
//                 px-5
//                 py-2
//                 rounded-full
//                 bg-[#E9E3D8]
//                 text-[#184C35]
//                 text-xs
//                 tracking-[0.18em]
//                 font-medium
//               "
//             >
//               OUR PRODUCTS
//             </span>

//             <h1
//               className="
//                 mt-6
//                 text-[#184C35]
//                 text-5xl
//                 md:text-7xl
//               "
//               style={{ fontFamily: "Fraunces, serif" }}
//             >
//               Explore Every Crunch
//             </h1>

//             <p className="mt-6 max-w-2xl mx-auto text-[#667085] text-lg leading-8">
//               Crafted from premium fox nuts and roasted to perfection.
//               Discover bold flavours made for guilt-free snacking.
//             </p>
//           </div>

//     {loading ? (

//   <div className="flex flex-col items-center py-28">

//   <div className="flex gap-3">

//     <span className="h-4 w-4 rounded-full bg-[#184C35] animate-bounce" />

//     <span
//       className="h-4 w-4 rounded-full bg-[#3E8C57] animate-bounce"
//       style={{ animationDelay: "150ms" }}
//     />

//     <span
//       className="h-4 w-4 rounded-full bg-[#D7A326] animate-bounce"
//       style={{ animationDelay: "300ms" }}
//     />

//   </div>

//   <p className="mt-8 text-[#184C35] uppercase tracking-[0.2em] text-sm">

//     Preparing your snacks...

//   </p>

// </div>

// ) : (

//   <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-20">

//     {/* Products Grid */}            {products.map((product) => (
//               <Link
//                 key={product.id}
//   to={`/products/${product.slug}`}
//   onClick={(e) => {
//     if (product.stock <= 0) {
//       e.preventDefault();
//       toast.info(
//       "This product is currently out of stock."
//     );
//     }
//   }}

//                 className={`
//   group
//   flex
//   flex-col
//   overflow-hidden
//   rounded-[32px]
//   transition-all
//   duration-300

//   ${
//     product.stock > 0
//       ? "hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
//       : "cursor-not-allowed opacity-95 grayscale-[0.15]"
//   }
// `}
//                 style={{
//                   background: product.theme.background,
//                 }}
//               >
//                 {/* Badge */}

//                 <div className="p-6 pb-0">
//                   <span
//                     className="
//                       inline-flex
//                       px-4
//                       py-2
//                       rounded-full
//                       text-white
//                       text-[11px]
//                       tracking-[0.15em]
//                       font-medium
//                     "
//                     style={{
//                       background: product.theme.accent,
//                     }}
//                   >
//                     {product.badge || "POPFRESH"}
//                   </span>
//                 </div>

//                 {/* Image */}

//                 <div className="px-6 pt-6">
//                 <div
//   className="
//     relative
//     overflow-hidden
//     rounded-[24px]
//     bg-white/40
//   "
// >
//                     <ProductImageSlider
//                       images={product.images}
//                       title={product.title}
//                     />
//                   {product.stock <= 0 && (

//   <div
//     className="
//       absolute
//       inset-0
//       flex
//       items-center
//       justify-center
//      bg-black/45
// backdrop-blur-none

//     "
//   >
//     <span
//       className="
//         rounded-full
//         bg-red-600
//         px-5
//         py-2
//         text-sm
//         font-bold
//         tracking-wide
//         text-white
//       "
//     >
//       SOLD OUT
//     </span>
//   </div>

// )}

//                   </div>
//                 </div>

//                 {/* Content */}

//                 <div className="flex flex-col flex-1 p-6">
//                   <h3
//                     className="
//                       text-[#184C35]
//                       text-2xl
//                       leading-tight
//                     "
//                     style={{
//                       fontFamily: "Fraunces, serif",
//                     }}
//                   >
//                     {product.title}
//                   </h3>

//                   <p
//                     className="
//                       mt-4
//                       text-[#667085]
//                       leading-7
//                       flex-1
//                     "
//                   >
//                     {product.shortDescription}
//                   </p>

//                                     {/* Highlights */}
//                   {product.highlights?.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mt-5">
//                     {product.highlights?.map((tag) => (
//                       <span
//                         key={tag}
//                         className="
//                           px-3
//                           py-1
//                           rounded-full
//                           bg-white
//                           text-sm
//                           text-[#184C35]
//                         "
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
// )}
//                   {/* Price */}

//                   <div className="mt-6 flex items-center gap-3">
//                     <span
//                       className="text-3xl font-bold"
//                       style={{
//                         color: "#184C35",
//                       }}
//                     >
//                       ₹{product.sellingPrice}
//                     </span>

//                     <span className="text-lg text-gray-400 line-through">
//                       ₹{product.mrp}
//                     </span>
//                   </div>



//                   {/* CTA */}

//                   <button
//   disabled={product.stock <= 0}
//   className={`
//     group
//     mt-8
//     w-full
//     inline-flex
//     items-center
//     justify-center
//     gap-3
//     py-4
//     rounded-full
//     font-semibold
//     transition-all
//     duration-300

//     ${
//       product.stock <= 0
//         ? "cursor-not-allowed pointer-events-none bg-gray-400 text-white"
//         : "text-white hover:shadow-lg"
//     }
//   `}
//   style={
//     product.stock > 0
//       ? {
//           background: product.theme.accent,
//         }
//       : {}
//   }
// >
//   {product.stock > 0
//     ? "Buy Now"
//     : "Sold out"}

//   {product.stock > 0 && (
//     <ArrowRight size={18} />
//   )}
// </button>
//                 </div>
//               </Link>
//             ))}
//           </div>
          
// )}
//         </div>
//       </main>

//       <ProductCTA />

      

//       <Footer />
//     </>
//   );
// }


// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";

// import ProductCTA from "../components/ProductCTA";

// import ProductImageSlider from "../components/ProductImageSlider";

// import productData from "../components/data/productData.js";

// export default function Products() {
//   return (
//     <>
//       <Navbar alwaysCapsule />

//       <main className="bg-[#F6F3EC] min-h-screen pt-40 pb-24">
//         <div className="max-w-7xl mx-auto px-6">
//           {/* Hero */}

//           <div className="text-center">
//             <span
//               className="
//                 inline-flex
//                 px-5
//                 py-2
//                 rounded-full
//                 bg-[#E9E3D8]
//                 text-[#184C35]
//                 text-xs
//                 tracking-[0.18em]
//                 font-medium
//               "
//             >
//               OUR PRODUCTS
//             </span>

//             <h1
//               className="
//                 mt-6
//                 text-[#184C35]
//                 text-5xl
//                 md:text-7xl
//               "
//               style={{ fontFamily: "Fraunces, serif" }}
//             >
//               Explore Every Crunch
//             </h1>

//             <p className="mt-6 max-w-2xl mx-auto text-[#667085] text-lg leading-8">
//               Crafted from premium fox nuts and roasted to perfection.
//               Discover bold flavours made for guilt-free snacking.
//             </p>
//           </div>

//           {/* Products Grid */}

//           <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-20">
//             {productData.map((product) => (
//               <Link
//                 key={product.id}
//                 to={`/products/${product.slug}`}
//                 className="
//                   group
//                   flex
//                   flex-col
//                   overflow-hidden
//                   rounded-[32px]
//                   transition-all
//                   duration-300
//                   hover:-translate-y-2
//                   hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
//                 "
//                 style={{
//                   background: product.theme.background,
//                 }}
//               >
//                 {/* Badge */}

//                 <div className="p-6 pb-0">
//                   <span
//                     className="
//                       inline-flex
//                       px-4
//                       py-2
//                       rounded-full
//                       text-white
//                       text-[11px]
//                       tracking-[0.15em]
//                       font-medium
//                     "
//                     style={{
//                       background: product.theme.accent,
//                     }}
//                   >
//                     {product.theme.badge}
//                   </span>
//                 </div>

//                 {/* Image */}

//                 <div className="px-6 pt-6">
//                   <div
//                     className="
//                       overflow-hidden
//                       rounded-[24px]
//                       bg-white/40
//                     "
//                   >
//                     <ProductImageSlider
//                       images={product.images}
//                       title={product.title}
//                     />
//                   </div>
//                 </div>

//                 {/* Content */}

//                 <div className="flex flex-col flex-1 p-6">
//                   <h3
//                     className="
//                       text-[#184C35]
//                       text-2xl
//                       leading-tight
//                     "
//                     style={{
//                       fontFamily: "Fraunces, serif",
//                     }}
//                   >
//                     {product.title}
//                   </h3>

//                   <p
//                     className="
//                       mt-4
//                       text-[#667085]
//                       leading-7
//                       flex-1
//                     "
//                   >
//                     {product.shortDescription}
//                   </p>

//                                     {/* Highlights */}

//                   <div className="flex flex-wrap gap-2 mt-5">
//                     {product.tags.map((tag) => (
//                       <span
//                         key={tag}
//                         className="
//                           px-3
//                           py-1
//                           rounded-full
//                           bg-white
//                           text-sm
//                           text-[#184C35]
//                         "
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>

//                   {/* Price */}

//                   <div className="mt-6 flex items-center gap-3">
//                     <span
//                       className="text-3xl font-bold"
//                       style={{
//                         color: product.theme.text,
//                       }}
//                     >
//                       ₹{product.sellingPrice}
//                     </span>

//                     <span className="text-lg text-gray-400 line-through">
//                       ₹{product.mrp}
//                     </span>
//                   </div>

//                   {/* CTA */}

//                   <button
//                     className="
//                       group
//                       mt-8
//                       w-full
//                       inline-flex
//                       items-center
//                       justify-center
//                       gap-3
//                       py-4
//                       rounded-full
//                       text-white
//                       font-semibold
//                       transition-all
//                       duration-300
//                       hover:shadow-lg
//                     "
//                     style={{
//                       background: product.theme.accent,
//                     }}
//                   >
//                     Buy Now

//                     <ArrowRight
//                       size={18}
//                       className="
//                         transition-transform
//                         duration-300
//                         group-hover:translate-x-1
//                       "
//                     />
//                   </button>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </main>

//       <ProductCTA />

      

//       <Footer />
//     </>
//   );
// }

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";
// import ProductCTA from "../components/ProductCTA";
// import InstagramCTA from "../components/InstagramCTA";
// import ProductImageSlider from "../components/ProductImageSlider";

// // product gallery images import
// import Periperi1 from "../assets/products/periperi1.png";
// import Periperi2 from "../assets/products/periperi2.png";
// import Periperi3 from "../assets/products/periperi3.jpg";

// import Tomato1 from "../assets/products/tomato1.png";
// import Tomato2 from "../assets/products/tomato2.png";
// import Tomato3 from "../assets/products/tomato3.jpg";

// import Cheese1 from "../assets/products/cheese1.png";
// import Cheese2 from "../assets/products/cheese2.png";
// import Cheese3 from "../assets/products/cheese3.jpg";

// import Pudina1 from "../assets/products/pudina1.png";
// import Pudina2 from "../assets/products/pudina2.png";
// import Pudina3 from "../assets/products/pudina3.jpg";


// const products = [
//   {
//     slug: "peri-peri",
//     name: "Peri Peri",
//     title: "Peri Peri Roasted Makhana",
//     images: [Periperi1,Periperi2,Periperi3],
//     bg: "#F8E6DF",
//     accent: "#E86B2F",
//     description:
//       "Smoky African chilli blend with a citrusy kick. Fiery, bold and addictive.",
//   },

//   {
//     slug: "cheese",
//     name: "Cheese",
//     title: "Cheese Roasted Makhana",
//     images: [Cheese1,Cheese2,Cheese3],
//     bg: "#FBF2DE",
//     accent: "#D7A326",
//     description: "Creamy cheese flavour wrapped around every crunchy bite.",
//   },

//   {
//     slug: "tangy-tomato",
//     name: "Tangy Tomato",
//     title: "Tangy Tomato Roasted Makhana",
//     images: [Tomato1,Tomato2,Tomato3],
//     bg: "#FBE6E2",
//     accent: "#D94E43",
//     description: "Sweet, tangy and packed with delicious tomato goodness.",
//   },

//   {
//     slug: "pudina",
//     name: "Pudina",
//     title: "Pudina Roasted Makhana",
//     images: [Pudina1,Pudina2,Pudina3],
//     bg: "#EAF4EB",
//     accent: "#3D8C57",
//     description: "Refreshing mint flavours with a crisp and addictive crunch.",
//   },
// ];

// export default function Products() {
//   return (
//     <>
//       <Navbar alwaysCapsule />

//       <main className="bg-[#F6F3EC] min-h-screen pt-40 pb-24">
//         <div className="max-w-7xl mx-auto px-6">
//           {/* Hero */}

//           <div className="text-center">
//             <span
//               className="
//                 inline-flex
//                 px-5
//                 py-2
//                 rounded-full
//                 bg-[#E9E3D8]
//                 text-[#184C35]
//                 text-xs
//                 tracking-[0.18em]
//                 font-medium
//               "
//             >
//               OUR PRODUCTS
//             </span>

//             <h1
//               className="
//                 mt-6
//                 text-[#184C35]
//                 text-5xl
//                 md:text-7xl
//               "
//               style={{ fontFamily: "Fraunces, serif" }}
//             >
//               Explore Every Crunch
//             </h1>

//             <p className="mt-6 max-w-2xl mx-auto text-[#667085] text-lg leading-8">
//               Crafted from premium fox nuts and roasted to perfection. Discover
//               bold flavours made for guilt-free snacking.
//             </p>
//           </div>

//           {/* Products Grid */}

//           <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-20">
//             {products.map((product) => (
//               <Link
//                 key={product.slug}
//                 to={`/products/${product.slug}`}
//                 className="
//                   group
//                   flex
//                   flex-col
//                   overflow-hidden
//                   rounded-[32px]
//                   transition-all
//                   duration-300
//                   hover:-translate-y-2
//                   hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
//                 "
//                 style={{
//                   background: product.bg,
//                 }}
//               >
//                 {/* Badge */}

//                 <div className="p-6 pb-0">
//                   <span
//                     className="
//                       inline-flex
//                       px-4
//                       py-2
//                       rounded-full
//                       text-white
//                       text-[11px]
//                       tracking-[0.15em]
//                       font-medium
//                     "
//                     style={{
//                       background: product.accent,
//                     }}
//                   >
//                     BEST SELLER
//                   </span>
//                 </div>

//                 {/* Image */}

//                 <div className="px-6 pt-6">
//                   <div
//                     className="
//                       overflow-hidden
//                       rounded-[24px]
//                       bg-white/40
//                     "
//                   >
//                     <ProductImageSlider
//                       images={product.images}
//                       title={product.title}
//                     />
//                   </div>
//                 </div>

//                 {/* Content */}

//                 <div className="flex flex-col flex-1 p-6">
//                   <h3
//                     className="
//                       text-[#184C35]
//                       text-2xl
//                       leading-tight
//                     "
//                     style={{
//                       fontFamily: "Fraunces, serif",
//                     }}
//                   >
//                     {product.title}
//                   </h3>

//                   <p
//                     className="
//                       mt-4
//                       text-[#667085]
//                       leading-7
//                       flex-1
//                     "
//                   >
//                     {product.description}
//                   </p>

//                   {/* Highlights */}

//                   <div className="flex flex-wrap gap-2 mt-5">
//                     <span className="px-3 py-1 rounded-full bg-white text-sm text-[#184C35]">
//                       High Protein
//                     </span>

//                     <span className="px-3 py-1 rounded-full bg-white text-sm text-[#184C35]">
//                       Never Fried
//                     </span>

//                     <span className="px-3 py-1 rounded-full bg-white text-sm text-[#184C35]">
//                       Roasted
//                     </span>
//                   </div>

//                   {/* CTA */}

//                   <button
//                     className="
//                       group
//                       mt-8
//                       w-full
//                       inline-flex
//                       items-center
//                       justify-center
//                       gap-3
//                       py-4
//                       rounded-full
//                       text-white
//                       font-semibold
//                       transition-all
//                       duration-300
//                     "
//                     style={{
//                       background: product.accent,
//                     }}
//                   >
//                     Buy Now
//                     <ArrowRight
//                       size={18}
//                       className="
//                         transition-transform
//                         duration-300
//                         group-hover:translate-x-1
//                       "
//                     />
//                   </button>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </main>
//       <ProductCTA />
//       <Footer />
//     </>
//   );
// }
