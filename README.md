# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },




  ///////
  // import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Star, ShieldCheck, Leaf, BadgeCheck } from "lucide-react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import PopFreshMarquee from "../components/PopFreshMarquee";


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

// const products = {
//   "peri-peri": {
//     name: "Peri Peri",
//     title: "Peri Peri Roasted Makhana",
//     images: [Periperi1, Periperi2, Periperi3],
//     accent: "#E86B2F",
//     description:
//       "Slow roasted makhanas coated with a bold peri peri seasoning blend. Light, crunchy and packed with flavour.",
//     amazon:
//       "https://www.amazon.in/Fresh-Makhana-Roasted-Guilt-Free-Snacking/dp/B0GXLQ9HQJ/?_encoding=UTF8&m=A2FT9DZQC0APJG&psc=1&pd_rd_w=i6Vrh&content-id=amzn1.sym.da911696-31a7-479c-9922-299ce8aee4d0&pf_rd_p=da911696-31a7-479c-9922-299ce8aee4d0&pf_rd_r=TR7BY0NQV5K1WM4YP9S5&pd_rd_wg=UOsZ1&pd_rd_r=153062dd-1109-4b36-a8cf-0eacac02d473&ref_=lscx_w_ssf_na",
//     flipkart: "#",
//   },

//   cheese: {
//     name: "Cheese",
//     title: "Cheese Roasted Makhana",
//     images: [Cheese1, Cheese2, Cheese3],
//     accent: "#D7A326",
//     description:
//       "Creamy cheese seasoning layered over perfectly roasted makhanas for an indulgent snacking experience.",
//     amazon:
//       "https://www.amazon.in/Roasted-Makhana-Flavour-Healthy-Crunchy/dp/B0H1T93S2F/?_encoding=UTF8&m=A2FT9DZQC0APJG&psc=1&pd_rd_w=i6Vrh&content-id=amzn1.sym.da911696-31a7-479c-9922-299ce8aee4d0&pf_rd_p=da911696-31a7-479c-9922-299ce8aee4d0&pf_rd_r=TR7BY0NQV5K1WM4YP9S5&pd_rd_wg=UOsZ1&pd_rd_r=153062dd-1109-4b36-a8cf-0eacac02d473&ref_=lscx_w_ssf_na",
//     flipkart: "#",
//   },

//   "tangy-tomato": {
//     name: "Tangy Tomato",
//     title: "Tangy Tomato Roasted Makhana",
//     images: [Tomato1, Tomato2, Tomato3],
//     accent: "#D94E43",
//     description:
//       "A punchy tomato flavour balanced with herbs and spices that keeps you reaching for more.",
//     amazon:
//       "https://www.amazon.in/Fresh-Tomato-Makhana-Roasted-Healthy/dp/B0GXLRT47Z/?_encoding=UTF8&m=A2FT9DZQC0APJG&psc=1&pd_rd_w=i6Vrh&content-id=amzn1.sym.da911696-31a7-479c-9922-299ce8aee4d0&pf_rd_p=da911696-31a7-479c-9922-299ce8aee4d0&pf_rd_r=TR7BY0NQV5K1WM4YP9S5&pd_rd_wg=UOsZ1&pd_rd_r=153062dd-1109-4b36-a8cf-0eacac02d473&ref_=lscx_w_ssf_na",
//     flipkart: "#",
//   },

//   pudina: {
//     name: "Pudina",
//     title: "Pudina Roasted Makhana",
//     images: [Pudina1, Pudina2, Pudina3],
//     accent: "#3D8C57",
//     description:
//       "Refreshing mint flavour with subtle spices. Crisp, light and irresistibly crunchy.",
//     amazon:
//       "https://www.amazon.in/Makhana-Slow-Roasted-Gluten-Free-Preservatives-Protein/dp/B0GXLRLKZ5/?_encoding=UTF8&m=A2FT9DZQC0APJG&psc=1&pd_rd_w=i6Vrh&content-id=amzn1.sym.da911696-31a7-479c-9922-299ce8aee4d0&pf_rd_p=da911696-31a7-479c-9922-299ce8aee4d0&pf_rd_r=TR7BY0NQV5K1WM4YP9S5&pd_rd_wg=UOsZ1&pd_rd_r=153062dd-1109-4b36-a8cf-0eacac02d473&ref_=lscx_w_ssf_na",
//     flipkart: "#",
//   },
// };

// export default function ProductDetails() {
//   const { slug } = useParams();

//   const product = products[slug];
//   const [selectedImage, setSelectedImage] = useState(
//     product?.images?.[0] || null,
//   );

//   useEffect(() => {
//     setSelectedImage(product?.images?.[0] || null);
//   }, [slug]);

//   if (!product) {
//     return <div className="pt-40 text-center">Product not found</div>;
//   }

//   const relatedProducts = Object.entries(products)
//     .filter(([key]) => key !== slug)
//     .slice(0, 3);

//   const reviews = [
//     {
//       name: "Priya",
//       city: "Delhi",
//       text: "Best makhana I've ever tried.",
//     },
//     {
//       name: "Rohan",
//       city: "Mumbai",
//       text: "Premium taste and amazing crunch.",
//     },
//     {
//       name: "Sneha",
//       city: "Bangalore",
//       text: "Healthy snacking finally tastes good.",
//     },
//     {
//       name: "Arjun",
//       city: "Chennai",
//       text: "The Peri Peri flavour is addictive.",
//     },
//     {
//       name: "Megha",
//       city: "Pune",
//       text: "Packaging and quality both feel premium.",
//     },
//   ];

//   return (
//     <>
//       <Navbar alwaysCapsule />
//       <section className="bg-[#F6F3EC] min-h-screen pt-36 md:pt-44 pb-16 md:pb-24">
//         <div className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-6">
//           {/* PRODUCT */}

//           <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
//             {/* LEFT */}

//             <div>
//               <div className="overflow-hidden rounded-[24px] md:rounded-[36px] bg-white">
//                 <img
//                   src={selectedImage}
//                   alt={product.name}
//                   className="
//                     w-full
//                     h-[320px]
//                     sm:h-[380px]
//                     md:h-[420px]
//                     lg:h-[530px]
//                     object-contain
//                     p-4
//                 "
//                 />
//               </div>

//               <div
//                 className="
//                 flex
//                 gap-4
//                 mt-6
//                 overflow-x-auto
//                 pb-2
//                 scrollbar-hide
//             "
//               >
//                 {product.images.map((img, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedImage(img)}
//                     className={`
//                 overflow-hidden
//                 rounded-2xl
//                 bg-white
//                 border-2
//                 border-transparent
//                 transition-all
//                 duration-300
//                 ${
//                   selectedImage === img
//                     ? "border-[#174C35] shadow-lg"
//                     : "opacity-70 hover:opacity-100"
//                 }
//                 `}
//                   >
//                     <img
//                       src={img}
//                       alt=""
//                       className="
//                         w-16
//                         h-16
//                         sm:w-20
//                         sm:h-20
//                         md:w-20
//                         md:h-20
//                         object-cover
//                     "
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* RIGHT */}

//             <div>
//               <div className="flex gap-3 flex-wrap">
//                 <span className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-[#174C35] text-white text-xs">
//                   BEST SELLER
//                 </span>

//                 <span className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-white text-[#174C35] text-xs">
//                   FSSAI CERTIFIED
//                 </span>
//               </div>

//               <h1
//                 className="
//                 mt-4
//                 md:mt-6
//                 text-[#174C35]
//                 text-2xl
//                 sm:text-2xl
//                 md:text-3xl
//                 lg:text-[42px]
//                 leading-tight
//                 "
//                 style={{ fontFamily: "Fraunces, serif" }}
//               >
//                 {product.title}
//               </h1>
//               <div
//                 className="
//                 flex
//                 flex-wrap
//                 gap-2
//                 mt-5
                
//             "
//               >
//                 <div className="bg-white rounded-full px-3 py-2 md:px-5 md:py-3 flex-shrink-0 flex items-center gap-2 text-sm md:text-base">
//                   <Leaf size={16} />
//                   100% Vegan
//                 </div>

//                 <div className="bg-white rounded-full px-3 py-2 md:px-5 md:py-3 flex-shrink-0 flex items-center gap-2 text-sm md:text-base">
//                   <BadgeCheck size={16} />
//                   High Protein
//                 </div>

//                 <div className="bg-white rounded-full px-3 py-2 md:px-5 md:py-3 flex-shrink-0 flex items-center gap-2 text-sm md:text-base">
//                   <ShieldCheck size={16} />
//                   Roasted Not Fried
//                 </div>
//               </div>
//               <div className="flex items-center gap-2 mt-5">
//                 <div className="flex text-[#D4B56A]">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} size={18} fill="currentColor" />
//                   ))}
//                 </div>

//                 <span className="text-[#667085]">4.9 (1,200+ reviews)</span>
//               </div>

//               <p
//                 className="mt-8 text-[#667085] text-base md:text-lg
//                           leading-7 md:leading-8"
//               >
//                 {product.description}
//               </p>

//               {/* PRICE */}

//               <div className="flex flex-wrap items-center gap-2 mt-8 md:mt-10">
//                 <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#174C35]">
//                   ₹120
//                 </span>

//                 <span className="line-through text-lg sm:text-xl md:text-2xl text-gray-400">
//                   ₹150
//                 </span>

//                 <span
//                   className="px-4 py-2 rounded-full text-white"
//                   style={{
//                     background: product.accent,
//                   }}
//                 >
//                   20% OFF
//                 </span>
//               </div>

//               {/* INFO */}

//               <div className="bg-white rounded-[20px] md:rounded-[28px] p-4  mt-8 space-y-4">
//                 <div className="flex justify-between">
//                   <span>Net Weight</span>
//                   <span>50g</span>
//                 </div>

//                 <div className="flex justify-between gap-4">
//                   <span>FSSAI License</span>
//                   <span className="text-right break-all">10725997000559</span>
//                 </div>
//               </div>

//               {/* BUTTONS */}

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
//                 <a
//                   href={product.amazon}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="
//                   text-center
//                   py-4
//                   rounded-full
//                   bg-[#174C35]
//                   text-white
//                   font-semibold
//                 "
//                 >
//                   Buy on Amazon
//                 </a>

//                 <button
//                   disabled
//                   className="
//                     text-center
//                     py-4
//                     rounded-full
//                     border-2
//                     border-[#174C35]/20
//                     bg-gray-100
//                     text-[#174C35]/50
//                     font-semibold
//                     cursor-not-allowed
//                     relative
//                 "
//                 >
//                   Buy on Flipkart
//                   <span
//                     className="
//                     absolute
//                     -top-2
//                     -right-2
//                     bg-[#D4B56A]
//                     text-[#174C35]
//                     text-[10px]
//                     font-bold
//                     px-2
//                     py-1
//                     rounded-full
//                     uppercase
//                     tracking-wide
//                     "
//                   >
//                     Soon
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-24 mb-24 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
//           <PopFreshMarquee />
//         </div>

//         <div className="max-w-6xl mx-auto px-4 sm:px-6">
//           {/* RELATED PRODUCTS */}

//           <div className="mt-28">
//             <h2
//               className="text-3xl md:text-4xl text-[#174C35] mb-10"
//               style={{ fontFamily: "Fraunces, serif" }}
//             >
//               Customers Also Bought
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//               {relatedProducts.map(([key, item]) => (
//                 <Link
//                   key={key}
//                   to={`/products/${key}`}
//                   className="
//                     group
//                     flex
//                     flex-col
//                     overflow-hidden
//                     rounded-[24px] md:rounded-[32px]
//                     transition-all
//                     duration-300
//                     hover:-translate-y-2
//                     hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
//                 "
//                   style={{
//                     background: "#fff",
//                   }}
//                 >
//                   <div className="p-6 pb-0">
//                     <span
//                       className="
//                         inline-flex
//                         px-4
//                         py-2
//                         rounded-full
//                         text-white
//                         text-[11px]
//                         tracking-[0.15em]
//                         font-medium
//                     "
//                       style={{
//                         background: item.accent,
//                       }}
//                     >
//                       BEST SELLER
//                     </span>
//                   </div>

//                   <div className="px-6 pt-6">
//                     <div className="overflow-hidden rounded-[24px] bg-[#F6F3EC]">
//                       <img
//                         src={item.images[0]}
//                         alt={item.title}
//                         className="
//                         w-full
//                         h-[280px]
//                         sm:h-[280px]
//                         md:h-[320px]
//                         object-cover
//                         transition-transform
//                         duration-500
//                         group-hover:scale-105
//                         "
//                       />
//                     </div>
//                   </div>

//                   <div className="flex flex-col flex-1 p-6">
//                     <h3
//                       className="
//                         text-[#184C35]
//                         text-xl md:text-2xl
//                         leading-tight
//                     "
//                       style={{
//                         fontFamily: "Fraunces, serif",
//                       }}
//                     >
//                       {item.title}
//                     </h3>

//                     <p
//                       className="
//                         mt-4
//                         text-[#667085]
//                         leading-7
//                         flex-1
//                     "
//                     >
//                       {item.description}
//                     </p>

//                     <button
//                       className="
//                         mt-8
//                         w-full
//                         py-4
//                         rounded-full
//                         text-white
//                         font-semibold
//                         cursor-pointer
//                     "
//                       style={{
//                         background: item.accent,
//                       }}
//                     >
//                       Buy Now
//                     </button>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* REVIEWS */}

//           <div className="mt-28 overflow-hidden relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
//             <div className="text-center mb-12">
//               <h2
//                 className="text-3xl sm:text-4xl md:text-5xl text-[#174C35]"
//                 style={{ fontFamily: "Fraunces, serif" }}
//               >
//                 Loved By Snackers
//               </h2>

//               <p className="mt-3 text-[#667085]">
//                 6,000+ happy crunches and counting.
//               </p>
//             </div>

//             <div className="flex gap-6 animate-[marquee_30s_linear_infinite] w-max">
//               {[...reviews, ...reviews].map((review, index) => (
//                 <div
//                   key={index}
//                   className="
//                   w-[260px]
//                   sm:w-[300px]
//                   md:w-[320px]
//                   hover:-translate-y-2
//                   transition-all
//                   duration-300
//                   bg-white
//                   rounded-[28px]
//                   p-5 md:p-8
//                 "
//                 >
//                   <div className="text-[#D4B56A] mb-4">★★★★★</div>

//                   <p className="text-lg md:text-xl text-[#174C35]">
//                     "{review.text}"
//                   </p>

//                   <div className="mt-6">
//                     <h4>{review.name}</h4>
//                     <span className="text-[#667085] text-sm">
//                       {review.city}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// }
