import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  Star,
  ShoppingCart,
  CreditCard,
} from "lucide-react";

import {
  getProductBySlug,
  getProducts,
} from "../api/product.api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PopFreshMarquee from "../components/PopFreshMarquee";
import QuantitySelector from "../components/QuantitySelector";
import MarketplaceCTA from "../components/MarketplaceCTA";

import { useCart } from "../context/CartContext";

/* =====================================================
   CARD THEMES
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
   FORMAT PRODUCT WEIGHT
===================================================== */

const formatWeight = (weight) => {
  if (
    weight === null ||
    weight === undefined ||
    weight === ""
  ) {
    return "50 GRAMS";
  }

  const value = String(weight)
    .trim()
    .replace(
      /\s*(g|gm|gms|gram|grams)\s*/gi,
      ""
    );

  return `${value} GRAMS`;
};

/* =====================================================
   ANIMATED PRODUCT IMAGE SLIDER
===================================================== */

function AnimatedProductImageSlider({
  images = [],
  title = "Product",
}) {
  const validImages = images.filter(Boolean);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  /* ---------------------------------------------------
     AUTO SLIDE
  --------------------------------------------------- */

  useEffect(() => {
    if (validImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === validImages.length - 1
          ? 0
          : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [validImages.length]);

  /* ---------------------------------------------------
     NO IMAGE
  --------------------------------------------------- */

  if (!validImages.length) {
    return (
      <div
        className="
          flex
          h-full
          w-full
          items-center
          justify-center
          text-sm
          text-[#667085]
        "
      >
        No image available
      </div>
    );
  }

  return (
    <div
      className="
        relative
        h-full
        w-full
        overflow-hidden
      "
    >
      {/* -------------------------------------------------
          SLIDING TRACK
      ------------------------------------------------- */}

      <div
        className="
          flex
          h-full
          w-full
          transition-transform
          duration-700
          ease-in-out
        "
        style={{
          transform: `translateX(-${
            currentIndex * 100
          }%)`,
        }}
      >
        {validImages.map(
          (image, index) => (
            <div
              key={`${image}-${index}`}
              className="
                relative
                h-full
                w-full
                shrink-0
                grow-0
                basis-full
                flex
                items-center
                justify-center
                overflow-hidden
              "
            >
              <img
                src={image}
                alt={`${title} ${
                  index + 1
                }`}
                className="
                  block
                  max-h-full
                  max-w-full
                  object-contain
                  p-4
                  transition-transform
                  duration-500
                "
              />
            </div>
          )
        )}
      </div>

      {/* -------------------------------------------------
          DOTS
      ------------------------------------------------- */}

      {validImages.length > 1 && (
        <div
          className="
            absolute
            bottom-4
            left-1/2
            z-10
            flex
            -translate-x-1/2
            items-center
            gap-1.5
            rounded-full
            bg-white/70
            px-3
            py-2
            backdrop-blur-sm
          "
        >
          {validImages.map(
            (_, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`
                  h-1.5
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    currentIndex === index
                      ? "w-5 bg-[#174C35]"
                      : "w-1.5 bg-[#174C35]/30"
                  }
                `}
                aria-label={`Go to image ${
                  index + 1
                }`}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

/* =====================================================
   PRODUCT DETAILS
===================================================== */

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { addToCart, buyNow } = useCart();

  const [product, setProduct] =
    useState(null);

  const [relatedProducts, setRelatedProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [quantity, setQuantity] =
    useState(1);

  /* ===================================================
     FETCH PRODUCT
  =================================================== */

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const data =
        await getProductBySlug(slug);

      /* -----------------------------------------------
         MAP MAIN PRODUCT
      ------------------------------------------------ */

      const mapped = {
        ...data,

        title: data.name,

        sellingPrice: Number(
          data.discountPrice || data.price
        ),

        mrp: Number(data.price),

        shortDescription:
          data.description,

        images: Array.isArray(data.images)
          ? data.images
              .map((img) => img.imageUrl)
              .filter(Boolean)
          : [],

        badge: data.badge,

        highlights:
          data.highlights || [],

        theme:
          CARD_THEMES[data.cardTheme] ||
          CARD_THEMES.GREEN,
      };

      setProduct(mapped);

      /* -----------------------------------------------
         FETCH RELATED PRODUCTS
      ------------------------------------------------ */

      const allProducts =
        await getProducts();

      const related = allProducts
        .filter(
          (item) =>
            item.categoryId ===
              mapped.categoryId &&
            item.id !== mapped.id
        )
        .slice(0, 3)
        .map((item) => ({
          ...item,

          title: item.name,

          sellingPrice: Number(
            item.discountPrice || item.price
          ),

          mrp: Number(item.price),

          shortDescription:
            item.description,

          images: Array.isArray(item.images)
            ? item.images
                .map((img) => img.imageUrl)
                .filter(Boolean)
            : [],

          badge: item.badge,

          highlights:
            item.highlights || [],

          theme:
            CARD_THEMES[item.cardTheme] ||
            CARD_THEMES.GREEN,
        }));

      setRelatedProducts(related);
    } catch (err) {
      console.error(err);

      navigate("/products", {
        replace: true,
      });
    } finally {
      setLoading(false);
    }
  };

  /* ===================================================
     LOAD PRODUCT
  =================================================== */

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  /* ===================================================
     RESET IMAGE + SCROLL
  =================================================== */

  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(
        product.images[0]
      );
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [product]);

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <>
        <Navbar alwaysCapsule />

        <main
          className="
            min-h-screen
            bg-[#F6F3EC]
            flex
            items-center
            justify-center
          "
        >
          <div
            className="
              flex
              flex-col
              items-center
            "
          >
            <div className="flex gap-3">
              <span
                className="
                  h-4
                  w-4
                  rounded-full
                  bg-[#184C35]
                  animate-bounce
                "
              />

              <span
                className="
                  h-4
                  w-4
                  rounded-full
                  bg-[#3E8C57]
                  animate-bounce
                "
                style={{
                  animationDelay: "150ms",
                }}
              />

              <span
                className="
                  h-4
                  w-4
                  rounded-full
                  bg-[#D7A326]
                  animate-bounce
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
              Preparing your snack...
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  /* =====================================================
     PRODUCT NOT FOUND
  ===================================================== */

  if (!product) {
    return (
      <>
        <Navbar alwaysCapsule />

        <main
          className="
            min-h-screen
            bg-[#F6F3EC]
            pt-40
            flex
            items-center
            justify-center
          "
        >
          <div className="text-center">
            <h1
              className="
                text-5xl
                text-[#174C35]
              "
              style={{
                fontFamily:
                  "Fraunces, serif",
              }}
            >
              Product Not Found
            </h1>

            <button
              onClick={() =>
                navigate("/products")
              }
              className="
                mt-8
                rounded-full
                bg-[#174C35]
                px-8
                py-4
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
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

  /* =====================================================
     CALCULATIONS
  ===================================================== */

  const discount =
    product.mrp > 0
      ? Math.round(
          ((product.mrp -
            product.sellingPrice) /
            product.mrp) *
            100
        )
      : 0;

  const outOfStock =
    product.stock <= 0;

  const weight =
    formatWeight(product.weight);

  /* =====================================================
     REVIEWS
  ===================================================== */

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

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <>
      <Navbar alwaysCapsule />

      <section
        className="
          min-h-screen
          bg-[#F6F3EC]
          pt-32
          pb-20
          md:pt-36
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
            px-5
            lg:px-8
          "
        >

          {/* =================================================
              PRODUCT HERO
          ================================================= */}

          <div
            className="
              grid
              items-start
              gap-12
              lg:grid-cols-2
              xl:gap-16
            "
          >

            {/* =================================================
                LEFT — IMAGE GALLERY
            ================================================= */}

            <div>

              {/* MAIN IMAGE */}

              <div
                className="
                  overflow-hidden
                  rounded-[34px]
                  border
                  border-[#ECE7DB]
                  bg-white
                  shadow-[0_20px_60px_rgba(24,76,53,0.06)]
                "
              >
                <div
                  className="
                    flex
                    h-[420px]
                    items-center
                    justify-center
                    p-8
                    md:h-[500px]
                    md:p-10
                  "
                >
                  <img
                    src={
                      selectedImage ||
                      product.images[0]
                    }
                    alt={product.title}
                    className="
                      max-h-full
                      max-w-full
                      object-contain
                      transition-all
                      duration-500
                      hover:scale-[1.04]
                    "
                  />
                </div>
              </div>

              {/* THUMBNAILS */}

              <div
                className="
                  mt-5
                  flex
                  gap-3
                  overflow-x-auto
                  pb-2
                "
              >
                {product.images.map(
                  (img, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        setSelectedImage(img)
                      }
                      className={`
                        flex
                        h-[96px]
                        w-[96px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-[22px]
                        border-[3px]
                        bg-white
                        transition-all
                        duration-300

                        ${
                          selectedImage === img
                            ? "border-[#174C35] shadow-[0_8px_20px_rgba(24,76,53,0.12)]"
                            : "border-transparent hover:border-[#174C35]/30"
                        }
                      `}
                    >
                      <img
                        src={img}
                        alt={`${product.title} ${
                          index + 1
                        }`}
                        className="
                          h-16
                          w-16
                          object-contain
                        "
                      />
                    </button>
                  )
                )}
              </div>
            </div>

            {/* =================================================
                RIGHT — PRODUCT INFORMATION
            ================================================= */}

            <div>

              {/* BADGES */}

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    px-4
                    py-2
                    text-[11px]
                    font-semibold
                    tracking-[0.15em]
                    text-white
                  "
                  style={{
                    background:
                      product.theme.accent,
                  }}
                >
                  {product.badge ||
                    "POPFRESH"}
                </span>

                <span
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    border
                    border-[#ECE7DB]
                    bg-white
                    px-4
                    py-2
                    text-[11px]
                    font-semibold
                    tracking-[0.15em]
                    text-[#174C35]
                    shadow-[0_4px_15px_rgba(0,0,0,0.02)]
                  "
                >
                  {weight}
                </span>
              </div>

              {/* OUT OF STOCK */}

              {outOfStock && (
                <div className="mt-4">
                  <span
                    className="
                      inline-flex
                      rounded-full
                      bg-red-600
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    OUT OF STOCK
                  </span>
                </div>
              )}

              {/* TITLE */}

              <h1
                className="
                  mt-6
                  text-[38px]
                  leading-[1.05]
                  text-[#174C35]
                  md:text-[50px]
                "
                style={{
                  fontFamily:
                    "Fraunces, serif",
                }}
              >
                {product.title}
              </h1>

              {/* HIGHLIGHTS */}

              {product.highlights?.length >
                0 && (
                <div
                  className="
                    mt-8
                    flex
                    flex-wrap
                    gap-3
                  "
                >
                  {product.highlights.map(
                    (tag) => (
                      <span
                        key={tag}
                        className="
                          rounded-full
                          border
                          border-[#ECE7DB]
                          bg-white
                          px-4
                          py-2
                          text-sm
                          font-medium
                          text-[#174C35]
                          shadow-[0_3px_12px_rgba(0,0,0,0.02)]
                        "
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              )}

              {/* RATING */}

              <div
                className="
                  mt-6
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-0.5
                    text-[#E4B94F]
                  "
                >
                  {[...Array(5)].map(
                    (_, index) => (
                      <Star
                        key={index}
                        size={18}
                        fill="currentColor"
                        strokeWidth={1.5}
                      />
                    )
                  )}
                </div>

                <span
                  className="
                    text-sm
                    text-[#667085]
                  "
                >
                  4.8 • 2,300+ Reviews
                </span>
              </div>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-6
                  max-w-xl
                  text-[16px]
                  leading-8
                  text-[#667085]
                "
              >
                {product.shortDescription}
              </p>

              {/* PRICING */}

              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  items-center
                  gap-4
                "
              >
                <span
                  className="
                    text-5xl
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
                      text-2xl
                      text-gray-400
                      line-through
                    "
                  >
                    ₹
                    {product.mrp.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                )}

                {discount > 0 && (
                  <span
                    className="
                      rounded-full
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      text-white
                    "
                    style={{
                      background:
                        product.theme.accent,
                    }}
                  >
                    {discount}% OFF
                  </span>
                )}
              </div>

              {/* DIVIDER */}

              <div
                className="
                  mt-8
                  h-px
                  w-full
                  bg-[#E7E1D6]
                "
              />

              {/* QUANTITY */}

              <div className="mt-8">
                <QuantitySelector
                  quantity={quantity}
                  setQuantity={setQuantity}
                  max={product.stock}
                  disabled={outOfStock}
                />
              </div>

              {/* BUTTONS */}

              <div
                className="
                  mt-8
                  grid
                  grid-cols-1
                  gap-4
                  sm:grid-cols-2
                "
              >
                {/* ADD TO CART */}

                <button
                  type="button"
                  disabled={outOfStock}
                  onClick={() => {
                    if (outOfStock) return;

                    addToCart(
                      product,
                      quantity
                    );
                  }}
                  className={`
                    flex
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    py-4
                    font-semibold
                    transition-all
                    duration-300

                    ${
                      outOfStock
                        ? "cursor-not-allowed bg-gray-400 text-white"
                        : "text-white hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
                    }
                  `}
                  style={
                    !outOfStock
                      ? {
                          background:
                            product.theme
                              .accent,
                        }
                      : {}
                  }
                >
                  <ShoppingCart
                    size={20}
                  />

                  Add to Cart
                </button>

                {/* BUY NOW */}

                <button
                  type="button"
                  disabled={outOfStock}
                  onClick={() => {
                    if (outOfStock) return;

                    buyNow(
                      product,
                      quantity
                    );

                    navigate(
                      "/checkout/shipping"
                    );
                  }}
                  className={`
                    flex
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    border-2
                    py-4
                    font-semibold
                    transition-all
                    duration-300

                    ${
                      outOfStock
                        ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500"
                        : "border-[#174C35] text-[#174C35] hover:-translate-y-0.5 hover:bg-[#174C35] hover:text-white"
                    }
                  `}
                >
                  <CreditCard
                    size={20}
                  />

                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* =================================================
              POPFRESH MARQUEE
          ================================================= */}

          <div
            className="
              relative
              left-1/2
              right-1/2
              -ml-[50vw]
              -mr-[50vw]
              mt-24
              mb-24
              w-screen
            "
          >
            <PopFreshMarquee />
          </div>

          {/* =================================================
              CUSTOMERS ALSO BOUGHT
          ================================================= */}

          <div
            className="
              mx-auto
              max-w-7xl
            "
          >
            {/* HEADING */}

            <div
              className="
                mb-12
                text-center
              "
            >
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
                  text-[#174C35]
                "
              >
                YOU MAY ALSO LIKE
              </span>

              <h2
                className="
                  mt-5
                  text-4xl
                  text-[#174C35]
                  md:text-5xl
                "
                style={{
                  fontFamily:
                    "Fraunces, serif",
                }}
              >
                Customers Also Bought
              </h2>

              <p
                className="
                  mt-4
                  text-[#667085]
                "
              >
                Explore more delicious
                flavours from PopFresh.
              </p>
            </div>

            {/* PRODUCT CARDS */}

            <div
              className="
                grid
                gap-8
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {relatedProducts.map(
                (item) => (
                  <Link
                    key={item.id}
                    to={
                      item.stock > 0
                        ? `/products/${item.slug}`
                        : "#"
                    }
                    onClick={(e) => {
                      if (
                        item.stock <= 0
                      ) {
                        e.preventDefault();
                      }
                    }}
                    className={`
                      group
                      flex
                      flex-col
                      overflow-hidden
                      rounded-[32px]
                      transition-all
                      duration-300

                      ${
                        item.stock > 0
                          ? "hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                          : "cursor-not-allowed opacity-90"
                      }
                    `}
                    style={{
                      background:
                        item.theme
                          .background,
                    }}
                  >

                    {/* =========================================
                        BADGE
                    ========================================== */}

                    <div
                      className="
                        p-6
                        pb-0
                      "
                    >
                      <span
                        className="
                          inline-flex
                          rounded-full
                          px-4
                          py-2
                          text-[11px]
                          font-medium
                          tracking-[0.15em]
                          text-white
                        "
                        style={{
                          background:
                            item.theme
                              .accent,
                        }}
                      >
                        {item.badge ||
                          "POPFRESH"}
                      </span>
                    </div>

                    {/* =========================================
                        ANIMATED IMAGE
                    ========================================== */}

                    <div
                      className="
                        px-6
                        pt-6
                      "
                    >
                      {/*
                        IMPORTANT:

                        The image wrapper has a fixed height,
                        while the actual image uses max-h-full
                        + max-w-full + object-contain.

                        This means the complete product image
                        remains visible even if the packaging
                        is very tall.
                      */}

                      <div
                        className="
                          relative
                          h-[340px]
                          w-full
                          overflow-hidden
                          rounded-[24px]
                          bg-white/40
                          ring-1
                          ring-black/[0.025]
                          sm:h-[360px]
                        "
                      >
                        <AnimatedProductImageSlider
                          images={
                            item.images
                          }
                          title={
                            item.title
                          }
                        />

                        {/* OUT OF STOCK */}

                        {item.stock <=
                          0 && (
                          <div
                            className="
                              absolute
                              inset-0
                              z-20
                              flex
                              items-center
                              justify-center
                              bg-black/45
                              backdrop-blur-sm
                            "
                          >
                            <span
                              className="
                                rounded-full
                                bg-red-600
                                px-5
                                py-2
                                text-sm
                                font-bold
                                text-white
                              "
                            >
                              OUT OF STOCK
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* =========================================
                        CONTENT
                    ========================================== */}

                    <div
                      className="
                        flex
                        flex-1
                        flex-col
                        p-6
                      "
                    >
                      <h3
                        className="
                          text-2xl
                          leading-tight
                          text-[#174C35]
                        "
                        style={{
                          fontFamily:
                            "Fraunces, serif",
                        }}
                      >
                        {item.title}
                      </h3>

                      <p
                        className="
                          mt-4
                          flex-1
                          leading-7
                          text-[#667085]
                        "
                      >
                        {
                          item.shortDescription
                        }
                      </p>

                      {/* TAGS */}

                      <div
                        className="
                          mt-5
                          flex
                          flex-wrap
                          gap-2
                        "
                      >
                        {item.highlights
                          ?.slice(0, 3)
                          .map(
                            (tag) => (
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
                            )
                          )}
                      </div>

                      {/* PRICE */}

                      <div
                        className="
                          mt-6
                          flex
                          items-center
                          gap-3
                        "
                      >
                        <span
                          className="
                            text-3xl
                            font-bold
                          "
                          style={{
                            color:
                              item.theme
                                .text,
                          }}
                        >
                          ₹
                          {item.sellingPrice.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                        {item.mrp >
                          item.sellingPrice && (
                          <span
                            className="
                              text-lg
                              text-gray-400
                              line-through
                            "
                          >
                            ₹
                            {item.mrp.toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        )}
                      </div>

                      {/* CTA */}

                      <button
                        type="button"
                        disabled={
                          item.stock <= 0
                        }
                        className={`
                          mt-7
                          w-full
                          rounded-full
                          py-4
                          font-semibold
                          transition-all
                          duration-300

                          ${
                            item.stock <= 0
                              ? "cursor-not-allowed bg-gray-400 text-white"
                              : "text-white hover:-translate-y-0.5 hover:shadow-lg"
                          }
                        `}
                        style={
                          item.stock > 0
                            ? {
                                background:
                                  item
                                    .theme
                                    .accent,
                              }
                            : {}
                        }
                      >
                        {item.stock > 0
                          ? "View Product"
                          : "Out of Stock"}
                      </button>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>

          {/* =================================================
              MARKETPLACE CTA
          ================================================= */}

          <MarketplaceCTA
            amazon={product.amazon}
            flipkart={product.flipkart}
          />

          {/* =================================================
              REVIEWS
          ================================================= */}

          <div
            className="
              relative
              left-1/2
              right-1/2
              -ml-[50vw]
              -mr-[50vw]
              mt-28
              w-screen
              overflow-hidden
            "
          >
            <div
              className="
                mb-12
                text-center
              "
            >
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
                  text-[#174C35]
                "
              >
                CUSTOMER LOVE
              </span>

              <h2
                className="
                  mt-5
                  text-4xl
                  text-[#174C35]
                  md:text-5xl
                "
                style={{
                  fontFamily:
                    "Fraunces, serif",
                }}
              >
                Loved By Snackers
              </h2>

              <p
                className="
                  mt-4
                  text-[#667085]
                "
              >
                Thousands of happy
                crunches across India.
              </p>
            </div>

            <div
              className="
                flex
                w-max
                gap-6
                px-6
                animate-[marquee_30s_linear_infinite]
              "
            >
              {[...reviews, ...reviews].map(
                (review, index) => (
                  <div
                    key={index}
                    className="
                      w-[280px]
                      rounded-[30px]
                      border
                      border-[#ECE7DB]
                      bg-white
                      p-8
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-2
                      hover:shadow-xl
                      md:w-[330px]
                    "
                  >
                    {/* STARS */}

                    <div
                      className="
                        mb-5
                        flex
                        gap-1
                        text-[#E4C06A]
                      "
                    >
                      {[...Array(5)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            size={18}
                            fill="currentColor"
                          />
                        )
                      )}
                    </div>

                    {/* REVIEW */}

                    <p
                      className="
                        text-lg
                        leading-8
                        text-[#174C35]
                      "
                    >
                      "{review.text}"
                    </p>

                    {/* USER */}

                    <div className="mt-8">
                      <h4
                        className="
                          font-semibold
                          text-[#174C35]
                        "
                      >
                        {review.name}
                      </h4>

                      <span
                        className="
                          text-sm
                          text-[#667085]
                        "
                      >
                        {review.city}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";

// import {
//   Star,
//   ShoppingCart,
//   CreditCard,
// } from "lucide-react";

// import {
//   getProductBySlug,
//   getProducts,
// } from "../api/product.api";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import PopFreshMarquee from "../components/PopFreshMarquee";
// import QuantitySelector from "../components/QuantitySelector";
// import ProductImageSlider from "../components/ProductImageSlider";
// import MarketplaceCTA from "../components/MarketplaceCTA";

// import { useCart } from "../context/CartContext";

// /* =====================================================
//    CARD THEMES
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
//    FORMAT PRODUCT WEIGHT
// ===================================================== */

// const formatWeight = (weight) => {
//   if (
//     weight === null ||
//     weight === undefined ||
//     weight === ""
//   ) {
//     return "50 GRAMS";
//   }

//   const value = String(weight)
//     .trim()
//     .replace(
//       /\s*(g|gm|gms|gram|grams)\s*/gi,
//       ""
//     );

//   return `${value} GRAMS`;
// };

// /* =====================================================
//    PRODUCT DETAILS
// ===================================================== */

// export default function ProductDetails() {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const { addToCart, buyNow } = useCart();

//   const [product, setProduct] = useState(null);

//   const [relatedProducts, setRelatedProducts] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [selectedImage, setSelectedImage] =
//     useState(null);

//   const [quantity, setQuantity] =
//     useState(1);

//   /* ===================================================
//      FETCH PRODUCT
//   =================================================== */

//   const fetchProduct = async () => {
//     try {
//       setLoading(true);

//       const data = await getProductBySlug(slug);

//       /* -----------------------------------------------
//          MAP MAIN PRODUCT
//       ------------------------------------------------ */

//       const mapped = {
//         ...data,

//         title: data.name,

//         sellingPrice: Number(
//           data.discountPrice || data.price
//         ),

//         mrp: Number(data.price),

//         shortDescription:
//           data.description,

//         images: Array.isArray(data.images)
//           ? data.images
//               .map((img) => img.imageUrl)
//               .filter(Boolean)
//           : [],

//         badge: data.badge,

//         highlights:
//           data.highlights || [],

//         theme:
//           CARD_THEMES[data.cardTheme] ||
//           CARD_THEMES.GREEN,
//       };

//       setProduct(mapped);

//       /* -----------------------------------------------
//          FETCH RELATED PRODUCTS
//       ------------------------------------------------ */

//       const allProducts = await getProducts();

//       const related = allProducts
//         .filter(
//           (item) =>
//             item.categoryId ===
//               mapped.categoryId &&
//             item.id !== mapped.id
//         )
//         .slice(0, 3)
//         .map((item) => ({
//           ...item,

//           title: item.name,

//           sellingPrice: Number(
//             item.discountPrice || item.price
//           ),

//           mrp: Number(item.price),

//           shortDescription:
//             item.description,

//           images: Array.isArray(item.images)
//             ? item.images
//                 .map((img) => img.imageUrl)
//                 .filter(Boolean)
//             : [],

//           badge: item.badge,

//           highlights:
//             item.highlights || [],

//           theme:
//             CARD_THEMES[item.cardTheme] ||
//             CARD_THEMES.GREEN,
//         }));

//       setRelatedProducts(related);
//     } catch (err) {
//       console.error(err);

//       navigate("/products", {
//         replace: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ===================================================
//      LOAD PRODUCT
//   =================================================== */

//   useEffect(() => {
//     fetchProduct();
//   }, [slug]);

//   /* ===================================================
//      RESET IMAGE + SCROLL
//   =================================================== */

//   useEffect(() => {
//     if (product?.images?.length) {
//       setSelectedImage(product.images[0]);
//     }

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, [product]);

//   /* =====================================================
//      LOADING
//   ===================================================== */

//   if (loading) {
//     return (
//       <>
//         <Navbar alwaysCapsule />

//         <main
//           className="
//             min-h-screen
//             bg-[#F6F3EC]
//             flex
//             items-center
//             justify-center
//           "
//         >
//           <div className="flex flex-col items-center">

//             <div className="flex gap-3">

//               <span
//                 className="
//                   h-4
//                   w-4
//                   rounded-full
//                   bg-[#184C35]
//                   animate-bounce
//                 "
//               />

//               <span
//                 className="
//                   h-4
//                   w-4
//                   rounded-full
//                   bg-[#3E8C57]
//                   animate-bounce
//                 "
//                 style={{
//                   animationDelay: "150ms",
//                 }}
//               />

//               <span
//                 className="
//                   h-4
//                   w-4
//                   rounded-full
//                   bg-[#D7A326]
//                   animate-bounce
//                 "
//                 style={{
//                   animationDelay: "300ms",
//                 }}
//               />

//             </div>

//             <p
//               className="
//                 mt-8
//                 text-sm
//                 uppercase
//                 tracking-[0.2em]
//                 text-[#184C35]
//               "
//             >
//               Preparing your snack...
//             </p>

//           </div>
//         </main>

//         <Footer />
//       </>
//     );
//   }

//   /* =====================================================
//      PRODUCT NOT FOUND
//   ===================================================== */

//   if (!product) {
//     return (
//       <>
//         <Navbar alwaysCapsule />

//         <main
//           className="
//             min-h-screen
//             bg-[#F6F3EC]
//             pt-40
//             flex
//             items-center
//             justify-center
//           "
//         >
//           <div className="text-center">

//             <h1
//               className="
//                 text-5xl
//                 text-[#174C35]
//               "
//               style={{
//                 fontFamily:
//                   "Fraunces, serif",
//               }}
//             >
//               Product Not Found
//             </h1>

//             <button
//               onClick={() =>
//                 navigate("/products")
//               }
//               className="
//                 mt-8
//                 rounded-full
//                 bg-[#174C35]
//                 px-8
//                 py-4
//                 text-white
//                 font-semibold
//                 transition-all
//                 duration-300
//                 hover:-translate-y-1
//                 hover:shadow-xl
//               "
//             >
//               Back to Products
//             </button>

//           </div>
//         </main>

//         <Footer />
//       </>
//     );
//   }

//   /* =====================================================
//      CALCULATIONS
//   ===================================================== */

//   const discount =
//     product.mrp > 0
//       ? Math.round(
//           ((product.mrp -
//             product.sellingPrice) /
//             product.mrp) *
//             100
//         )
//       : 0;

//   const outOfStock =
//     product.stock <= 0;

//   const weight =
//     formatWeight(product.weight);

//   /* =====================================================
//      REVIEWS
//   ===================================================== */

//   const reviews = [
//     {
//       name: "Priya",
//       city: "Delhi",
//       text: "Best makhana I've ever tasted.",
//     },
//     {
//       name: "Rohan",
//       city: "Mumbai",
//       text: "Premium quality and amazing crunch.",
//     },
//     {
//       name: "Sneha",
//       city: "Bangalore",
//       text: "Healthy snacking finally tastes good.",
//     },
//     {
//       name: "Arjun",
//       city: "Chennai",
//       text: "Peri Peri flavour is my favourite.",
//     },
//     {
//       name: "Megha",
//       city: "Pune",
//       text: "Packaging feels very premium.",
//     },
//   ];

//   /* =====================================================
//      PAGE
//   ===================================================== */

//   return (
//     <>
//       <Navbar alwaysCapsule />

//       <section
//         className="
//           min-h-screen
//           bg-[#F6F3EC]
//           pt-32
//           md:pt-36
//           pb-20
//         "
//       >

//         <div
//           className="
//             mx-auto
//             max-w-7xl
//             px-5
//             lg:px-8
//           "
//         >

//           {/* =================================================
//               PRODUCT HERO
//           ================================================= */}

//           <div
//             className="
//               grid
//               items-start
//               gap-12
//               lg:grid-cols-2
//               xl:gap-16
//             "
//           >

//             {/* =================================================
//                 LEFT — IMAGE GALLERY
//             ================================================= */}

//             <div>

//               {/* MAIN IMAGE */}

//               <div
//                 className="
//                   overflow-hidden
//                   rounded-[34px]
//                   border
//                   border-[#ECE7DB]
//                   bg-white
//                   shadow-[0_20px_60px_rgba(24,76,53,0.06)]
//                 "
//               >

//                 <div
//                   className="
//                     flex
//                     h-[420px]
//                     items-center
//                     justify-center
//                     p-8
//                     md:h-[500px]
//                     md:p-10
//                   "
//                 >

//                   <img
//                     src={
//                       selectedImage ||
//                       product.images[0]
//                     }
//                     alt={product.title}
//                     className="
//                       max-h-full
//                       max-w-full
//                       object-contain
//                       transition-all
//                       duration-500
//                       hover:scale-[1.04]
//                     "
//                   />

//                 </div>

//               </div>

//               {/* =================================================
//                   THUMBNAIL GALLERY
//               ================================================= */}

//               <div
//                 className="
//                   mt-5
//                   flex
//                   gap-3
//                   overflow-x-auto
//                   pb-2
//                 "
//               >

//                 {product.images.map(
//                   (img, index) => (

//                     <button
//                       key={index}
//                       type="button"
//                       onClick={() =>
//                         setSelectedImage(img)
//                       }
//                       className={`
//                         flex
//                         h-[96px]
//                         w-[96px]
//                         shrink-0
//                         items-center
//                         justify-center
//                         rounded-[22px]
//                         bg-white
//                         border-[3px]
//                         transition-all
//                         duration-300

//                         ${
//                           selectedImage === img
//                             ? "border-[#174C35] shadow-[0_8px_20px_rgba(24,76,53,0.12)]"
//                             : "border-transparent hover:border-[#174C35]/30"
//                         }
//                       `}
//                     >

//                       <img
//                         src={img}
//                         alt={`${product.title} ${
//                           index + 1
//                         }`}
//                         className="
//                           h-16
//                           w-16
//                           object-contain
//                         "
//                       />

//                     </button>

//                   )
//                 )}

//               </div>

//             </div>

//             {/* =================================================
//                 RIGHT — PRODUCT INFORMATION
//             ================================================= */}

//             <div>

//               {/* =================================================
//                   BADGES
//               ================================================= */}

//               <div
//                 className="
//                   flex
//                   flex-wrap
//                   items-center
//                   gap-3
//                 "
//               >

//                 {/* PRODUCT BADGE */}

//                 <span
//                   className="
//                     inline-flex
//                     items-center
//                     rounded-full
//                     px-4
//                     py-2
//                     text-[11px]
//                     font-semibold
//                     tracking-[0.15em]
//                     text-white
//                   "
//                   style={{
//                     background:
//                       product.theme.accent,
//                   }}
//                 >
//                   {product.badge ||
//                     "POPFRESH"}
//                 </span>

//                 {/* PRODUCT WEIGHT */}

//                 <span
//                   className="
//                     inline-flex
//                     items-center
//                     rounded-full
//                     border
//                     border-[#ECE7DB]
//                     bg-white
//                     px-4
//                     py-2
//                     text-[11px]
//                     font-semibold
//                     tracking-[0.15em]
//                     text-[#174C35]
//                     shadow-[0_4px_15px_rgba(0,0,0,0.02)]
//                   "
//                 >
//                   {weight}
//                 </span>

//               </div>

//               {/* OUT OF STOCK */}

//               {outOfStock && (
//                 <div className="mt-4">

//                   <span
//                     className="
//                       inline-flex
//                       rounded-full
//                       bg-red-600
//                       px-4
//                       py-2
//                       text-sm
//                       font-semibold
//                       text-white
//                     "
//                   >
//                     OUT OF STOCK
//                   </span>

//                 </div>
//               )}

//               {/* =================================================
//                   PRODUCT TITLE
//               ================================================= */}

//               <h1
//                 className="
//                   mt-6
//                   text-[38px]
//                   leading-[1.05]
//                   text-[#174C35]
//                   md:text-[50px]
//                 "
//                 style={{
//                   fontFamily:
//                     "Fraunces, serif",
//                 }}
//               >
//                 {product.title}
//               </h1>

//               {/* =================================================
//                   HIGHLIGHTS
//               ================================================= */}

//               {product.highlights?.length >
//                 0 && (
//                 <div
//                   className="
//                     mt-8
//                     flex
//                     flex-wrap
//                     gap-3
//                   "
//                 >

//                   {product.highlights.map(
//                     (tag) => (
//                       <span
//                         key={tag}
//                         className="
//                           rounded-full
//                           border
//                           border-[#ECE7DB]
//                           bg-white
//                           px-4
//                           py-2
//                           text-sm
//                           font-medium
//                           text-[#174C35]
//                           shadow-[0_3px_12px_rgba(0,0,0,0.02)]
//                         "
//                       >
//                         {tag}
//                       </span>
//                     )
//                   )}

//                 </div>
//               )}

//               {/* =================================================
//                   RATING
//               ================================================= */}

//               <div
//                 className="
//                   mt-6
//                   flex
//                   items-center
//                   gap-3
//                 "
//               >

//                 <div
//                   className="
//                     flex
//                     items-center
//                     gap-0.5
//                     text-[#E4B94F]
//                   "
//                 >

//                   {[...Array(5)].map(
//                     (_, index) => (
//                       <Star
//                         key={index}
//                         size={18}
//                         fill="currentColor"
//                         strokeWidth={1.5}
//                       />
//                     )
//                   )}

//                 </div>

//                 <span
//                   className="
//                     text-sm
//                     text-[#667085]
//                   "
//                 >
//                   4.8 • 2,300+ Reviews
//                 </span>

//               </div>

//               {/* =================================================
//                   DESCRIPTION
//               ================================================= */}

//               <p
//                 className="
//                   mt-6
//                   max-w-xl
//                   text-[16px]
//                   leading-8
//                   text-[#667085]
//                 "
//               >
//                 {product.shortDescription}
//               </p>

//               {/* =================================================
//                   PRICING
//               ================================================= */}

//               <div
//                 className="
//                   mt-8
//                   flex
//                   flex-wrap
//                   items-center
//                   gap-4
//                 "
//               >

//                 <span
//                   className="
//                     text-5xl
//                     font-bold
//                     tracking-tight
//                     text-[#184C35]
//                   "
//                 >
//                   ₹
//                   {product.sellingPrice.toLocaleString(
//                     "en-IN"
//                   )}
//                 </span>

//                 {product.mrp >
//                   product.sellingPrice && (
//                   <span
//                     className="
//                       text-2xl
//                       text-gray-400
//                       line-through
//                     "
//                   >
//                     ₹
//                     {product.mrp.toLocaleString(
//                       "en-IN"
//                     )}
//                   </span>
//                 )}

//                 {discount > 0 && (
//                   <span
//                     className="
//                       rounded-full
//                       px-4
//                       py-2
//                       text-sm
//                       font-semibold
//                       text-white
//                     "
//                     style={{
//                       background:
//                         product.theme.accent,
//                     }}
//                   >
//                     {discount}% OFF
//                   </span>
//                 )}

//               </div>

//               {/* =================================================
//                   SMALL PREMIUM DIVIDER
//               ================================================= */}

//               <div
//                 className="
//                   mt-8
//                   h-px
//                   w-full
//                   bg-[#E7E1D6]
//                 "
//               />

//               {/* =================================================
//                   QUANTITY
//               ================================================= */}

//               <div className="mt-8">

//                 <QuantitySelector
//                   quantity={quantity}
//                   setQuantity={setQuantity}
//                   max={product.stock}
//                   disabled={outOfStock}
//                 />

//               </div>

//               {/* =================================================
//                   BUTTONS
//               ================================================= */}

//               <div
//                 className="
//                   mt-8
//                   grid
//                   grid-cols-1
//                   gap-4
//                   sm:grid-cols-2
//                 "
//               >

//                 {/* ADD TO CART */}

//                 <button
//                   type="button"
//                   disabled={outOfStock}
//                   onClick={() => {
//                     if (outOfStock) return;

//                     addToCart(
//                       product,
//                       quantity
//                     );
//                   }}
//                   className={`
//                     flex
//                     items-center
//                     justify-center
//                     gap-3
//                     rounded-full
//                     py-4
//                     font-semibold
//                     transition-all
//                     duration-300

//                     ${
//                       outOfStock
//                         ? "cursor-not-allowed bg-gray-400 text-white"
//                         : "text-white hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
//                     }
//                   `}
//                   style={
//                     !outOfStock
//                       ? {
//                           background:
//                             product.theme
//                               .accent,
//                         }
//                       : {}
//                   }
//                 >

//                   <ShoppingCart
//                     size={20}
//                   />

//                   Add to Cart

//                 </button>

//                 {/* BUY NOW */}

//                 <button
//                   type="button"
//                   disabled={outOfStock}
//                   onClick={() => {
//                     if (outOfStock) return;

//                     buyNow(
//                       product,
//                       quantity
//                     );

//                     navigate(
//                       "/checkout/shipping"
//                     );
//                   }}
//                   className={`
//                     flex
//                     items-center
//                     justify-center
//                     gap-3
//                     rounded-full
//                     border-2
//                     py-4
//                     font-semibold
//                     transition-all
//                     duration-300

//                     ${
//                       outOfStock
//                         ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500"
//                         : "border-[#174C35] text-[#174C35] hover:-translate-y-0.5 hover:bg-[#174C35] hover:text-white"
//                     }
//                   `}
//                 >

//                   <CreditCard
//                     size={20}
//                   />

//                   Buy Now

//                 </button>

//               </div>

//             </div>

//           </div>

//           {/* =================================================
//               POPFRESH MARQUEE
//           ================================================= */}

//           <div
//             className="
//               relative
//               left-1/2
//               right-1/2
//               -ml-[50vw]
//               -mr-[50vw]
//               mt-24
//               mb-24
//               w-screen
//             "
//           >
//             <PopFreshMarquee />
//           </div>

//           {/* =================================================
//               CUSTOMERS ALSO BOUGHT
//           ================================================= */}

//           <div
//             className="
//               mx-auto
//               max-w-7xl
//             "
//           >

//             <div
//               className="
//                 mb-12
//                 text-center
//               "
//             >

//               <span
//                 className="
//                   inline-flex
//                   rounded-full
//                   bg-[#E9E3D8]
//                   px-5
//                   py-2
//                   text-xs
//                   font-medium
//                   tracking-[0.18em]
//                   text-[#174C35]
//                 "
//               >
//                 YOU MAY ALSO LIKE
//               </span>

//               <h2
//                 className="
//                   mt-5
//                   text-4xl
//                   text-[#174C35]
//                   md:text-5xl
//                 "
//                 style={{
//                   fontFamily:
//                     "Fraunces, serif",
//                 }}
//               >
//                 Customers Also Bought
//               </h2>

//               <p
//                 className="
//                   mt-4
//                   text-[#667085]
//                 "
//               >
//                 Explore more delicious
//                 flavours from PopFresh.
//               </p>

//             </div>

//             <div
//               className="
//                 grid
//                 gap-8
//                 md:grid-cols-2
//                 xl:grid-cols-3
//               "
//             >

//               {relatedProducts.map(
//                 (item) => (

//                   <Link
//                     key={item.id}
//                     to={
//                       item.stock > 0
//                         ? `/products/${item.slug}`
//                         : "#"
//                     }
//                     onClick={(e) => {
//                       if (
//                         item.stock <= 0
//                       ) {
//                         e.preventDefault();
//                       }
//                     }}
//                     className={`
//                       group
//                       flex
//                       flex-col
//                       overflow-hidden
//                       rounded-[32px]
//                       transition-all
//                       duration-300

//                       ${
//                         item.stock > 0
//                           ? "hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
//                           : "cursor-not-allowed opacity-90"
//                       }
//                     `}
//                     style={{
//                       background:
//                         item.theme.background,
//                     }}
//                   >

//                     {/* =========================================
//                         BADGE
//                     ========================================== */}

//                     <div
//                       className="
//                         p-6
//                         pb-0
//                       "
//                     >

//                       <span
//                         className="
//                           inline-flex
//                           rounded-full
//                           px-4
//                           py-2
//                           text-[11px]
//                           font-medium
//                           tracking-[0.15em]
//                           text-white
//                         "
//                         style={{
//                           background:
//                             item.theme.accent,
//                         }}
//                       >
//                         {item.badge ||
//                           "POPFRESH"}
//                       </span>

//                     </div>

//                     {/* =========================================
//                         IMAGE
//                     ========================================== */}

//                     <div
//                       className="
//                         px-6
//                         pt-6
//                       "
//                     >

//                       {/* 
//                         FIX:
//                         Fixed-height image container + object-contain
//                         prevents tall product packaging from being clipped.
//                       */}

//                       <div
//                         className="
//                           relative
//                           flex
//                           h-[300px]
//                           w-full
//                           items-center
//                           justify-center
//                           overflow-hidden
//                           rounded-[24px]
//                           bg-white/40
//                           ring-1
//                           ring-black/[0.025]
//                         "
//                       >

//                         {item.images?.length > 0 ? (
//                           <img
//                             src={item.images[0]}
//                             alt={item.title}
//                             className="
//                               block
//                               h-full
//                               w-full
//                               object-contain
//                               p-3
//                               transition-transform
//                               duration-500
//                               group-hover:scale-[1.03]
//                             "
//                           />
//                         ) : (
//                           <div
//                             className="
//                               flex
//                               h-full
//                               w-full
//                               items-center
//                               justify-center
//                               text-sm
//                               text-[#667085]
//                             "
//                           >
//                             No image available
//                           </div>
//                         )}

//                         {/* OUT OF STOCK */}

//                         {item.stock <= 0 && (
//                           <div
//                             className="
//                               absolute
//                               inset-0
//                               flex
//                               items-center
//                               justify-center
//                               bg-black/45
//                               backdrop-blur-sm
//                             "
//                           >

//                             <span
//                               className="
//                                 rounded-full
//                                 bg-red-600
//                                 px-5
//                                 py-2
//                                 text-sm
//                                 font-bold
//                                 text-white
//                               "
//                             >
//                               OUT OF STOCK
//                             </span>

//                           </div>
//                         )}

//                       </div>

//                     </div>

//                     {/* =========================================
//                         CONTENT
//                     ========================================== */}

//                     <div
//                       className="
//                         flex
//                         flex-1
//                         flex-col
//                         p-6
//                       "
//                     >

//                       <h3
//                         className="
//                           text-2xl
//                           leading-tight
//                           text-[#174C35]
//                         "
//                         style={{
//                           fontFamily:
//                             "Fraunces, serif",
//                         }}
//                       >
//                         {item.title}
//                       </h3>

//                       <p
//                         className="
//                           mt-4
//                           flex-1
//                           leading-7
//                           text-[#667085]
//                         "
//                       >
//                         {
//                           item.shortDescription
//                         }
//                       </p>

//                       {/* TAGS */}

//                       <div
//                         className="
//                           mt-5
//                           flex
//                           flex-wrap
//                           gap-2
//                         "
//                       >

//                         {item.highlights
//                           ?.slice(0, 3)
//                           .map(
//                             (tag) => (
//                               <span
//                                 key={tag}
//                                 className="
//                                   rounded-full
//                                   bg-white
//                                   px-3
//                                   py-1
//                                   text-sm
//                                   text-[#174C35]
//                                 "
//                               >
//                                 {tag}
//                               </span>
//                             )
//                           )}

//                       </div>

//                       {/* PRICE */}

//                       <div
//                         className="
//                           mt-6
//                           flex
//                           items-center
//                           gap-3
//                         "
//                       >

//                         <span
//                           className="
//                             text-3xl
//                             font-bold
//                           "
//                           style={{
//                             color:
//                               item.theme.text,
//                           }}
//                         >
//                           ₹
//                           {item.sellingPrice.toLocaleString(
//                             "en-IN"
//                           )}
//                         </span>

//                         {item.mrp >
//                           item.sellingPrice && (
//                           <span
//                             className="
//                               text-lg
//                               text-gray-400
//                               line-through
//                             "
//                           >
//                             ₹
//                             {item.mrp.toLocaleString(
//                               "en-IN"
//                             )}
//                           </span>
//                         )}

//                       </div>

//                       {/* CTA */}

//                       <button
//                         type="button"
//                         disabled={
//                           item.stock <= 0
//                         }
//                         className={`
//                           mt-7
//                           w-full
//                           rounded-full
//                           py-4
//                           font-semibold
//                           transition-all
//                           duration-300

//                           ${
//                             item.stock <= 0
//                               ? "cursor-not-allowed bg-gray-400 text-white"
//                               : "text-white hover:-translate-y-0.5 hover:shadow-lg"
//                           }
//                         `}
//                         style={
//                           item.stock > 0
//                             ? {
//                                 background:
//                                   item.theme
//                                     .accent,
//                               }
//                             : {}
//                         }
//                       >
//                         {item.stock > 0
//                           ? "View Product"
//                           : "Out of Stock"}
//                       </button>

//                     </div>

//                   </Link>

//                 )
//               )}

//             </div>

//           </div>

//           {/* =================================================
//               MARKETPLACE CTA
//           ================================================= */}

//           <MarketplaceCTA
//             amazon={product.amazon}
//             flipkart={product.flipkart}
//           />

//           {/* =================================================
//               REVIEWS
//           ================================================= */}

//           <div
//             className="
//               relative
//               left-1/2
//               right-1/2
//               -ml-[50vw]
//               -mr-[50vw]
//               mt-28
//               w-screen
//               overflow-hidden
//             "
//           >

//             <div
//               className="
//                 mb-12
//                 text-center
//               "
//             >

//               <span
//                 className="
//                   inline-flex
//                   rounded-full
//                   bg-[#E9E3D8]
//                   px-5
//                   py-2
//                   text-xs
//                   font-medium
//                   tracking-[0.18em]
//                   text-[#174C35]
//                 "
//               >
//                 CUSTOMER LOVE
//               </span>

//               <h2
//                 className="
//                   mt-5
//                   text-4xl
//                   text-[#174C35]
//                   md:text-5xl
//                 "
//                 style={{
//                   fontFamily:
//                     "Fraunces, serif",
//                 }}
//               >
//                 Loved By Snackers
//               </h2>

//               <p
//                 className="
//                   mt-4
//                   text-[#667085]
//                 "
//               >
//                 Thousands of happy
//                 crunches across India.
//               </p>

//             </div>

//             <div
//               className="
//                 flex
//                 w-max
//                 gap-6
//                 px-6
//                 animate-[marquee_30s_linear_infinite]
//               "
//             >

//               {[...reviews, ...reviews].map(
//                 (review, index) => (

//                   <div
//                     key={index}
//                     className="
//                       w-[280px]
//                       rounded-[30px]
//                       border
//                       border-[#ECE7DB]
//                       bg-white
//                       p-8
//                       shadow-sm
//                       transition-all
//                       duration-300
//                       hover:-translate-y-2
//                       hover:shadow-xl
//                       md:w-[330px]
//                     "
//                   >

//                     {/* STARS */}

//                     <div
//                       className="
//                         mb-5
//                         flex
//                         gap-1
//                         text-[#E4C06A]
//                       "
//                     >

//                       {[...Array(5)].map(
//                         (_, i) => (
//                           <Star
//                             key={i}
//                             size={18}
//                             fill="currentColor"
//                           />
//                         )
//                       )}

//                     </div>

//                     {/* REVIEW */}

//                     <p
//                       className="
//                         text-lg
//                         leading-8
//                         text-[#174C35]
//                       "
//                     >
//                       "{review.text}"
//                     </p>

//                     {/* USER */}

//                     <div className="mt-8">

//                       <h4
//                         className="
//                           font-semibold
//                           text-[#174C35]
//                         "
//                       >
//                         {review.name}
//                       </h4>

//                       <span
//                         className="
//                           text-sm
//                           text-[#667085]
//                         "
//                       >
//                         {review.city}
//                       </span>

//                     </div>

//                   </div>

//                 )
//               )}

//             </div>

//           </div>

//         </div>

//       </section>

//       <Footer />
//     </>
//   );
// }

// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";

// import {
//   Star,
//   ShoppingCart,
//   CreditCard,
// } from "lucide-react";

// import {
//   getProductBySlug,
//   getProducts,
// } from "../api/product.api";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import PopFreshMarquee from "../components/PopFreshMarquee";
// import QuantitySelector from "../components/QuantitySelector";
// import ProductImageSlider from "../components/ProductImageSlider";
// import MarketplaceCTA from "../components/MarketplaceCTA";

// import { useCart } from "../context/CartContext";

// /* =====================================================
//    CARD THEMES
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
//    FORMAT PRODUCT WEIGHT
// ===================================================== */

// const formatWeight = (weight) => {
//   if (weight === null || weight === undefined || weight === "") {
//     return "50 GRAMS";
//   }

//   const value = String(weight)
//     .trim()
//     .replace(/\s*(g|gm|gms|gram|grams)\s*/gi, "");

//   return `${value} GRAMS`;
// };

// /* =====================================================
//    PRODUCT DETAILS
// ===================================================== */

// export default function ProductDetails() {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const { addToCart, buyNow } = useCart();

//   const [product, setProduct] = useState(null);

//   const [relatedProducts, setRelatedProducts] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [selectedImage, setSelectedImage] =
//     useState(null);

//   const [quantity, setQuantity] =
//     useState(1);

//   /* ===================================================
//      FETCH PRODUCT
//   =================================================== */

//   const fetchProduct = async () => {
//     try {
//       setLoading(true);

//       const data = await getProductBySlug(slug);

//       /* -----------------------------------------------
//          MAP MAIN PRODUCT
//       ------------------------------------------------ */

//       const mapped = {
//         ...data,

//         title: data.name,

//         sellingPrice: Number(
//           data.discountPrice || data.price
//         ),

//         mrp: Number(data.price),

//         shortDescription:
//           data.description,

//         images: Array.isArray(data.images)
//           ? data.images
//               .map((img) => img.imageUrl)
//               .filter(Boolean)
//           : [],

//         badge: data.badge,

//         highlights:
//           data.highlights || [],

//         theme:
//           CARD_THEMES[data.cardTheme] ||
//           CARD_THEMES.GREEN,
//       };

//       setProduct(mapped);

//       /* -----------------------------------------------
//          FETCH RELATED PRODUCTS
//       ------------------------------------------------ */

//       const allProducts = await getProducts();

//       const related = allProducts
//         .filter(
//           (item) =>
//             item.categoryId === mapped.categoryId &&
//             item.id !== mapped.id
//         )
//         .slice(0, 3)
//         .map((item) => ({
//           ...item,

//           title: item.name,

//           sellingPrice: Number(
//             item.discountPrice || item.price
//           ),

//           mrp: Number(item.price),

//           shortDescription:
//             item.description,

//           images: Array.isArray(item.images)
//             ? item.images
//                 .map((img) => img.imageUrl)
//                 .filter(Boolean)
//             : [],

//           badge: item.badge,

//           highlights:
//             item.highlights || [],

//           theme:
//             CARD_THEMES[item.cardTheme] ||
//             CARD_THEMES.GREEN,
//         }));

//       setRelatedProducts(related);
//     } catch (err) {
//       console.error(err);

//       navigate("/products", {
//         replace: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ===================================================
//      LOAD PRODUCT
//   =================================================== */

//   useEffect(() => {
//     fetchProduct();
//   }, [slug]);

//   /* ===================================================
//      RESET IMAGE + SCROLL
//   =================================================== */

//   useEffect(() => {
//     if (product?.images?.length) {
//       setSelectedImage(product.images[0]);
//     }

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, [product]);

//   /* =====================================================
//      LOADING
//   ===================================================== */

//   if (loading) {
//     return (
//       <>
//         <Navbar alwaysCapsule />

//         <main
//           className="
//             min-h-screen
//             bg-[#F6F3EC]
//             flex
//             items-center
//             justify-center
//           "
//         >
//           <div className="flex flex-col items-center">

//             <div className="flex gap-3">
//               <span
//                 className="
//                   h-4
//                   w-4
//                   rounded-full
//                   bg-[#184C35]
//                   animate-bounce
//                 "
//               />

//               <span
//                 className="
//                   h-4
//                   w-4
//                   rounded-full
//                   bg-[#3E8C57]
//                   animate-bounce
//                 "
//                 style={{
//                   animationDelay: "150ms",
//                 }}
//               />

//               <span
//                 className="
//                   h-4
//                   w-4
//                   rounded-full
//                   bg-[#D7A326]
//                   animate-bounce
//                 "
//                 style={{
//                   animationDelay: "300ms",
//                 }}
//               />
//             </div>

//             <p
//               className="
//                 mt-8
//                 text-sm
//                 uppercase
//                 tracking-[0.2em]
//                 text-[#184C35]
//               "
//             >
//               Preparing your snack...
//             </p>
//           </div>
//         </main>

//         <Footer />
//       </>
//     );
//   }

//   /* =====================================================
//      PRODUCT NOT FOUND
//   ===================================================== */

//   if (!product) {
//     return (
//       <>
//         <Navbar alwaysCapsule />

//         <main
//           className="
//             min-h-screen
//             bg-[#F6F3EC]
//             pt-40
//             flex
//             items-center
//             justify-center
//           "
//         >
//           <div className="text-center">

//             <h1
//               className="
//                 text-5xl
//                 text-[#174C35]
//               "
//               style={{
//                 fontFamily: "Fraunces, serif",
//               }}
//             >
//               Product Not Found
//             </h1>

//             <button
//               onClick={() =>
//                 navigate("/products")
//               }
//               className="
//                 mt-8
//                 rounded-full
//                 bg-[#174C35]
//                 px-8
//                 py-4
//                 text-white
//                 font-semibold
//                 transition-all
//                 duration-300
//                 hover:-translate-y-1
//                 hover:shadow-xl
//               "
//             >
//               Back to Products
//             </button>

//           </div>
//         </main>

//         <Footer />
//       </>
//     );
//   }

//   /* =====================================================
//      CALCULATIONS
//   ===================================================== */

//   const discount =
//     product.mrp > 0
//       ? Math.round(
//           ((product.mrp -
//             product.sellingPrice) /
//             product.mrp) *
//             100
//         )
//       : 0;

//   const outOfStock =
//     product.stock <= 0;

//   const weight =
//     formatWeight(product.weight);

//   /* =====================================================
//      REVIEWS
//   ===================================================== */

//   const reviews = [
//     {
//       name: "Priya",
//       city: "Delhi",
//       text: "Best makhana I've ever tasted.",
//     },
//     {
//       name: "Rohan",
//       city: "Mumbai",
//       text: "Premium quality and amazing crunch.",
//     },
//     {
//       name: "Sneha",
//       city: "Bangalore",
//       text: "Healthy snacking finally tastes good.",
//     },
//     {
//       name: "Arjun",
//       city: "Chennai",
//       text: "Peri Peri flavour is my favourite.",
//     },
//     {
//       name: "Megha",
//       city: "Pune",
//       text: "Packaging feels very premium.",
//     },
//   ];

//   /* =====================================================
//      PAGE
//   ===================================================== */

//   return (
//     <>
//       <Navbar alwaysCapsule />

//       <section
//         className="
//           min-h-screen
//           bg-[#F6F3EC]
//           pt-32
//           md:pt-36
//           pb-20
//         "
//       >

//         <div
//           className="
//             mx-auto
//             max-w-7xl
//             px-5
//             lg:px-8
//           "
//         >

//           {/* =================================================
//               PRODUCT HERO
//           ================================================= */}

//           <div
//             className="
//               grid
//               items-start
//               gap-12
//               lg:grid-cols-2
//               xl:gap-16
//             "
//           >

//             {/* =================================================
//                 LEFT — IMAGE GALLERY
//             ================================================= */}

//             <div>

//               {/* MAIN IMAGE */}

//               <div
//                 className="
//                   overflow-hidden
//                   rounded-[34px]
//                   border
//                   border-[#ECE7DB]
//                   bg-white
//                   shadow-[0_20px_60px_rgba(24,76,53,0.06)]
//                 "
//               >

//                 <div
//                   className="
//                     flex
//                     h-[420px]
//                     items-center
//                     justify-center
//                     p-8
//                     md:h-[500px]
//                     md:p-10
//                   "
//                 >

//                   <img
//                     src={
//                       selectedImage ||
//                       product.images[0]
//                     }
//                     alt={product.title}
//                     className="
//                       max-h-full
//                       max-w-full
//                       object-contain
//                       transition-all
//                       duration-500
//                       hover:scale-[1.04]
//                     "
//                   />

//                 </div>

//               </div>

//               {/* =================================================
//                   THUMBNAIL GALLERY
//               ================================================= */}

//               <div
//                 className="
//                   mt-5
//                   flex
//                   gap-3
//                   overflow-x-auto
//                   pb-2
//                 "
//               >

//                 {product.images.map(
//                   (img, index) => (

//                     <button
//                       key={index}
//                       type="button"
//                       onClick={() =>
//                         setSelectedImage(img)
//                       }
//                       className={`
//                         flex
//                         h-[96px]
//                         w-[96px]
//                         shrink-0
//                         items-center
//                         justify-center
//                         rounded-[22px]
//                         bg-white
//                         border-[3px]
//                         transition-all
//                         duration-300

//                         ${
//                           selectedImage === img
//                             ? "border-[#174C35] shadow-[0_8px_20px_rgba(24,76,53,0.12)]"
//                             : "border-transparent hover:border-[#174C35]/30"
//                         }
//                       `}
//                     >

//                       <img
//                         src={img}
//                         alt={`${product.title} ${
//                           index + 1
//                         }`}
//                         className="
//                           h-16
//                           w-16
//                           object-contain
//                         "
//                       />

//                     </button>

//                   )
//                 )}

//               </div>

//             </div>

//             {/* =================================================
//                 RIGHT — PRODUCT INFORMATION
//             ================================================= */}

//             <div>

//               {/* =================================================
//                   BADGES
//               ================================================= */}

//               <div
//                 className="
//                   flex
//                   flex-wrap
//                   items-center
//                   gap-3
//                 "
//               >

//                 {/* PRODUCT BADGE */}

//                 <span
//                   className="
//                     inline-flex
//                     items-center
//                     rounded-full
//                     px-4
//                     py-2
//                     text-[11px]
//                     font-semibold
//                     tracking-[0.15em]
//                     text-white
//                   "
//                   style={{
//                     background:
//                       product.theme.accent,
//                   }}
//                 >
//                   {product.badge ||
//                     "POPFRESH"}
//                 </span>

//                 {/* PRODUCT WEIGHT */}

//                 <span
//                   className="
//                     inline-flex
//                     items-center
//                     rounded-full
//                     border
//                     border-[#ECE7DB]
//                     bg-white
//                     px-4
//                     py-2
//                     text-[11px]
//                     font-semibold
//                     tracking-[0.15em]
//                     text-[#174C35]
//                     shadow-[0_4px_15px_rgba(0,0,0,0.02)]
//                   "
//                 >
//                   {weight}
//                 </span>

//               </div>

//               {/* OUT OF STOCK */}

//               {outOfStock && (
//                 <div className="mt-4">

//                   <span
//                     className="
//                       inline-flex
//                       rounded-full
//                       bg-red-600
//                       px-4
//                       py-2
//                       text-sm
//                       font-semibold
//                       text-white
//                     "
//                   >
//                     OUT OF STOCK
//                   </span>

//                 </div>
//               )}

//               {/* =================================================
//                   PRODUCT TITLE
//               ================================================= */}

//               <h1
//                 className="
//                   mt-6
//                   text-[38px]
//                   leading-[1.05]
//                   text-[#174C35]
//                   md:text-[50px]
//                 "
//                 style={{
//                   fontFamily:
//                     "Fraunces, serif",
//                 }}
//               >
//                 {product.title}
//               </h1>

//               {/* =================================================
//                   HIGHLIGHTS
//               ================================================= */}

//               {product.highlights?.length >
//                 0 && (
//                 <div
//                   className="
//                     mt-8
//                     flex
//                     flex-wrap
//                     gap-3
//                   "
//                 >

//                   {product.highlights.map(
//                     (tag) => (
//                       <span
//                         key={tag}
//                         className="
//                           rounded-full
//                           border
//                           border-[#ECE7DB]
//                           bg-white
//                           px-4
//                           py-2
//                           text-sm
//                           font-medium
//                           text-[#174C35]
//                           shadow-[0_3px_12px_rgba(0,0,0,0.02)]
//                         "
//                       >
//                         {tag}
//                       </span>
//                     )
//                   )}

//                 </div>
//               )}

//               {/* =================================================
//                   RATING
//               ================================================= */}

//               <div
//                 className="
//                   mt-6
//                   flex
//                   items-center
//                   gap-3
//                 "
//               >

//                 <div
//                   className="
//                     flex
//                     items-center
//                     gap-0.5
//                     text-[#E4B94F]
//                   "
//                 >

//                   {[...Array(5)].map(
//                     (_, index) => (
//                       <Star
//                         key={index}
//                         size={18}
//                         fill="currentColor"
//                         strokeWidth={1.5}
//                       />
//                     )
//                   )}

//                 </div>

//                 <span
//                   className="
//                     text-sm
//                     text-[#667085]
//                   "
//                 >
//                   4.8 • 2,300+ Reviews
//                 </span>

//               </div>

//               {/* =================================================
//                   DESCRIPTION
//               ================================================= */}

//               <p
//                 className="
//                   mt-6
//                   max-w-xl
//                   text-[16px]
//                   leading-8
//                   text-[#667085]
//                 "
//               >
//                 {product.shortDescription}
//               </p>

//               {/* =================================================
//                   PRICING
//               ================================================= */}

//               <div
//                 className="
//                   mt-8
//                   flex
//                   flex-wrap
//                   items-center
//                   gap-4
//                 "
//               >

//                 <span
//                   className="
//                     text-5xl
//                     font-bold
//                     tracking-tight
//                     text-[#184C35]
//                   "
//                 >
//                   ₹
//                   {product.sellingPrice.toLocaleString(
//                     "en-IN"
//                   )}
//                 </span>

//                 {product.mrp >
//                   product.sellingPrice && (
//                   <span
//                     className="
//                       text-2xl
//                       text-gray-400
//                       line-through
//                     "
//                   >
//                     ₹
//                     {product.mrp.toLocaleString(
//                       "en-IN"
//                     )}
//                   </span>
//                 )}

//                 {discount > 0 && (
//                   <span
//                     className="
//                       rounded-full
//                       px-4
//                       py-2
//                       text-sm
//                       font-semibold
//                       text-white
//                     "
//                     style={{
//                       background:
//                         product.theme.accent,
//                     }}
//                   >
//                     {discount}% OFF
//                   </span>
//                 )}

//               </div>

//               {/* =================================================
//                   SMALL PREMIUM DIVIDER
//               ================================================= */}

//               <div
//                 className="
//                   mt-8
//                   h-px
//                   w-full
//                   bg-[#E7E1D6]
//                 "
//               />

//               {/* =================================================
//                   QUANTITY
//               ================================================= */}

//               <div className="mt-8">

//                 <QuantitySelector
//                   quantity={quantity}
//                   setQuantity={setQuantity}
//                   max={product.stock}
//                   disabled={outOfStock}
//                 />

//               </div>

//               {/* =================================================
//                   BUTTONS
//               ================================================= */}

//               <div
//                 className="
//                   mt-8
//                   grid
//                   grid-cols-1
//                   gap-4
//                   sm:grid-cols-2
//                 "
//               >

//                 {/* ADD TO CART */}

//                 <button
//                   type="button"
//                   disabled={outOfStock}
//                   onClick={() => {
//                     if (outOfStock) return;

//                     addToCart(
//                       product,
//                       quantity
//                     );
//                   }}
//                   className={`
//                     flex
//                     items-center
//                     justify-center
//                     gap-3
//                     rounded-full
//                     py-4
//                     font-semibold
//                     transition-all
//                     duration-300

//                     ${
//                       outOfStock
//                         ? "cursor-not-allowed bg-gray-400 text-white"
//                         : "text-white hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
//                     }
//                   `}
//                   style={
//                     !outOfStock
//                       ? {
//                           background:
//                             product.theme
//                               .accent,
//                         }
//                       : {}
//                   }
//                 >

//                   <ShoppingCart
//                     size={20}
//                   />

//                   Add to Cart

//                 </button>

//                 {/* BUY NOW */}

//                 <button
//                   type="button"
//                   disabled={outOfStock}
//                   onClick={() => {
//                     if (outOfStock) return;

//                     buyNow(
//                       product,
//                       quantity
//                     );

//                     navigate(
//                       "/checkout/shipping"
//                     );
//                   }}
//                   className={`
//                     flex
//                     items-center
//                     justify-center
//                     gap-3
//                     rounded-full
//                     border-2
//                     py-4
//                     font-semibold
//                     transition-all
//                     duration-300

//                     ${
//                       outOfStock
//                         ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500"
//                         : "border-[#174C35] text-[#174C35] hover:-translate-y-0.5 hover:bg-[#174C35] hover:text-white"
//                     }
//                   `}
//                 >

//                   <CreditCard
//                     size={20}
//                   />

//                   Buy Now

//                 </button>

//               </div>

//             </div>

//           </div>

//           {/* =================================================
//               POPFRESH MARQUEE
//           ================================================= */}

//           <div
//             className="
//               relative
//               left-1/2
//               right-1/2
//               -ml-[50vw]
//               -mr-[50vw]
//               mt-24
//               mb-24
//               w-screen
//             "
//           >
//             <PopFreshMarquee />
//           </div>

//           {/* =================================================
//               CUSTOMERS ALSO BOUGHT
//           ================================================= */}

//           <div
//             className="
//               mx-auto
//               max-w-7xl
//             "
//           >

//             <div
//               className="
//                 mb-12
//                 text-center
//               "
//             >

//               <span
//                 className="
//                   inline-flex
//                   rounded-full
//                   bg-[#E9E3D8]
//                   px-5
//                   py-2
//                   text-xs
//                   font-medium
//                   tracking-[0.18em]
//                   text-[#174C35]
//                 "
//               >
//                 YOU MAY ALSO LIKE
//               </span>

//               <h2
//                 className="
//                   mt-5
//                   text-4xl
//                   text-[#174C35]
//                   md:text-5xl
//                 "
//                 style={{
//                   fontFamily:
//                     "Fraunces, serif",
//                 }}
//               >
//                 Customers Also Bought
//               </h2>

//               <p
//                 className="
//                   mt-4
//                   text-[#667085]
//                 "
//               >
//                 Explore more delicious
//                 flavours from PopFresh.
//               </p>

//             </div>

//             <div
//               className="
//                 grid
//                 gap-8
//                 md:grid-cols-2
//                 xl:grid-cols-3
//               "
//             >

//               {relatedProducts.map(
//                 (item) => (

//                   <Link
//                     key={item.id}
//                     to={
//                       item.stock > 0
//                         ? `/products/${item.slug}`
//                         : "#"
//                     }
//                     onClick={(e) => {
//                       if (
//                         item.stock <= 0
//                       ) {
//                         e.preventDefault();
//                       }
//                     }}
//                     className={`
//                       group
//                       flex
//                       flex-col
//                       overflow-hidden
//                       rounded-[32px]
//                       transition-all
//                       duration-300

//                       ${
//                         item.stock > 0
//                           ? "hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
//                           : "cursor-not-allowed opacity-90"
//                       }
//                     `}
//                     style={{
//                       background:
//                         item.theme
//                           .background,
//                     }}
//                   >

//                     {/* BADGE */}

//                     <div
//                       className="
//                         p-6
//                         pb-0
//                       "
//                     >

//                       <span
//                         className="
//                           inline-flex
//                           rounded-full
//                           px-4
//                           py-2
//                           text-[11px]
//                           font-medium
//                           tracking-[0.15em]
//                           text-white
//                         "
//                         style={{
//                           background:
//                             item.theme
//                               .accent,
//                         }}
//                       >
//                         {item.badge ||
//                           "POPFRESH"}
//                       </span>

//                     </div>

//                     {/* IMAGE */}

//                     <div
//                       className="
//                         px-6
//                         pt-6
//                       "
//                     >

//                       <div
//                         className="
//                           overflow-hidden
//                           rounded-[24px]
//                           bg-white/40
//                         "
//                       >

//                         <div
//                           className="
//                             relative
//                             overflow-hidden
//                             rounded-[24px]
//                             bg-white/40
//                           "
//                         >

//                           <ProductImageSlider
//                             images={
//                               item.images
//                             }
//                             title={
//                               item.title
//                             }
//                           />

//                           {item.stock <=
//                             0 && (
//                             <div
//                               className="
//                                 absolute
//                                 inset-0
//                                 flex
//                                 items-center
//                                 justify-center
//                                 bg-black/45
//                                 backdrop-blur-sm
//                               "
//                             >

//                               <span
//                                 className="
//                                   rounded-full
//                                   bg-red-600
//                                   px-5
//                                   py-2
//                                   text-sm
//                                   font-bold
//                                   text-white
//                                 "
//                               >
//                                 OUT OF STOCK
//                               </span>

//                             </div>
//                           )}

//                         </div>

//                       </div>

//                     </div>

//                     {/* CONTENT */}

//                     <div
//                       className="
//                         flex
//                         flex-1
//                         flex-col
//                         p-6
//                       "
//                     >

//                       <h3
//                         className="
//                           text-2xl
//                           leading-tight
//                           text-[#174C35]
//                         "
//                         style={{
//                           fontFamily:
//                             "Fraunces, serif",
//                         }}
//                       >
//                         {item.title}
//                       </h3>

//                       <p
//                         className="
//                           mt-4
//                           flex-1
//                           leading-7
//                           text-[#667085]
//                         "
//                       >
//                         {
//                           item.shortDescription
//                         }
//                       </p>

//                       {/* TAGS */}

//                       <div
//                         className="
//                           mt-5
//                           flex
//                           flex-wrap
//                           gap-2
//                         "
//                       >

//                         {item.highlights
//                           ?.slice(0, 3)
//                           .map(
//                             (tag) => (
//                               <span
//                                 key={tag}
//                                 className="
//                                   rounded-full
//                                   bg-white
//                                   px-3
//                                   py-1
//                                   text-sm
//                                   text-[#174C35]
//                                 "
//                               >
//                                 {tag}
//                               </span>
//                             )
//                           )}

//                       </div>

//                       {/* PRICE */}

//                       <div
//                         className="
//                           mt-6
//                           flex
//                           items-center
//                           gap-3
//                         "
//                       >

//                         <span
//                           className="
//                             text-3xl
//                             font-bold
//                           "
//                           style={{
//                             color:
//                               item.theme
//                                 .text,
//                           }}
//                         >
//                           ₹
//                           {item.sellingPrice.toLocaleString(
//                             "en-IN"
//                           )}
//                         </span>

//                         {item.mrp >
//                           item.sellingPrice && (
//                           <span
//                             className="
//                               text-lg
//                               text-gray-400
//                               line-through
//                             "
//                           >
//                             ₹
//                             {item.mrp.toLocaleString(
//                               "en-IN"
//                             )}
//                           </span>
//                         )}

//                       </div>

//                       {/* CTA */}

//                       <button
//                         type="button"
//                         disabled={
//                           item.stock <= 0
//                         }
//                         className={`
//                           mt-7
//                           w-full
//                           rounded-full
//                           py-4
//                           font-semibold
//                           transition-all
//                           duration-300

//                           ${
//                             item.stock <= 0
//                               ? "cursor-not-allowed bg-gray-400 text-white"
//                               : "text-white hover:-translate-y-0.5 hover:shadow-lg"
//                           }
//                         `}
//                         style={
//                           item.stock > 0
//                             ? {
//                                 background:
//                                   item
//                                     .theme
//                                     .accent,
//                               }
//                             : {}
//                         }
//                       >
//                         {item.stock > 0
//                           ? "View Product"
//                           : "Out of Stock"}
//                       </button>

//                     </div>

//                   </Link>

//                 )
//               )}

//             </div>

//           </div>

//           {/* =================================================
//               MARKETPLACE CTA
//           ================================================= */}

//           <MarketplaceCTA
//             amazon={product.amazon}
//             flipkart={product.flipkart}
//           />

//           {/* =================================================
//               REVIEWS
//           ================================================= */}

//           <div
//             className="
//               relative
//               left-1/2
//               right-1/2
//               -ml-[50vw]
//               -mr-[50vw]
//               mt-28
//               w-screen
//               overflow-hidden
//             "
//           >

//             <div
//               className="
//                 mb-12
//                 text-center
//               "
//             >

//               <span
//                 className="
//                   inline-flex
//                   rounded-full
//                   bg-[#E9E3D8]
//                   px-5
//                   py-2
//                   text-xs
//                   font-medium
//                   tracking-[0.18em]
//                   text-[#174C35]
//                 "
//               >
//                 CUSTOMER LOVE
//               </span>

//               <h2
//                 className="
//                   mt-5
//                   text-4xl
//                   text-[#174C35]
//                   md:text-5xl
//                 "
//                 style={{
//                   fontFamily:
//                     "Fraunces, serif",
//                 }}
//               >
//                 Loved By Snackers
//               </h2>

//               <p
//                 className="
//                   mt-4
//                   text-[#667085]
//                 "
//               >
//                 Thousands of happy
//                 crunches across India.
//               </p>

//             </div>

//             <div
//               className="
//                 flex
//                 w-max
//                 gap-6
//                 px-6
//                 animate-[marquee_30s_linear_infinite]
//               "
//             >

//               {[...reviews, ...reviews].map(
//                 (review, index) => (

//                   <div
//                     key={index}
//                     className="
//                       w-[280px]
//                       rounded-[30px]
//                       border
//                       border-[#ECE7DB]
//                       bg-white
//                       p-8
//                       shadow-sm
//                       transition-all
//                       duration-300
//                       hover:-translate-y-2
//                       hover:shadow-xl
//                       md:w-[330px]
//                     "
//                   >

//                     {/* STARS */}

//                     <div
//                       className="
//                         mb-5
//                         flex
//                         gap-1
//                         text-[#E4C06A]
//                       "
//                     >

//                       {[...Array(5)].map(
//                         (_, i) => (
//                           <Star
//                             key={i}
//                             size={18}
//                             fill="currentColor"
//                           />
//                         )
//                       )}

//                     </div>

//                     {/* REVIEW */}

//                     <p
//                       className="
//                         text-lg
//                         leading-8
//                         text-[#174C35]
//                       "
//                     >
//                       "{review.text}"
//                     </p>

//                     {/* USER */}

//                     <div className="mt-8">

//                       <h4
//                         className="
//                           font-semibold
//                           text-[#174C35]
//                         "
//                       >
//                         {review.name}
//                       </h4>

//                       <span
//                         className="
//                           text-sm
//                           text-[#667085]
//                         "
//                       >
//                         {review.city}
//                       </span>

//                     </div>

//                   </div>

//                 )
//               )}

//             </div>

//           </div>

//         </div>

//       </section>

//       <Footer />
//     </>
//   );
// }

// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import {
//   Star,
//   ShieldCheck,
//   ShoppingCart,
//   CreditCard,
// } from "lucide-react";
// import {
//   getProductBySlug,
//   getProducts,
// } from "../api/product.api";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import PopFreshMarquee from "../components/PopFreshMarquee";
// import QuantitySelector from "../components/QuantitySelector";
// import ProductImageSlider from "../components/ProductImageSlider";
// import MarketplaceCTA from "../components/MarketplaceCTA";

// import { useCart } from "../context/CartContext";


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

// export default function ProductDetails() {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const { addToCart, buyNow } = useCart();

//   const [product, setProduct] = useState(null);

// const [relatedProducts, setRelatedProducts] =
//   useState([]);

// const [loading, setLoading] =
//   useState(true);

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   const fetchProduct = async () => {

//   try {

//     setLoading(true);

//     const data = await getProductBySlug(slug);

//     const mapped = {

//   ...data,

//   // Keep old UI field names
//   title: data.name,

//   sellingPrice: Number(
//     data.discountPrice || data.price
//   ),

//   mrp: Number(data.price),

//   shortDescription: data.description,

//   // Convert image objects into image URLs
//   images: data.images.map(
//     (img) => img.imageUrl
//   ),

//   // Backend fields
//   badge: data.badge,

//   highlights: data.highlights || [],

//   theme:
//     CARD_THEMES[
//       data.cardTheme
//     ] || CARD_THEMES.GREEN,

// };
// setProduct(mapped);
//  const allProducts = await getProducts();

// const related = allProducts
//   .filter(
//     (item) =>
//       item.categoryId === mapped.categoryId &&
//       item.id !== mapped.id
//   )
//   .slice(0, 3)
//   .map((item) => ({
//     ...item,

//     title: item.name,

//     sellingPrice: Number(
//       item.discountPrice || item.price
//     ),

//     mrp: Number(item.price),

//     shortDescription: item.description,

//     images: item.images.map(
//       (img) => img.imageUrl
//     ),

//     badge: item.badge,

//     highlights: item.highlights || [],

//     theme:
//       CARD_THEMES[item.cardTheme] ||
//       CARD_THEMES.GREEN,
//   }));

// setRelatedProducts(related);

//     // console.log(data);

//   } catch (err) {

//   console.error(err);

//   navigate("/products", {
//     replace: true,
//   });

// } finally {

//   setLoading(false);

// }
// };



//   useEffect(() => {
//   fetchProduct();
// }, [slug]);

//   useEffect(() => {
//   if (product?.images?.length) {
//     setSelectedImage(product.images[0]);
//   }

//   window.scrollTo({
//     top: 0,
//     behavior: "smooth",
//   });
// }, [product]);



//  if (loading) {
//     return (
//       <>
//         <Navbar alwaysCapsule />

//         <main className="bg-[#F6F3EC] min-h-screen flex items-center justify-center">

//           <div className="flex flex-col items-center">

//             <div className="flex gap-3">

//               <span className="h-4 w-4 rounded-full bg-[#184C35] animate-bounce" />

//               <span
//                 className="h-4 w-4 rounded-full bg-[#3E8C57] animate-bounce"
//                 style={{ animationDelay: "150ms" }}
//               />

//               <span
//                 className="h-4 w-4 rounded-full bg-[#D7A326] animate-bounce"
//                 style={{ animationDelay: "300ms" }}
//               />

//             </div>

//             <p className="mt-8 text-sm uppercase tracking-[0.2em] text-[#184C35]">
//               Preparing your snack...
//             </p>

//           </div>

//         </main>

//         <Footer />
//       </>
//     );
//   }

//   if (!product) {
//     return (
//       <>
//         <Navbar alwaysCapsule />

//         <main className="min-h-screen bg-[#F6F3EC] pt-40 flex items-center justify-center">
//           <div className="text-center">
//             <h1
//               className="text-5xl text-[#174C35]"
//               style={{
//                 fontFamily: "Fraunces, serif",
//               }}
//             >
//               Product Not Found
//             </h1>

//             <button
//               onClick={() => navigate("/products")}
//               className="
//                 mt-8
//                 rounded-full
//                 bg-[#174C35]
//                 px-8
//                 py-4
//                 text-white
//                 font-semibold
//               "
//             >
//               Back to Products
//             </button>
//           </div>
//         </main>

//         <Footer />
//       </>
//     );
//   }

  
// const discount = Math.round(
//     ((product.mrp - product.sellingPrice) /
//       product.mrp) *
//       100
//   );

// const outOfStock = product.stock <= 0;

//   const reviews = [
//     {
//       name: "Priya",
//       city: "Delhi",
//       text: "Best makhana I've ever tasted.",
//     },
//     {
//       name: "Rohan",
//       city: "Mumbai",
//       text: "Premium quality and amazing crunch.",
//     },
//     {
//       name: "Sneha",
//       city: "Bangalore",
//       text: "Healthy snacking finally tastes good.",
//     },
//     {
//       name: "Arjun",
//       city: "Chennai",
//       text: "Peri Peri flavour is my favourite.",
//     },
//     {
//       name: "Megha",
//       city: "Pune",
//       text: "Packaging feels very premium.",
//     },
//   ];

  



//   return (
//     <>
//       <Navbar alwaysCapsule />

//       <section
//         className="
//           bg-[#F6F3EC]
//           min-h-screen
//           pt-32
//           md:pt-36
//           pb-20
//         "
//       >
//         <div
//           className="
//             max-w-7xl
//             mx-auto
//             px-5
//             lg:px-8
//           "
//         >
//           {/* HERO SECTION STARTS HERE */}
//           <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">

//   {/* LEFT SIDE */}

//   <div>

//     {/* Main Image */}

//     <div
//       className="
//         bg-white
//         rounded-[34px]
//         overflow-hidden

//         border
//         border-[#ECE7DB]

//         shadow-[0_15px_40px_rgba(0,0,0,0.05)]
//       "
//     >
//       <div
//         className="
//           h-[420px]
//           md:h-[500px]

//           flex
//           items-center
//           justify-center

//           p-8
//         "
//       >
//         <img
//           src={selectedImage || product.images[0]}
//           alt={product.title}
//           className="
//             max-h-full
//             object-contain

//             transition-all
//             duration-500

//             hover:scale-[1.04]
//           "
//         />
//       </div>
//     </div>

//     {/* Thumbnail Gallery */}

//     <div
//       className="
//         mt-5

//         flex
//         gap-3

//         overflow-x-auto

//         pb-2
//       "
//     >
      
//       {product.images.map((img, index) => (
//   <button
//     key={index}
//     onClick={() => setSelectedImage(img)}
//     className={`
//       flex
//       items-center
//       justify-center

//       w-[96px]
//       h-[96px]

//       rounded-[22px]

//       bg-white

//       border-[3px]

//       transition-all
//       duration-300

//       ${
//         selectedImage === img
//           ? "border-[#174C35] shadow-md"
//           : "border-transparent hover:border-[#174C35]/30"
//       }
//     `}
//   >
//     <img
//       src={img}
//       alt=""

//       className="
//         w-16
//         h-16

//         object-contain
//       "
//     />
//   </button>
// ))}
//     </div>

//   </div>

//   {/* RIGHT SIDE STARTS HERE */}

//   <div>
//           {/* Badges */}

//       <div className="flex items-center gap-3 flex-wrap">
//         <span
//           className="
//             inline-flex
//             items-center
//             rounded-full
//             px-4
//             py-2
//             text-[11px]
//             tracking-[0.15em]
//             font-semibold
//             text-white
//           "
//           style={{
//             background: product.theme.accent,
//           }}
//         >
//           {product.badge || "POPFRESH"}
//         </span>

//         <span
//           className="
//             inline-flex
//             items-center
//             rounded-full
//             px-4
//             py-2
//             bg-white
//             border
//             border-[#ECE7DB]
//             text-[11px]
//             tracking-[0.15em]
//             text-[#174C35]
//             font-medium
//           "
//         >
//           <ShieldCheck
//             size={14}
//             className="mr-2"
//           />
//           FSSAI CERTIFIED
//         </span>
//       </div>

//       {outOfStock && (
//   <div className="mt-4">
//     <span
//       className="
//         inline-flex
//         rounded-full
//         bg-red-600
//         px-4
//         py-2
//         text-sm
//         font-semibold
//         text-white
//       "
//     >
//       OUT OF STOCK
//     </span>
//   </div>
// )}

//       {/* Product Title */}

//       <h1
//         className="
//           mt-6
//           text-[#174C35]
//           text-[34px]
//           md:text-[42px]
//           leading-tight
//         "
//         style={{
//           fontFamily: "Fraunces, serif",
//         }}
//       >
//         {product.title}
//       </h1>

// {/* Highlights */}

//       <div className="mt-8 flex flex-wrap gap-3">
//         {product.highlights.map((tag) => (
//           <span
//             key={tag}
//             className="
//               px-4
//               py-2
//               rounded-full
//               bg-white
//               border
//               border-[#ECE7DB]
//               text-[#174C35]
//               text-sm
//               font-medium
//             "
//           >
//             {tag}
//           </span>
//         ))}
//       </div>

//       {/* Rating */}

//       <div className="mt-5 flex items-center gap-3">
//         <div className="flex items-center text-[#E4C06A]">
//           {[...Array(5)].map((_, index) => (
//             <Star
//               key={index}
//               size={18}
//               fill="currentColor"
//             />
//           ))}
//         </div>

//         <span className="text-[#667085]">
//           {/* {product.rating} • {product.totalReviews} Reviews */}
//           4.8 • 2,300+ Reviews
//         </span>
//       </div>

//       {/* Description */}

//       <p
//         className="
//           mt-6
//           text-[#667085]
//           leading-8
//           text-[16px]
//         "
//       >
//         {product.shortDescription}
//       </p>

//       {/* Pricing */}

//       <div className="mt-8 flex items-center gap-4 flex-wrap">
//         <span
//           className="text-5xl font-bold text-[#184C35]"
         
//         >
//           ₹{product.sellingPrice}
//         </span>

//         <span
//           className="
//             text-2xl
//             line-through
//             text-gray-400
//           "
//         >
//           ₹{product.mrp}
//         </span>

//         <span
//           className="
//             rounded-full
//             px-4
//             py-2
//             text-white
//             text-sm
//             font-semibold
//           "
//           style={{
//             background: product.theme.accent,
//           }}
//         >
//           {discount}% OFF
//         </span>
//       </div>

      
//             {/* Product Information */}

//       <div
//         className="
//           mt-10

//           rounded-[24px]

//           bg-white

//           border
//           border-[#ECE7DB]

//           overflow-hidden
//         "
//       >
//         <div className="flex items-center justify-between px-6 py-5">
//           <span className="text-[#667085]">
//             Net Weight
//           </span>

//           <span className="font-semibold text-[#174C35]">
//             {product.weight}
//           </span>
//         </div>

//         <div className="border-t border-[#ECE7DB]" />

//         <div className="flex items-center justify-between px-6 py-5">
//           <span className="text-[#667085]">
//             FSSAI
//           </span>

//           {/* <span className="font-semibold text-[#174C35]">
//             {product.fssai}
//           </span> */}

//           <span
//   className="
//     rounded-full
//     bg-green-100
//     px-4
//     py-2
//     text-sm
//     font-medium
//     text-green-700
//   "
// >
//   ✓ FSSAI Certified
// </span>
//         </div>
//       </div>

//       {/* Quantity */}

//       <div className="mt-8">
//         <QuantitySelector
//           quantity={quantity}
//           setQuantity={setQuantity}
//           max={product.stock}
//           disabled={outOfStock}
//         />
//       </div>

//       {/* Buttons */}

//       <div className="mt-8 grid grid-cols-2 gap-4">
//         {/* Add To Cart */}

//         <button
//   disabled={outOfStock}
//   onClick={() => {

//     if (outOfStock) return;

//     addToCart(product, quantity);

//   }}
//           className={`
//   flex
//   items-center
//   justify-center
//   gap-3
//   rounded-full
//   py-4
//   font-semibold
//   transition-all
//   duration-300

//   ${
//     outOfStock
//       ? "bg-gray-400 text-white cursor-not-allowed"
//       : "text-white hover:scale-[1.02] hover:opacity-90 hover:shadow-xl"
//   }
// `}
//           style={
//   !outOfStock
//     ? { background: product.theme.accent }
//     : {}
// }
//         >
//           <ShoppingCart size={20} />

//           Add to Cart
//         </button>

//         {/* Buy Now */}

//         <button
//           onClick={() => {

//     if (outOfStock) return;

//     buyNow(product, quantity);

//     navigate("/checkout/shipping");

// }}
// disabled={outOfStock}
//           className={`
//   flex
//   items-center
//   justify-center
//   gap-3
//   rounded-full
//   py-4
//   border-2
//   font-semibold
//   transition-all
//   duration-300

//   ${
//     outOfStock
//       ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500"
//       : "border-[#174C35] text-[#174C35] hover:bg-[#174C35] hover:text-white"
//   }
// `}          
//         >
//           <CreditCard size={20} />

//           Buy Now
//         </button>
//       </div>

//     </div>

// </div>

// {/* PopFresh Marquee */}

// <div
//   className="
//     mt-24
//     mb-24

//     relative
//     left-1/2
//     right-1/2

//     -ml-[50vw]
//     -mr-[50vw]

//     w-screen
//   "
// >
//   <PopFreshMarquee />

// </div>

// {/* Customers Also Bought */}

// <div className="max-w-7xl mx-auto px-5 lg:px-8">

//   <div className="mb-12 text-center">

//     <span
//       className="
//         inline-flex
//         rounded-full
//         bg-[#E9E3D8]
//         px-5
//         py-2

//         text-[#174C35]

//         text-xs

//         tracking-[0.18em]

//         font-medium
//       "
//     >
//       YOU MAY ALSO LIKE
//     </span>

//     <h2
//       className="
//         mt-5

//         text-[#174C35]

//         text-4xl
//         md:text-5xl
//       "
//       style={{
//         fontFamily: "Fraunces, serif",
//       }}
//     >
//       Customers Also Bought
//     </h2>

//     <p className="mt-4 text-[#667085]">
//       Explore more delicious flavours from PopFresh.
//     </p>

//   </div>

//   <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

//     {relatedProducts.map((item) => (

//     <Link
//   key={item.id}
//   to={item.stock > 0 ? `/products/${item.slug}` : "#"}
//   onClick={(e) => {
//     if (item.stock <= 0) {
//       e.preventDefault();
//     }
//   }}
//   className={`
//     group
//     flex
//     flex-col
//     overflow-hidden
//     rounded-[32px]
//     transition-all
//     duration-300

//     ${
//       item.stock > 0
//         ? "hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
//         : "cursor-not-allowed opacity-90"
//     }
//   `}
//   style={{
//     background: item.theme.background,
//   }}
// >

//         {/* Badge */}

//         <div className="p-6 pb-0">

//           <span
//             className="
//               inline-flex

//               rounded-full

//               px-4
//               py-2

//               text-white

//               text-[11px]

//               tracking-[0.15em]

//               font-medium
//             "
//             style={{
//               background: item.theme.accent,
//             }}
//           >
//             {item.badge || "POPFRESH"}
//           </span>

//         </div>

//         {/* Image */}

//         <div className="px-6 pt-6">

//           <div
//             className="
//               overflow-hidden

//               rounded-[24px]

//               bg-white/40
//             "
//           >
//             <div className="relative overflow-hidden rounded-[24px] bg-white/40">
//             <ProductImageSlider
//               images={item.images}
//               title={item.title}
//             />
//              {item.stock <= 0 && (
//     <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-sm">
//       <span className="rounded-full bg-red-600 px-5 py-2 text-sm font-bold text-white">
//         OUT OF STOCK
//       </span>
//     </div>
//   )}

// </div>

//           </div>

//         </div>

//         {/* Content */}

//         <div className="flex flex-col flex-1 p-6">

//           <h3
//             className="
//               text-[#174C35]

//               text-2xl

//               leading-tight
//             "
//             style={{
//               fontFamily: "Fraunces, serif",
//             }}
//           >
//             {item.title}
//           </h3>

//           <p
//             className="
//               mt-4

//               text-[#667085]

//               leading-7

//               flex-1
//             "
//           >
//             {item.shortDescription}
//           </p>

//           {/* Tags */}

//           <div className="flex flex-wrap gap-2 mt-5">

//             {item.highlights?.slice(0,3).map((tag) => (

//               <span
//                 key={tag}
//                 className="
//                   rounded-full

//                   bg-white

//                   px-3
//                   py-1

//                   text-sm

//                   text-[#174C35]
//                 "
//               >
//                 {tag}
//               </span>

//             ))}

//           </div>

//           {/* Price */}

//           <div className="mt-6 flex items-center gap-3">

//             <span
//               className="text-3xl font-bold"
//               style={{
//                 color: item.theme.text,
//               }}
//             >
//               ₹{item.sellingPrice}
//             </span>

//             <span className="text-lg line-through text-gray-400">
//               ₹{item.mrp}
//             </span>

//           </div>

//           {/* CTA */}

//           <button
//   disabled={item.stock <= 0}
//   className={`
//     mt-7
//     w-full
//     rounded-full
//     py-4
//     font-semibold
//     transition-all
//     duration-300

//     ${
//       item.stock <= 0
//         ? "bg-gray-400 text-white cursor-not-allowed"
//         : "text-white"
//     }
//   `}
//   style={
//     item.stock > 0
//       ? { background: item.theme.accent }
//       : {}
//   }
// >
//   {item.stock > 0 ? "View Product" : "Out of Stock"}
// </button>

//         </div>

//       </Link>

//     ))}

//   </div>

// </div>

// {/* Maketplace CTA  */}
// <MarketplaceCTA
//     amazon={product.amazon}
//     flipkart={product.flipkart}
// />

// {/* Reviews */}

// <div
//   className="
//     mt-28

//     relative
//     left-1/2
//     right-1/2

//     -ml-[50vw]
//     -mr-[50vw]

//     w-screen

//     overflow-hidden
//   "
// >
//   <div className="text-center mb-12">
//     <span
//       className="
//         inline-flex

//         rounded-full

//         bg-[#E9E3D8]

//         px-5
//         py-2

//         text-xs

//         tracking-[0.18em]

//         font-medium

//         text-[#174C35]
//       "
//     >
//       CUSTOMER LOVE
//     </span>

//     <h2
//       className="
//         mt-5

//         text-[#174C35]

//         text-4xl
//         md:text-5xl
//       "
//       style={{
//         fontFamily: "Fraunces, serif",
//       }}
//     >
//       Loved By Snackers
//     </h2>

//     <p className="mt-4 text-[#667085]">
//       Thousands of happy crunches across India.
//     </p>
//   </div>

//   <div
//     className="
//       flex
//       gap-6

//       animate-[marquee_30s_linear_infinite]

//       w-max

//       px-6
//     "
//   >
//     {[...reviews, ...reviews].map((review, index) => (
//       <div
//         key={index}
//         className="
//           w-[280px]
//           md:w-[330px]

//           rounded-[30px]

//           bg-white

//           p-8

//           border
//           border-[#ECE7DB]

//           shadow-sm

//           transition-all
//           duration-300

//           hover:-translate-y-2
//           hover:shadow-xl
//         "
//       >
//         {/* Stars */}

//         <div className="flex gap-1 text-[#E4C06A] mb-5">
//           {[...Array(5)].map((_, i) => (
//             <Star
//               key={i}
//               size={18}
//               fill="currentColor"
//             />
//           ))}
//         </div>

//         {/* Review */}

//         <p
//           className="
//             text-[#174C35]

//             text-lg

//             leading-8
//           "
//         >
//           "{review.text}"
//         </p>

//         {/* User */}

//         <div className="mt-8">
//           <h4 className="font-semibold text-[#174C35]">
//             {review.name}
//           </h4>

//           <span className="text-[#667085] text-sm">
//             {review.city}
//           </span>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>

// </div>

// </section>

// <Footer />

// </>
// );
// }




// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import {
//   Star,
//   ShieldCheck,
//   ShoppingCart,
//   CreditCard,
// } from "lucide-react";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import PopFreshMarquee from "../components/PopFreshMarquee";
// import QuantitySelector from "../components/QuantitySelector";
// import ProductImageSlider from "../components/ProductImageSlider";
// import MarketplaceCTA from "../components/MarketplaceCTA";

// import { useCart } from "../context/CartContext";
// import productData from "../components/data/productData.js";

// export default function ProductDetails() {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const { addToCart, buyNow } = useCart();

//   const product = useMemo(() => {
//     return productData.find((item) => item.slug === slug);
//   }, [slug]);

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     if (product) {
//       setSelectedImage(product.images[0]);
//     }

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, [product]);

//   if (!product) {
//     return (
//       <>
//         <Navbar alwaysCapsule />

//         <main className="min-h-screen bg-[#F6F3EC] pt-40 flex items-center justify-center">
//           <div className="text-center">
//             <h1
//               className="text-5xl text-[#174C35]"
//               style={{
//                 fontFamily: "Fraunces, serif",
//               }}
//             >
//               Product Not Found
//             </h1>

//             <button
//               onClick={() => navigate("/products")}
//               className="
//                 mt-8
//                 rounded-full
//                 bg-[#174C35]
//                 px-8
//                 py-4
//                 text-white
//                 font-semibold
//               "
//             >
//               Back to Products
//             </button>
//           </div>
//         </main>

//         <Footer />
//       </>
//     );
//   }

//   const discount = Math.round(
//     ((product.mrp - product.sellingPrice) /
//       product.mrp) *
//       100
//   );

//   const relatedProducts = productData
//     .filter((item) => item.id !== product.id)
//     .slice(0, 3);

//   const reviews = [
//     {
//       name: "Priya",
//       city: "Delhi",
//       text: "Best makhana I've ever tasted.",
//     },
//     {
//       name: "Rohan",
//       city: "Mumbai",
//       text: "Premium quality and amazing crunch.",
//     },
//     {
//       name: "Sneha",
//       city: "Bangalore",
//       text: "Healthy snacking finally tastes good.",
//     },
//     {
//       name: "Arjun",
//       city: "Chennai",
//       text: "Peri Peri flavour is my favourite.",
//     },
//     {
//       name: "Megha",
//       city: "Pune",
//       text: "Packaging feels very premium.",
//     },
//   ];

//   return (
//     <>
//       <Navbar alwaysCapsule />

//       <section
//         className="
//           bg-[#F6F3EC]
//           min-h-screen
//           pt-32
//           md:pt-36
//           pb-20
//         "
//       >
//         <div
//           className="
//             max-w-7xl
//             mx-auto
//             px-5
//             lg:px-8
//           "
//         >
//           {/* HERO SECTION STARTS HERE */}
//           <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">

//   {/* LEFT SIDE */}

//   <div>

//     {/* Main Image */}

//     <div
//       className="
//         bg-white
//         rounded-[34px]
//         overflow-hidden

//         border
//         border-[#ECE7DB]

//         shadow-[0_15px_40px_rgba(0,0,0,0.05)]
//       "
//     >
//       <div
//         className="
//           h-[420px]
//           md:h-[500px]

//           flex
//           items-center
//           justify-center

//           p-8
//         "
//       >
//         <img
//           src={selectedImage}
//           alt={product.title}
//           className="
//             max-h-full
//             object-contain

//             transition-all
//             duration-500

//             hover:scale-[1.04]
//           "
//         />
//       </div>
//     </div>

//     {/* Thumbnail Gallery */}

//     <div
//       className="
//         mt-5

//         flex
//         gap-3

//         overflow-x-auto

//         pb-2
//       "
//     >
      
//       {product.images.map((img, index) => (
//   <button
//     key={index}
//     onClick={() => setSelectedImage(img)}
//     className={`
//       flex
//       items-center
//       justify-center

//       w-[96px]
//       h-[96px]

//       rounded-[22px]

//       bg-white

//       border-[3px]

//       transition-all
//       duration-300

//       ${
//         selectedImage === img
//           ? "border-[#174C35] shadow-md"
//           : "border-transparent hover:border-[#174C35]/30"
//       }
//     `}
//   >
//     <img
//       src={img}
//       alt=""

//       className="
//         w-16
//         h-16

//         object-contain
//       "
//     />
//   </button>
// ))}
//     </div>

//   </div>

//   {/* RIGHT SIDE STARTS HERE */}

//   <div>
//           {/* Badges */}

//       <div className="flex items-center gap-3 flex-wrap">
//         <span
//           className="
//             inline-flex
//             items-center
//             rounded-full
//             px-4
//             py-2
//             text-[11px]
//             tracking-[0.15em]
//             font-semibold
//             text-white
//           "
//           style={{
//             background: product.theme.accent,
//           }}
//         >
//           {product.theme.badge}
//         </span>

//         <span
//           className="
//             inline-flex
//             items-center
//             rounded-full
//             px-4
//             py-2
//             bg-white
//             border
//             border-[#ECE7DB]
//             text-[11px]
//             tracking-[0.15em]
//             text-[#174C35]
//             font-medium
//           "
//         >
//           <ShieldCheck
//             size={14}
//             className="mr-2"
//           />
//           FSSAI CERTIFIED
//         </span>
//       </div>

//       {/* Product Title */}

//       <h1
//         className="
//           mt-6
//           text-[#174C35]
//           text-[34px]
//           md:text-[42px]
//           leading-tight
//         "
//         style={{
//           fontFamily: "Fraunces, serif",
//         }}
//       >
//         {product.title}
//       </h1>

// {/* Highlights */}

//       <div className="mt-8 flex flex-wrap gap-3">
//         {product.tags.map((tag) => (
//           <span
//             key={tag}
//             className="
//               px-4
//               py-2
//               rounded-full
//               bg-white
//               border
//               border-[#ECE7DB]
//               text-[#174C35]
//               text-sm
//               font-medium
//             "
//           >
//             {tag}
//           </span>
//         ))}
//       </div>

//       {/* Rating */}

//       <div className="mt-5 flex items-center gap-3">
//         <div className="flex items-center text-[#E4C06A]">
//           {[...Array(5)].map((_, index) => (
//             <Star
//               key={index}
//               size={18}
//               fill="currentColor"
//             />
//           ))}
//         </div>

//         <span className="text-[#667085]">
//           {product.rating} • {product.totalReviews} Reviews
//         </span>
//       </div>

//       {/* Description */}

//       <p
//         className="
//           mt-6
//           text-[#667085]
//           leading-8
//           text-[16px]
//         "
//       >
//         {product.shortDescription}
//       </p>

//       {/* Pricing */}

//       <div className="mt-8 flex items-center gap-4 flex-wrap">
//         <span
//           className="text-5xl font-bold"
//           style={{
//             color: product.theme.text,
//           }}
//         >
//           ₹{product.sellingPrice}
//         </span>

//         <span
//           className="
//             text-2xl
//             line-through
//             text-gray-400
//           "
//         >
//           ₹{product.mrp}
//         </span>

//         <span
//           className="
//             rounded-full
//             px-4
//             py-2
//             text-white
//             text-sm
//             font-semibold
//           "
//           style={{
//             background: product.theme.accent,
//           }}
//         >
//           {discount}% OFF
//         </span>
//       </div>

      
//             {/* Product Information */}

//       <div
//         className="
//           mt-10

//           rounded-[24px]

//           bg-white

//           border
//           border-[#ECE7DB]

//           overflow-hidden
//         "
//       >
//         <div className="flex items-center justify-between px-6 py-5">
//           <span className="text-[#667085]">
//             Net Weight
//           </span>

//           <span className="font-semibold text-[#174C35]">
//             {product.weight}
//           </span>
//         </div>

//         <div className="border-t border-[#ECE7DB]" />

//         <div className="flex items-center justify-between px-6 py-5">
//           <span className="text-[#667085]">
//             FSSAI
//           </span>

//           <span className="font-semibold text-[#174C35]">
//             {product.fssai}
//           </span>
//         </div>
//       </div>

//       {/* Quantity */}

//       <div className="mt-8">
//         <QuantitySelector
//           quantity={quantity}
//           setQuantity={setQuantity}
//           max={product.stock}
//         />
//       </div>

//       {/* Buttons */}

//       <div className="mt-8 grid grid-cols-2 gap-4">
//         {/* Add To Cart */}

//         <button
//           onClick={() => {
//             addToCart(product, quantity);

//             // Drawer will open after Navbar integration
//           }}
//           className="
//             flex
//             items-center
//             justify-center
//             gap-3

//             rounded-full

//             py-4

//             font-semibold

//             text-white

//             transition-all
//             duration-300

//             hover:scale-[1.02]
//             hover:shadow-xl
//           "
//           style={{
//             background: product.theme.accent,
//           }}
//         >
//           <ShoppingCart size={20} />

//           Add to Cart
//         </button>

//         {/* Buy Now */}

//         <button
//           onClick={() => {
//             buyNow(product, quantity);

//             navigate("/checkout/shipping");
//           }}
//           className="
//             flex
//             items-center
//             justify-center
//             gap-3

//             rounded-full

//             py-4

//             border-2

//             font-semibold

//             transition-all
//             duration-300

//             hover:bg-[#174C35]
//             hover:text-white
//           "
          
//         >
//           <CreditCard size={20} />

//           Buy Now
//         </button>
//       </div>

//     </div>

// </div>

// {/* PopFresh Marquee */}

// <div
//   className="
//     mt-24
//     mb-24

//     relative
//     left-1/2
//     right-1/2

//     -ml-[50vw]
//     -mr-[50vw]

//     w-screen
//   "
// >
//   <PopFreshMarquee />

// </div>

// {/* Customers Also Bought */}

// <div className="max-w-7xl mx-auto px-5 lg:px-8">

//   <div className="mb-12 text-center">

//     <span
//       className="
//         inline-flex
//         rounded-full
//         bg-[#E9E3D8]
//         px-5
//         py-2

//         text-[#174C35]

//         text-xs

//         tracking-[0.18em]

//         font-medium
//       "
//     >
//       YOU MAY ALSO LIKE
//     </span>

//     <h2
//       className="
//         mt-5

//         text-[#174C35]

//         text-4xl
//         md:text-5xl
//       "
//       style={{
//         fontFamily: "Fraunces, serif",
//       }}
//     >
//       Customers Also Bought
//     </h2>

//     <p className="mt-4 text-[#667085]">
//       Explore more delicious flavours from PopFresh.
//     </p>

//   </div>

//   <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

//     {relatedProducts.map((item) => (

//       <Link
//         key={item.id}
//         to={`/products/${item.slug}`}

//         className="
//           group
//           flex
//           flex-col

//           overflow-hidden

//           rounded-[32px]

//           transition-all
//           duration-300

//           hover:-translate-y-2
//           hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
//         "
//         style={{
//           background: item.theme.background,
//         }}
//       >

//         {/* Badge */}

//         <div className="p-6 pb-0">

//           <span
//             className="
//               inline-flex

//               rounded-full

//               px-4
//               py-2

//               text-white

//               text-[11px]

//               tracking-[0.15em]

//               font-medium
//             "
//             style={{
//               background: item.theme.accent,
//             }}
//           >
//             {item.theme.badge}
//           </span>

//         </div>

//         {/* Image */}

//         <div className="px-6 pt-6">

//           <div
//             className="
//               overflow-hidden

//               rounded-[24px]

//               bg-white/40
//             "
//           >

//             <ProductImageSlider
//               images={item.images}
//               title={item.title}
//             />

//           </div>

//         </div>

//         {/* Content */}

//         <div className="flex flex-col flex-1 p-6">

//           <h3
//             className="
//               text-[#174C35]

//               text-2xl

//               leading-tight
//             "
//             style={{
//               fontFamily: "Fraunces, serif",
//             }}
//           >
//             {item.title}
//           </h3>

//           <p
//             className="
//               mt-4

//               text-[#667085]

//               leading-7

//               flex-1
//             "
//           >
//             {item.shortDescription}
//           </p>

//           {/* Tags */}

//           <div className="flex flex-wrap gap-2 mt-5">

//             {item.tags.slice(0,3).map((tag) => (

//               <span
//                 key={tag}
//                 className="
//                   rounded-full

//                   bg-white

//                   px-3
//                   py-1

//                   text-sm

//                   text-[#174C35]
//                 "
//               >
//                 {tag}
//               </span>

//             ))}

//           </div>

//           {/* Price */}

//           <div className="mt-6 flex items-center gap-3">

//             <span
//               className="text-3xl font-bold"
//               style={{
//                 color: item.theme.text,
//               }}
//             >
//               ₹{item.sellingPrice}
//             </span>

//             <span className="text-lg line-through text-gray-400">
//               ₹{item.mrp}
//             </span>

//           </div>

//           {/* CTA */}

//           <button
//             className="
//               mt-7

//               w-full

//               rounded-full

//               py-4

//               text-white

//               font-semibold

//               transition-all
//               duration-300
//             "
//             style={{
//               background: item.theme.accent,
//             }}
//           >
//             View Product
//           </button>

//         </div>

//       </Link>

//     ))}

//   </div>

// </div>

// {/* Maketplace CTA  */}
// <MarketplaceCTA
//     amazon={product.amazon}
//     flipkart={product.flipkart}
// />

// {/* Reviews */}

// <div
//   className="
//     mt-28

//     relative
//     left-1/2
//     right-1/2

//     -ml-[50vw]
//     -mr-[50vw]

//     w-screen

//     overflow-hidden
//   "
// >
//   <div className="text-center mb-12">
//     <span
//       className="
//         inline-flex

//         rounded-full

//         bg-[#E9E3D8]

//         px-5
//         py-2

//         text-xs

//         tracking-[0.18em]

//         font-medium

//         text-[#174C35]
//       "
//     >
//       CUSTOMER LOVE
//     </span>

//     <h2
//       className="
//         mt-5

//         text-[#174C35]

//         text-4xl
//         md:text-5xl
//       "
//       style={{
//         fontFamily: "Fraunces, serif",
//       }}
//     >
//       Loved By Snackers
//     </h2>

//     <p className="mt-4 text-[#667085]">
//       Thousands of happy crunches across India.
//     </p>
//   </div>

//   <div
//     className="
//       flex
//       gap-6

//       animate-[marquee_30s_linear_infinite]

//       w-max

//       px-6
//     "
//   >
//     {[...reviews, ...reviews].map((review, index) => (
//       <div
//         key={index}
//         className="
//           w-[280px]
//           md:w-[330px]

//           rounded-[30px]

//           bg-white

//           p-8

//           border
//           border-[#ECE7DB]

//           shadow-sm

//           transition-all
//           duration-300

//           hover:-translate-y-2
//           hover:shadow-xl
//         "
//       >
//         {/* Stars */}

//         <div className="flex gap-1 text-[#E4C06A] mb-5">
//           {[...Array(5)].map((_, i) => (
//             <Star
//               key={i}
//               size={18}
//               fill="currentColor"
//             />
//           ))}
//         </div>

//         {/* Review */}

//         <p
//           className="
//             text-[#174C35]

//             text-lg

//             leading-8
//           "
//         >
//           "{review.text}"
//         </p>

//         {/* User */}

//         <div className="mt-8">
//           <h4 className="font-semibold text-[#174C35]">
//             {review.name}
//           </h4>

//           <span className="text-[#667085] text-sm">
//             {review.city}
//           </span>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>

// </div>

// </section>

// <Footer />

// </>
// );
// }