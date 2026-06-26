import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import ProductCTA from "../components/ProductCTA";

import ProductImageSlider from "../components/ProductImageSlider";

import productData from "../components/data/productData.js";

export default function Products() {
  return (
    <>
      <Navbar alwaysCapsule />

      <main className="bg-[#F6F3EC] min-h-screen pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero */}

          <div className="text-center">
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
              OUR PRODUCTS
            </span>

            <h1
              className="
                mt-6
                text-[#184C35]
                text-5xl
                md:text-7xl
              "
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Explore Every Crunch
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-[#667085] text-lg leading-8">
              Crafted from premium fox nuts and roasted to perfection.
              Discover bold flavours made for guilt-free snacking.
            </p>
          </div>

          {/* Products Grid */}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-20">
            {productData.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.slug}`}
                className="
                  group
                  flex
                  flex-col
                  overflow-hidden
                  rounded-[32px]
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                "
                style={{
                  background: product.theme.background,
                }}
              >
                {/* Badge */}

                <div className="p-6 pb-0">
                  <span
                    className="
                      inline-flex
                      px-4
                      py-2
                      rounded-full
                      text-white
                      text-[11px]
                      tracking-[0.15em]
                      font-medium
                    "
                    style={{
                      background: product.theme.accent,
                    }}
                  >
                    {product.theme.badge}
                  </span>
                </div>

                {/* Image */}

                <div className="px-6 pt-6">
                  <div
                    className="
                      overflow-hidden
                      rounded-[24px]
                      bg-white/40
                    "
                  >
                    <ProductImageSlider
                      images={product.images}
                      title={product.title}
                    />
                  </div>
                </div>

                {/* Content */}

                <div className="flex flex-col flex-1 p-6">
                  <h3
                    className="
                      text-[#184C35]
                      text-2xl
                      leading-tight
                    "
                    style={{
                      fontFamily: "Fraunces, serif",
                    }}
                  >
                    {product.title}
                  </h3>

                  <p
                    className="
                      mt-4
                      text-[#667085]
                      leading-7
                      flex-1
                    "
                  >
                    {product.shortDescription}
                  </p>

                                    {/* Highlights */}

                  <div className="flex flex-wrap gap-2 mt-5">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="
                          px-3
                          py-1
                          rounded-full
                          bg-white
                          text-sm
                          text-[#184C35]
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price */}

                  <div className="mt-6 flex items-center gap-3">
                    <span
                      className="text-3xl font-bold"
                      style={{
                        color: product.theme.text,
                      }}
                    >
                      ₹{product.sellingPrice}
                    </span>

                    <span className="text-lg text-gray-400 line-through">
                      ₹{product.mrp}
                    </span>
                  </div>

                  {/* CTA */}

                  <button
                    className="
                      group
                      mt-8
                      w-full
                      inline-flex
                      items-center
                      justify-center
                      gap-3
                      py-4
                      rounded-full
                      text-white
                      font-semibold
                      transition-all
                      duration-300
                      hover:shadow-lg
                    "
                    style={{
                      background: product.theme.accent,
                    }}
                  >
                    Buy Now

                    <ArrowRight
                      size={18}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <ProductCTA />

      

      <Footer />
    </>
  );
}

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
