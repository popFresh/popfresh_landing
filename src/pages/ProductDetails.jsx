import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Star,
  ShieldCheck,
  ShoppingCart,
  CreditCard,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PopFreshMarquee from "../components/PopFreshMarquee";
import QuantitySelector from "../components/QuantitySelector";
import ProductImageSlider from "../components/ProductImageSlider";
import MarketplaceCTA from "../components/MarketplaceCTA";

import { useCart } from "../context/CartContext";
import productData from "../components/data/productData.js";

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { addToCart, buyNow } = useCart();

  const product = useMemo(() => {
    return productData.find((item) => item.slug === slug);
  }, [slug]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [product]);

  if (!product) {
    return (
      <>
        <Navbar alwaysCapsule />

        <main className="min-h-screen bg-[#F6F3EC] pt-40 flex items-center justify-center">
          <div className="text-center">
            <h1
              className="text-5xl text-[#174C35]"
              style={{
                fontFamily: "Fraunces, serif",
              }}
            >
              Product Not Found
            </h1>

            <button
              onClick={() => navigate("/products")}
              className="
                mt-8
                rounded-full
                bg-[#174C35]
                px-8
                py-4
                text-white
                font-semibold
              "
            >
              Back to Products
            </button>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const discount = Math.round(
    ((product.mrp - product.sellingPrice) /
      product.mrp) *
      100
  );

  const relatedProducts = productData
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  const reviews = [
    {
      name: "Priya",
      city: "Delhi",
      text: "Best makhana I've ever tasted.",
    },
    {
      name: "Rohan",
      city: "Mumbai",
      text: "Premium quality and amazing crunch.",
    },
    {
      name: "Sneha",
      city: "Bangalore",
      text: "Healthy snacking finally tastes good.",
    },
    {
      name: "Arjun",
      city: "Chennai",
      text: "Peri Peri flavour is my favourite.",
    },
    {
      name: "Megha",
      city: "Pune",
      text: "Packaging feels very premium.",
    },
  ];

  return (
    <>
      <Navbar alwaysCapsule />

      <section
        className="
          bg-[#F6F3EC]
          min-h-screen
          pt-32
          md:pt-36
          pb-20
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            lg:px-8
          "
        >
          {/* HERO SECTION STARTS HERE */}
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">

  {/* LEFT SIDE */}

  <div>

    {/* Main Image */}

    <div
      className="
        bg-white
        rounded-[34px]
        overflow-hidden

        border
        border-[#ECE7DB]

        shadow-[0_15px_40px_rgba(0,0,0,0.05)]
      "
    >
      <div
        className="
          h-[420px]
          md:h-[500px]

          flex
          items-center
          justify-center

          p-8
        "
      >
        <img
          src={selectedImage}
          alt={product.title}
          className="
            max-h-full
            object-contain

            transition-all
            duration-500

            hover:scale-[1.04]
          "
        />
      </div>
    </div>

    {/* Thumbnail Gallery */}

    <div
      className="
        mt-5

        flex
        gap-3

        overflow-x-auto

        pb-2
      "
    >
      
      {product.images.map((img, index) => (
  <button
    key={index}
    onClick={() => setSelectedImage(img)}
    className={`
      flex
      items-center
      justify-center

      w-[96px]
      h-[96px]

      rounded-[22px]

      bg-white

      border-[3px]

      transition-all
      duration-300

      ${
        selectedImage === img
          ? "border-[#174C35] shadow-md"
          : "border-transparent hover:border-[#174C35]/30"
      }
    `}
  >
    <img
      src={img}
      alt=""

      className="
        w-16
        h-16

        object-contain
      "
    />
  </button>
))}
    </div>

  </div>

  {/* RIGHT SIDE STARTS HERE */}

  <div>
          {/* Badges */}

      <div className="flex items-center gap-3 flex-wrap">
        <span
          className="
            inline-flex
            items-center
            rounded-full
            px-4
            py-2
            text-[11px]
            tracking-[0.15em]
            font-semibold
            text-white
          "
          style={{
            background: product.theme.accent,
          }}
        >
          {product.theme.badge}
        </span>

        <span
          className="
            inline-flex
            items-center
            rounded-full
            px-4
            py-2
            bg-white
            border
            border-[#ECE7DB]
            text-[11px]
            tracking-[0.15em]
            text-[#174C35]
            font-medium
          "
        >
          <ShieldCheck
            size={14}
            className="mr-2"
          />
          FSSAI CERTIFIED
        </span>
      </div>

      {/* Product Title */}

      <h1
        className="
          mt-6
          text-[#174C35]
          text-[34px]
          md:text-[42px]
          leading-tight
        "
        style={{
          fontFamily: "Fraunces, serif",
        }}
      >
        {product.title}
      </h1>

{/* Highlights */}

      <div className="mt-8 flex flex-wrap gap-3">
        {product.tags.map((tag) => (
          <span
            key={tag}
            className="
              px-4
              py-2
              rounded-full
              bg-white
              border
              border-[#ECE7DB]
              text-[#174C35]
              text-sm
              font-medium
            "
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Rating */}

      <div className="mt-5 flex items-center gap-3">
        <div className="flex items-center text-[#E4C06A]">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={18}
              fill="currentColor"
            />
          ))}
        </div>

        <span className="text-[#667085]">
          {product.rating} • {product.totalReviews} Reviews
        </span>
      </div>

      {/* Description */}

      <p
        className="
          mt-6
          text-[#667085]
          leading-8
          text-[16px]
        "
      >
        {product.shortDescription}
      </p>

      {/* Pricing */}

      <div className="mt-8 flex items-center gap-4 flex-wrap">
        <span
          className="text-5xl font-bold"
          style={{
            color: product.theme.text,
          }}
        >
          ₹{product.sellingPrice}
        </span>

        <span
          className="
            text-2xl
            line-through
            text-gray-400
          "
        >
          ₹{product.mrp}
        </span>

        <span
          className="
            rounded-full
            px-4
            py-2
            text-white
            text-sm
            font-semibold
          "
          style={{
            background: product.theme.accent,
          }}
        >
          {discount}% OFF
        </span>
      </div>

      
            {/* Product Information */}

      <div
        className="
          mt-10

          rounded-[24px]

          bg-white

          border
          border-[#ECE7DB]

          overflow-hidden
        "
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="text-[#667085]">
            Net Weight
          </span>

          <span className="font-semibold text-[#174C35]">
            {product.weight}
          </span>
        </div>

        <div className="border-t border-[#ECE7DB]" />

        <div className="flex items-center justify-between px-6 py-5">
          <span className="text-[#667085]">
            FSSAI
          </span>

          <span className="font-semibold text-[#174C35]">
            {product.fssai}
          </span>
        </div>
      </div>

      {/* Quantity */}

      <div className="mt-8">
        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
          max={product.stock}
        />
      </div>

      {/* Buttons */}

      <div className="mt-8 grid grid-cols-2 gap-4">
        {/* Add To Cart */}

        <button
          onClick={() => {
            addToCart(product, quantity);

            // Drawer will open after Navbar integration
          }}
          className="
            flex
            items-center
            justify-center
            gap-3

            rounded-full

            py-4

            font-semibold

            text-white

            transition-all
            duration-300

            hover:scale-[1.02]
            hover:shadow-xl
          "
          style={{
            background: product.theme.accent,
          }}
        >
          <ShoppingCart size={20} />

          Add to Cart
        </button>

        {/* Buy Now */}

        <button
          onClick={() => {
            buyNow(product, quantity);

            navigate("/checkout/shipping");
          }}
          className="
            flex
            items-center
            justify-center
            gap-3

            rounded-full

            py-4

            border-2

            font-semibold

            transition-all
            duration-300

            hover:bg-[#174C35]
            hover:text-white
          "
          
        >
          <CreditCard size={20} />

          Buy Now
        </button>
      </div>

    </div>

</div>

{/* PopFresh Marquee */}

<div
  className="
    mt-24
    mb-24

    relative
    left-1/2
    right-1/2

    -ml-[50vw]
    -mr-[50vw]

    w-screen
  "
>
  <PopFreshMarquee />

</div>

{/* Customers Also Bought */}

<div className="max-w-7xl mx-auto px-5 lg:px-8">

  <div className="mb-12 text-center">

    <span
      className="
        inline-flex
        rounded-full
        bg-[#E9E3D8]
        px-5
        py-2

        text-[#174C35]

        text-xs

        tracking-[0.18em]

        font-medium
      "
    >
      YOU MAY ALSO LIKE
    </span>

    <h2
      className="
        mt-5

        text-[#174C35]

        text-4xl
        md:text-5xl
      "
      style={{
        fontFamily: "Fraunces, serif",
      }}
    >
      Customers Also Bought
    </h2>

    <p className="mt-4 text-[#667085]">
      Explore more delicious flavours from PopFresh.
    </p>

  </div>

  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

    {relatedProducts.map((item) => (

      <Link
        key={item.id}
        to={`/products/${item.slug}`}

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
          background: item.theme.background,
        }}
      >

        {/* Badge */}

        <div className="p-6 pb-0">

          <span
            className="
              inline-flex

              rounded-full

              px-4
              py-2

              text-white

              text-[11px]

              tracking-[0.15em]

              font-medium
            "
            style={{
              background: item.theme.accent,
            }}
          >
            {item.theme.badge}
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
              images={item.images}
              title={item.title}
            />

          </div>

        </div>

        {/* Content */}

        <div className="flex flex-col flex-1 p-6">

          <h3
            className="
              text-[#174C35]

              text-2xl

              leading-tight
            "
            style={{
              fontFamily: "Fraunces, serif",
            }}
          >
            {item.title}
          </h3>

          <p
            className="
              mt-4

              text-[#667085]

              leading-7

              flex-1
            "
          >
            {item.shortDescription}
          </p>

          {/* Tags */}

          <div className="flex flex-wrap gap-2 mt-5">

            {item.tags.slice(0,3).map((tag) => (

              <span
                key={tag}
                className="
                  rounded-full

                  bg-white

                  px-3
                  py-1

                  text-sm

                  text-[#174C35]
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
                color: item.theme.text,
              }}
            >
              ₹{item.sellingPrice}
            </span>

            <span className="text-lg line-through text-gray-400">
              ₹{item.mrp}
            </span>

          </div>

          {/* CTA */}

          <button
            className="
              mt-7

              w-full

              rounded-full

              py-4

              text-white

              font-semibold

              transition-all
              duration-300
            "
            style={{
              background: item.theme.accent,
            }}
          >
            View Product
          </button>

        </div>

      </Link>

    ))}

  </div>

</div>

{/* Maketplace CTA  */}
<MarketplaceCTA
    amazon={product.amazon}
    flipkart={product.flipkart}
/>

{/* Reviews */}

<div
  className="
    mt-28

    relative
    left-1/2
    right-1/2

    -ml-[50vw]
    -mr-[50vw]

    w-screen

    overflow-hidden
  "
>
  <div className="text-center mb-12">
    <span
      className="
        inline-flex

        rounded-full

        bg-[#E9E3D8]

        px-5
        py-2

        text-xs

        tracking-[0.18em]

        font-medium

        text-[#174C35]
      "
    >
      CUSTOMER LOVE
    </span>

    <h2
      className="
        mt-5

        text-[#174C35]

        text-4xl
        md:text-5xl
      "
      style={{
        fontFamily: "Fraunces, serif",
      }}
    >
      Loved By Snackers
    </h2>

    <p className="mt-4 text-[#667085]">
      Thousands of happy crunches across India.
    </p>
  </div>

  <div
    className="
      flex
      gap-6

      animate-[marquee_30s_linear_infinite]

      w-max

      px-6
    "
  >
    {[...reviews, ...reviews].map((review, index) => (
      <div
        key={index}
        className="
          w-[280px]
          md:w-[330px]

          rounded-[30px]

          bg-white

          p-8

          border
          border-[#ECE7DB]

          shadow-sm

          transition-all
          duration-300

          hover:-translate-y-2
          hover:shadow-xl
        "
      >
        {/* Stars */}

        <div className="flex gap-1 text-[#E4C06A] mb-5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              fill="currentColor"
            />
          ))}
        </div>

        {/* Review */}

        <p
          className="
            text-[#174C35]

            text-lg

            leading-8
          "
        >
          "{review.text}"
        </p>

        {/* User */}

        <div className="mt-8">
          <h4 className="font-semibold text-[#174C35]">
            {review.name}
          </h4>

          <span className="text-[#667085] text-sm">
            {review.city}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>

</div>

</section>

<Footer />

</>
);
}